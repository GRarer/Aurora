import { QuestStage, QuestPath } from "./questStage.js";
import Cost from "../resources/Cost.js";
import Resource from "../resources/Resource.js";
import { MinResourcePredicate, MinTilePredicate } from "../predicates/WorldPredicates.js";
import Habitat from "../world/Tiles/Habitat.js";

export const TutorialQuestUnpackLander: QuestStage = new QuestStage(
    `Deploy shelter for the colonists (Hint: select the Landing Pod)`,
    [
        new QuestPath(
            new MinTilePredicate(Habitat, 1),
            () => TutorialQuestGetEnergy,
        )
    ],
);

export const TutorialQuestGetEnergy: QuestStage = new QuestStage(
    `Build up at least 100 units of ${Resource.Energy.name} (Hint: solar panels produce a fixed amount of energy per turn)`,
    [
        new QuestPath(
            new MinResourcePredicate(Resource.Energy, 100),
            () => TutorialQuestGetOre,
        )
    ],
);

export const TutorialQuestGetOre: QuestStage = new QuestStage(
    `Acquire ${Resource.Metal.name}`,
    [
        new QuestPath(
            new MinResourcePredicate(Resource.Metal, 1),
            () => UnwinnableQuestStage,
        )
    ],
);

export const UnwinnableQuestStage: QuestStage = new QuestStage(
    "[no current objective]",
    [],
);
