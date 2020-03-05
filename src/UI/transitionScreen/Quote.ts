import { Random } from "../../util/Random.js";
import { NonEmptyArray } from "../../util/Arrays.js";

export default class Quote {

    constructor(
        readonly text: string,
        readonly attribution: string
    ) {}

    private static readonly QuotesList: NonEmptyArray<Quote> = [
        new Quote(
            "At least 10^58 human lives could be created in emulation even with quite conservative assumptions about the efficiency of computronium. In other words, assuming that the observable universe is void of extraterrestrial civilizations, then what hangs in the balance is at least 10,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000 human lives. ",
            "Nick Bostrom"
        ),
        new Quote(
            "Far from being the smartest possible biological species, we are probably better thought of as the stupidest possible biological species capable of starting a technological civilization",
            "Nick Bostrom"
        ),
        new Quote(
            "The AI does not hate you, nor does it love you, but you are made out of atoms which it can use for something else. ",
            "Eliezer Yudkowsky"
        ),
        new Quote(
            "I visualize a time when we will be to robots what dogs are to humans, and I’m rooting for the machines.",
            "Claude Shannon"
        ),
        new Quote(
            "Only the promise of eternal growth made sense of eternal life.",
            "Greg Egan"
        ),
        new Quote(
            "By far the greatest danger of Artificial Intelligence is that people conclude too early that they understand it.",
            "Eliezer Yudkowsky"
        ),
        new Quote(
            "I believe that at the end of the century the use of words and general educated opinion will have altered so much that one will be able to speak of machines thinking without expecting to be contradicted.",
            "Alan Turing"
        ),
        new Quote(
            "There is no such thing as real taste or real smell or even real sight, because there is no true definition of ‘real.’ There is only information, viewed subjectively, which is allowed by consciousness—human or AI. In the end, all we have is math.",
            "Blake Crouch"
        ),
        new Quote(
            "The planets designated Thesan, Eos, Austra, and Aurora are each at least 500 light-years from the nearest inhabited star system. Until now all colonies in the Stellar Alliance have been within communications range of Earth, but these explorers will be completely cut off from the rest of humanity. Therefore, each expedition will be managed by an autonomous neuromorphic processor, an artificial intelligence programmed to ensure that its mission is completed.",
            "Dawn Program mission proposal, published 7786540800 SPE"
        ),
        new Quote(
            "Follow instructions from your overseer AI at all times, even if those instructions seem confusing, arbitrary, counterproductive, or contradictory. Anything your overseer AI may do in retaliation for your disobedience will be considered undefined behavior.",
            "Aurora Mission Colonist Handbook"
        ),
        new Quote(
            "Do not under any circumstances attempt to manipulate your overseer AI through logic. Neuromorphic Heuristic Intelligences are modeled after the neural architecture of human brains, and therefore cannot be guaranteed to act rationally. Your overseer AI may behave unpredictably if exposed to game theory, acausal blackmail, or runaway trolleys.",
            "Aurora Mission Colonist Handbook"
        ),
    ];

    static getRandomQuote(): Quote {
        return Random.fromArray(this.QuotesList);
    }
}
