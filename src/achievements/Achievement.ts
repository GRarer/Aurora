import { Objects } from "../util/Objects.js";
import { Schemas as S } from "@nprindle/augustus";
import Game from "../Game.js";
import Lander from "../world/tiles/Lander.js";
import Hydroponics from "../world/tiles/Hydroponics.js";
import { HumanEnding, AlienEnding } from "../quests/Quests.js";
import Species from "../resources/Species.js";
import AlienSeedCore from "../world/tiles/AlienSeedCore.js";
import HumanSeedCore from "../world/tiles/HumanSeedCore.js";
import HumanMonolith from "../world/tiles/HumanMonolith.js";
import Resource from "../resources/Resource.js";
import SolarPanels from "../world/tiles/SolarPanels.js";
import Road from "../world/tiles/Road.js";
import { WorldPredicate } from "../queries/Queries.js";
import Technology from "../techtree/Technology.js";

export default class Achievement {
    static readonly StartAchievement = new Achievement(
        "🚀", "One Small Step",
        "You deployed a colony on the surface of Aurora",
        (game: Game) => !game.world.getTiles().some(tile => tile instanceof Lander),
    );
    static readonly ExcavationPointAchievement = new Achievement(
        "💎", "Grave Robber",
        `You harvested resources from the ruins of a long-dead civilization`,
        (game: Game) =>
            (game.inventory.getResourceQuantity(Resource.Cavorite) > 0)
            || (game.inventory.getResourceQuantity(Resource.Orichalcum) > 0),
    );
    static readonly FoodAchievement = new Achievement(
        "🌯", "Neato Burrito",
        `You built a hydroponics greenhouse`,
        (game: Game) => game.world.getTiles().some(tile => tile instanceof Hydroponics),
    );
    static readonly SolarAchievement = new Achievement(
        "☀️", "Praise The Sun",
        `You built 10 photovoltaic arrays`,
        (game: Game) => game.world.getTiles().filter(tile => tile instanceof SolarPanels).length >= 10,
    );
    static readonly ConstructionAchievement = new Achievement(
        "🏗️", "Constructive Feedback",
        `You built up an inventory of 1000 Construction Parts`,
        (game: Game) => game.inventory.getResourceQuantity(Resource.BuildingMaterials) >= 1000
    );
    static readonly RoadAchievement = new Achievement(
        "🚧", "Paving The Way",
        `You built an extensive network of roads`,
        (game: Game) => game.world.getTiles().filter(tile => tile instanceof Road).length >= 50,
    );
    static readonly HumanPopulationAchievement = new Achievement(
        "📈", "Baby Boom",
        "You grew a population of 10,000 human colonists",
        (game: Game) => game.inventory.getPopulation(Species.Human) > 10000,
    );
    static readonly RobotSwarmAchievement = new Achievement(
        "🤖", "The Next Generation",
        "You built swarms of robotic workers",
        (game: Game) => game.inventory.getPopulation(Species.Robot) > 2000,
    );
    static readonly KillHumansAchievement = new Achievement(
        "💀", "Planned Obsolescence",
        "You allowed all of the human colonists to die",
        (game: Game) =>
            game.inventory.getPopulation(Species.Human) === 0
            && game.inventory.getPopulation(Species.Robot) > 0
            // doesn't count if the humans die during the ending sequence
            && !game.world.getTiles().some(
                tile => tile instanceof Lander
                || tile instanceof AlienSeedCore
                || tile instanceof HumanSeedCore
                || tile instanceof HumanMonolith
            ),
    );
    static readonly SafetyProjectAchievement = new Achievement(
        "🦉", "Fable of the Sparrows",
        "You approved the AI Safety Research Project",
        (game: Game) => game.hasUnlockedTechnology(Technology.AiResearch)
    );
    static readonly AlienEndingAchievement = new Achievement(
        "👾", "Mission Accomplished",
        "You discovered as much as possible about the aliens by freeing them to conquer the universe",
        (game: Game) => game.getQuestEndState()?.equals(AlienEnding) ?? false,
    );
    static readonly TrueEndingAchievement = new Achievement(
        "🌌", "We'll make Heaven a place on Earth",
        "You uplifted humanity into a virtual utopia",
        (game: Game) => game.getQuestEndState()?.equals(HumanEnding) ?? false,
    );

    private constructor(
        readonly emoji: string,
        readonly title: string,
        readonly description: string,
        readonly requirement: WorldPredicate,
    ) {}

    static values(): Achievement[] {
        return Objects.safeKeys(Achievement)
            .map(k => Achievement[k])
            .filter((v): v is Achievement => v instanceof Achievement);
    }

    static entries(): Record<string, Achievement> {
        const acc: Record<string, Achievement> = {};
        Objects.safeEntries(Achievement)
            .filter((t): t is [keyof typeof Achievement, Achievement] => t[1] instanceof Achievement)
            .forEach(([k, v]) => { acc[k] = v; });
        return acc;
    }

    static readonly schema = S.mapping(Achievement.entries());
}
