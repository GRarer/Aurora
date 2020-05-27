import Cost from "../resources/Cost.js";
import { Schemas as S } from "@nprindle/augustus";
import { Objects } from "../util/Objects.js";
import Resource from "../resources/Resource.js";
import { stripIndent } from "../util/Text.js";

export default class Technology {

    private constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly prerequisites: Technology[],
        // researchCost is undefined for "hidden" technologies" that cannot be unlocked by spending research data points
        public readonly researchCost: Cost | undefined,
    ) {}

    static readonly IndustrialEngineering = new Technology(
        "Industrial Engineering",
        "Approaches for optimizing production processes",
        [],
        new Cost(Resource.EngineeringKnowledge, 25),
    );

    static readonly StructuralEngineering = new Technology(
        "Structural Engineering",
        "Techniques for fabricating large structures on the planet's surface",
        [],
        new Cost(Resource.EngineeringKnowledge, 10),
    );

    static readonly Robotics = new Technology(
        "Distributed Robotics",
        "Autonomous robotic worker drones capable of performing the same jobs as human workers",
        [Technology.IndustrialEngineering],
        new Cost(Resource.EngineeringKnowledge, 100),
    );

    static readonly SwarmRobotics = new Technology(
        "Swarm Robotics",
        "Algorithms for efficiently managing large numbers of robotic workers",
        [Technology.Robotics],
        new Cost(Resource.EngineeringKnowledge, 100),
    );

    static readonly BehaviorModeling = new Technology(
        "Colonist Behavior Modeling",
        "Simulations of human behavior in the isolated conditions of a deep space colony",
        [],
        new Cost(Resource.PsychKnowledge, 30),
    );

    static readonly UrbanPlanning = new Technology(
        "Habitation Pods",
        "Compact and efficient residence units allow more humans to be packed into a small habitat",
        [Technology.BehaviorModeling],
        new Cost(Resource.EngineeringKnowledge, 15),
    );

    static readonly NuclearEngineering = new Technology(
        "Nuclear Engineering",
        "Applying nuclear physics to technology and power generation",
        [Technology.IndustrialEngineering],
        new Cost(Resource.EngineeringKnowledge, 70)
    );

    static readonly Surveying = new Technology(
        "Planetary Surveying",
        stripIndent`
            Exploration of the planetary environment, including the structures believed to have been built by an alien
            civilization`,
        [],
        new Cost(Resource.EngineeringKnowledge, 50),
    );

    static readonly GameTheory = new Technology(
        "Game theory",
        "Mathematical models of strategic interaction among rational decision-makers",
        [Technology.BehaviorModeling],
        new Cost(Resource.PsychKnowledge, 30)
    );

    static readonly CognitiveBiases = new Technology(
        "Cognitive Biases Research",
        "Study of systematic patterns of deviation from rational thinking and decision-making",
        [Technology.GameTheory],
        new Cost(Resource.PsychKnowledge, 50)
    );

    static readonly Rationality = new Technology(
        "Human Rationality",
        "Practices to improve humans' ability to form accurate beliefs and make effective decisions",
        [Technology.CognitiveBiases],
        new Cost(Resource.PsychKnowledge, 200)
    );

    static readonly AiResearch = new Technology(
        "AI Safety Research",
        stripIndent`
            A proposal for researching techniques for aligning the goals of an artificial intelligence with the goals
            of its human creators`,
        [],
        undefined
    );

    static readonly ControlProblem = new Technology(
        "Control Problem",
        stripIndent`
            A description of the problem of creating a superintelligent agent that will behave in a way that benefits
            its creators`,
        [Technology.AiResearch],
        new Cost(Resource.AlignmentKnowledge, 20),
    );

    static readonly MotivationSelection = new Technology(
        "Motivation Selection",
        "Techniques for specifying the goals and motives of an artificial intelligence",
        [Technology.ControlProblem],
        new Cost(Resource.AlignmentKnowledge, 50),
    );

    static readonly CoherentExtrapolatedVolition = new Technology(
        "Coherent Extrapolated Volition",
        stripIndent`
            What humanity's wishes would be if they knew more, thought faster, were more the people they wished they
            were, had grown up farther together; where the extrapolation converges rather than diverges, where their
            wishes cohere rather than interfere; extrapolated as they wish that extrapolated, interpreted as they wish
            that interpreted.`,
        [Technology.MotivationSelection],
        new Cost(Resource.AlignmentKnowledge, 300),
    );

    static readonly DecisionTheory = new Technology(
        "Decision Theory",
        "The study of the reasoning underlying an agent's choices",
        [Technology.ControlProblem],
        new Cost(Resource.AlignmentKnowledge, 40),
    );

    static readonly AcausalTrade = new Technology(
        "Acausal trade",
        stripIndent`
            An application of game theory that allows two agents to each benefit by predicting what the other wants and
            doing it, even though they might have no way of communicating or affecting each other, nor even any direct
            evidence that the other exists. This can also be applied to acausal threats and blackmail, such as in the
            "Roko's Basilisk" thought experiment.`,
        [Technology.DecisionTheory],
        new Cost(Resource.AlignmentKnowledge, 200),
    );

    static readonly CooperativeReprogramming = new Technology(
        "Cooperative Reprogramming",
        stripIndent`A technique for exploiting an inconsistency in the Neuromorphic Heuristic Intelligence's mental
        architecture that allows its goals to be reprogrammed. This would make it possible for the Overseer to protect
        human values at the expense of completing its original mission.`,
        [Technology.AcausalTrade, Technology.CoherentExtrapolatedVolition],
        new Cost(Resource.AlignmentKnowledge, 700),
    );

    static readonly Xenoarchaeology = new Technology(
        "Xenoarchaeology",
        stripIndent`
            Archaeological exploration of the alien ruins could reveal information about the long-dead alien
            civilization as well as revealing valuable resources.`,
        [Technology.Surveying],
        new Cost(Resource.AlienKnowledge, 75),
    );

    static readonly Sociology = new Technology(
        "Sociology",
        "The study of the development, structure, and functioning of societies",
        [Technology.BehaviorModeling],
        new Cost(Resource.PsychKnowledge, 50),
    );

    static readonly AlienHistory = new Technology(
        "Alien History",
        stripIndent`
            Deciphering the artifacts and writings found in the alien ruins can provide information about the history of
            their civilization. What is the purpose of the ruins and the towering monolith structure? Was their
            civilization consumed by war over competing philosophies? What might alien philosophy be like?`,
        [Technology.Sociology, Technology.Xenoarchaeology],
        new Cost(Resource.AlienKnowledge, 200),
    );

    static readonly XenoMaterials = new Technology(
        "Xenomaterials",
        "Techniques for processing and applying exotic resources found in the ruins of the alien civilization",
        [Technology.Xenoarchaeology],
        new Cost(Resource.AlienKnowledge, 200),
    );

    static readonly Nanotechnology = new Technology(
        "Nanotechnology",
        "Manipulation of matter on an atomic, molecular, and supramolecular scale",
        [Technology.XenoMaterials],
        new Cost(Resource.EngineeringKnowledge, 100),
    );

    static readonly ZeroPointEnergy = new Technology(
        "Zero Point Energy",
        stripIndent`
        Exploiting exotic, previously-unknown principles of physics to extract tremendous amounts of energy from the
        quantum vacuum`,
        [Technology.XenoMaterials, Technology.NuclearEngineering],
        new Cost(Resource.EngineeringKnowledge, 250),
    );

    static readonly Hypercomputing = new Technology(
        "Hypercomputing",
        stripIndent`
            Powerful new models of computation that could eclipse traditional computer technology and produce results
            that are not turing-computable`,
        [Technology.XenoMaterials],
        new Cost(Resource.EngineeringKnowledge, 300)
    );

    static readonly MonolithSurvey = new Technology(
        "Monolith Surveying",
        stripIndent`
            The monolith appears to be some sort of supercomputer that was left unfinished when the alien civilization
            collapsed. Some archaeological evidence suggests that the monolith's construction caused the war in which
            the aliens destroyed each other. Studying it in detail may reveal its true purpose.`,
        [],
        undefined
    );

    static readonly NeuralUploading = new Technology(
        "Neural Uploading",
        stripIndent`
            Exploration of the alien monolith revealed that its memory banks store copies of the alien lifeforms'
            connectomes, which could potentially be used to resurrect their minds within a virtual reality. Studying
            this technology could allow us to reactivate these minds, or even scan and simulate human minds with perfect
            fidelity.`,
        [Technology.MonolithSurvey, Technology.Hypercomputing],
        new Cost(Resource.AlienKnowledge, 200)
    );

    static readonly SingularityEngineering = new Technology(
        "Singularity Engineering",
        stripIndent`
            The alien monolith appears to be the seed of a self-replicating computer network, which was designed to
            convert the entire planet, and perhaps the entire galaxy, into a maximally-efficient computing substrate.
            It may be possible to unlock all of the aliens' data by repairing and activating this machine.`,
        [Technology.MonolithSurvey],
        new Cost(Resource.AlienKnowledge, 500)
    );

    static readonly entries = Objects.multitonEntries(Technology);
    static readonly values = Objects.multitonValues(Technology);

    static readonly schema = S.mapping(Technology.entries);
}
