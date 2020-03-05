import Technology from "./Technology.js";
import Resource from "../resources/Resource.js";
import Cost from "../resources/Cost.js";

export const ResearchableTechnologies: Technology[] = [];

export const IndustrialEngineeringTech = Technology.makeUnlockableTechnology(
    "Industrial Engineering",
    "Approaches for optimizing production processes",
    [],
    new Cost(Resource.EngineeringKnowledge, 25),
);

export const StructureConstructionTech = Technology.makeUnlockableTechnology(
    "Structural Engineering",
    "Techniques for fabricating large structures on the planet's surface",
    [],
    new Cost(Resource.EngineeringKnowledge, 10),
);

export const BehaviorModelingTech = Technology.makeUnlockableTechnology(
    "Colonist Behavior Modeling",
    "Simulations of human behavior in the isolated conditions of a deep space colony",
    [],
    new Cost(Resource.PsychKnowledge, 30),
);

export const UrbanPlanningTech = Technology.makeUnlockableTechnology(
    "Habitation Pods",
    "Compact and efficient residence units allow more humans to be packed into a small habitat",
    [BehaviorModelingTech],
    new Cost(Resource.EngineeringKnowledge, 15),
);

export const NuclearTech = Technology.makeUnlockableTechnology(
    "Nuclear Engineering",
    "Applying nuclear physics to technology and power generation",
    [IndustrialEngineeringTech],
    new Cost(Resource.EngineeringKnowledge, 70)
);

export const SurveyTech = Technology.makeUnlockableTechnology(
    "Planetary Surveying",
    "Exploration of the planetary environment, including the structures believed to have been built by an alien civilization",
    [],
    new Cost(Resource.EngineeringKnowledge, 50),
);

export const GameTheoryTech = Technology.makeUnlockableTechnology(
    "Game theory",
    "Mathematical models of strategic interaction among rational decision-makers",
    [BehaviorModelingTech],
    new Cost(Resource.PsychKnowledge, 30)
);

export const CognitiveBiasesTech = Technology.makeUnlockableTechnology(
    "Cognitive Biases Research",
    "Study of systematic patterns of deviation from rational thinking and decision-making",
    [GameTheoryTech],
    new Cost(Resource.PsychKnowledge, 50)
);

export const RationalityTech = Technology.makeUnlockableTechnology(
    "Human Rationality",
    "Practices to improve humans' ability to form accurate beliefs and make effective decisions",
    [CognitiveBiasesTech],
    new Cost(Resource.PsychKnowledge, 200)
);
