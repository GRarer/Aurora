// quests need to be able to indirectly reference the following quest(s)
/* eslint-disable @typescript-eslint/no-use-before-define */

import { QuestStage, QuestPath } from "./QuestStage.js";
import Resource from "../resources/Resource.js";
import { MinResourcePredicate, MinTilePredicate, MinPopulationPredicate, TechPredicate } from "../predicates/WorldPredicates.js";
import Habitat from "../world/Tiles/Habitat.js";
import SolarPanels from "../world/Tiles/SolarArray.js";
import Lander from "../world/Tiles/Lander.js";
import GridCoordinates from "../world/GridCoordinates.js";
import Ending from "./Ending.js";
import EngineeringLab from "../world/Tiles/EngineeringLab.js";
import Wasteland from "../world/Tiles/Wasteland.js";
import XenoLab from "../world/Tiles/XenoLab.js";
import Ruins from "../world/Tiles/Ruins.js";
import { StructureConstructionTech } from "../techtree/TechTree.js";

export const TutorialQuestUnpackLander: QuestStage = new QuestStage(
    "Deploy shelter for the colonists",
    `select the ${Lander.tileName}`,
    [
        new QuestPath(
            new MinTilePredicate(Habitat, 1),
            () => TutorialQuestGetEnergy,
        )
    ],
);

export const TutorialQuestGetEnergy: QuestStage = new QuestStage(
    `Build up at least 100 units of ${Resource.Energy.name}`,
    `the ${SolarPanels.tileName} produces ${Resource.Energy.name} each turn`,
    [
        new QuestPath(
            new MinResourcePredicate(Resource.Energy, 100),
            () => TutorialQuestGetOre,
        )
    ],
);

export const TutorialQuestGetOre: QuestStage = new QuestStage(
    `Acquire ${Resource.Metal.name}`,
    undefined,
    [
        new QuestPath(
            new MinResourcePredicate(Resource.Metal, 1),
            () => TutorialQuestBuildLab,
        )
    ],
);

export const TutorialQuestBuildLab: QuestStage = new QuestStage(
    `Construct ${EngineeringLab.tileName}`,
    `Designate an empty ${Wasteland.tileName} tile as a laboratory construction site`,
    [
        new QuestPath(
            new MinTilePredicate(EngineeringLab, 1),
            () => TutorialQuestScience,
        )
    ],
);

export const TutorialQuestScience: QuestStage = new QuestStage(
    `Develop the ${StructureConstructionTech.name} technology`,
    "Hint: Access available technologies through the research screen",
    [
        new QuestPath(
            new TechPredicate(StructureConstructionTech),
            () => TutorialQuestPopulation200,
        )
    ]
);

export const TutorialQuestPopulation200: QuestStage = new QuestStage(
    "Grow total worker population to 250",
    `A ${Habitat.tileName} has capacity for ${new Habitat(new GridCoordinates(0, 0)).populationCapacity.capacity} colonists`,
    [
        new QuestPath(
            new MinPopulationPredicate(250),
            () => MainQuestXenoLab,
        )
    ],
);



export const MainQuestXenoLab: QuestStage = new QuestStage(
    `Construct ${XenoLab.tileName} to study the ${Ruins.tileName}`,
    undefined,
    [
        new QuestPath(
            new MinTilePredicate(XenoLab, 1),
            () => VictoryStage,
        )
    ],
);

export const UnwinnableQuestStage: QuestStage = new QuestStage(
    "[no current objective]",
    undefined,
    [],
);


export const GameOverStage: QuestStage = new QuestStage(
    "You lose",
    undefined,
    [],
    new Ending("Game Over", "You lost the game")
);

export const VictoryStage: QuestStage = new QuestStage(
    "You win",
    undefined,
    [],
    new Ending("You Win!", "You won the game")
);

