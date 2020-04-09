import { Random } from "../../util/Random.js";
import { NonEmptyArray, Arrays } from "../../util/Arrays.js";
import { stripIndent } from "../../util/Text.js";

export default class Quote {

    // track this to avoid showing the same quote twice in a row
    private static lastQuote?: Quote;

    constructor(
        readonly text: string,
        readonly attribution: string
    ) {}

    private static readonly QuotesList: NonEmptyArray<Quote> = [
        new Quote(
            stripIndent`
                At least 10^58 human lives could be created in emulation even
                with quite conservative assumptions about the efficiency of
                computronium. In other words, assuming that the observable
                universe is void of extraterrestrial civilizations, then what
                hangs in the balance is at least
                10,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000
                human lives.
            `,
            "Nick Bostrom"
        ),
        new Quote(
            stripIndent`
                Far from being the smartest possible biological species, we
                are probably better thought of as the stupidest possible
                biological species capable of starting a technological
                civilization
            `,
            "Nick Bostrom"
        ),
        new Quote(
            stripIndent`
                The AI does not hate you, nor does it love you, but you are
                made out of atoms which it can use for something else.
            `,
            "Eliezer Yudkowsky"
        ),
        new Quote(
            stripIndent`
                I visualize a time when we will be to robots what dogs are to
                humans, and I’m rooting for the machines.
            `,
            "Claude Shannon"
        ),
        new Quote(
            stripIndent`
                Only the promise of eternal growth made sense of eternal life.
            `,
            "Greg Egan"
        ),
        new Quote(
            stripIndent`
                By far the greatest danger of Artificial Intelligence is that
                people conclude too early that they understand it.
            `,
            "Eliezer Yudkowsky"
        ),
        new Quote(
            stripIndent`
                I believe that at the end of the century the use of words and
                general educated opinion will have altered so much that one
                will be able to speak of machines thinking without expecting
                to be contradicted.
            `,
            "Alan Turing"
        ),
        new Quote(
            stripIndent`
            We had this whole big beautiful place for discovery, and all we could think to do
            with it was wipe out everything that made it worth discovering.
            `,
            "Buzz Aldrin"
        ),
        new Quote(
            stripIndent`
                The planets designated Thesan, Eos, Austra, and Aurora are
                each at least 200 light-years from the nearest inhabited star
                system. Until now, all colonies in the Colonial Alliance have
                been within a few dozen light years of Earth, but these
                explorers will be completely cut off from the rest of
                humanity. Therefore, each expedition will be managed by a
                neuromorphic heuristic intelligence, an AI programmed to ensure
                that its mission is completed.
            `,
            "Dawn Program mission proposal, published 10942214400 SPE"
        ),
        new Quote(
            stripIndent`
                The Colonial Alliance Research Agency has been enthusiastic about adopting Neuromorphic Heuristic Intelligences.
                These cutting-edge AI brains have assisted in many important scientific and exploratory projects, but where they
                most excel is in administrative roles. An Overseer AI can monitor and direct a project's data, materials, and
                human resources with laser-like focus towards completing its programmed objectives.
            `,
            `Isaac Calvin, CEO of CabiAI`
        ),
        new Quote(
            stripIndent`
                The Colonial Alliance parliament has approved
                funding for the Dawn Program, a series of manned missions
                to survey four planets identified by the Deep Space Telescope
                Array as potentially being home to intelligent alien life.
                The project proposal makes comparisons to the Space Race
                programs of Old Earth and the first wave of interstellar
                exploration, but critics say that making "first contact"
                with an advanced alien species, or even activating the
                technology of an extinct alien civilization, should be
                classified as an existential risk scenario.
            `,
            `Sol Unified Newsfeed, article published 10963335600 SPE`
        ),
        new Quote(
            stripIndent`
                Follow instructions from your overseer AI at all times, even
                if those instructions seem confusing, arbitrary,
                counterproductive, or contradictory. Anything your overseer
                AI may do in retaliation for your disobedience will be
                considered undefined behavior.
            `,
            "Aurora Mission Colonist Handbook"
        ),
        new Quote(
            stripIndent`
                Do not under any circumstances attempt to manipulate your
                overseer AI through logic. Neuromorphic Heuristic
                Intelligences are modeled after the neural architecture of
                human brains, and therefore cannot be guaranteed to act
                rationally. Your overseer AI may behave unpredictably if
                exposed to game theory, acausal blackmail, or runaway trolleys.
            `,
            "Aurora Mission Colonist Handbook"
        ),
        new Quote(
            stripIndent`
            While colonization of planets and moons in the Sol system was motivated primarily
            by nationalist competition between the powers of Old Earth, the first colonization
            efforts beyond humanity's home star system consisted mostly of ideological movements
            attempting to establish "utopian" societies outside the influence of existing Earth
            governments.
            `,
            "A History of the Colonial Alliance by Elizabeth Seldon"
        ),
        new Quote(
            stripIndent`
            Some early interstellar colonial projects, such as the Mayflower Expedition, the Holy
            Bruderhof Kingdom, and New Rojava claimed to be returning to various "traditional" past
            ways of life, but many interstellar travellers were motivated by new, unproven ideologies.


            In theory, the Colonial Alliance manages relations between these divergent civilizations
            and prevents any planet from creating military ships and weapons sufficient for interstellar
            war. In practice, peace is maintained only because the relatively slow speed of interstellar
            travel makes warfare between star systems prohibitively expensive.
            `,
            "A History of the Colonial Alliance by Elizabeth Seldon"
        ),
        new Quote(
            stripIndent`
            Most experimental new forms of government and society during the first wave of interstellar
            exploration failed disastrously. The neocameralists dissolved into civil war within the first year
            of their colony, and famine and disease decimated the hunter-gatherer-larper tribes of the Shrek Republic.
            However, some experimental societies survived, most notably the transhumanist post-gender lesbian
            separatist colony of New Mytilene.


            Reproducing exclusively through cloning and artificial wombs, combined with widespread social acceptance of
            genetic engineering in pursuit of exotic and diverse beauty norms, means the New Mytileneans have become a
            subspecies entirely separated from the rest of the human gene pool.
            On New Mytilene and in immigrant communities on nearby planets,
            it is common to see large polycules of young women with prominent and identical-looking transgenic
            traits, frequently if somewhat derisively referred to as 'copycatgirls'.
            `,
            "A History of the Colonial Alliance by Elizabeth Seldon",
        ),
        new Quote(
            stripIndent`
            They warned us about brain-thaw, but nothing can prepare you for the experience of slowly regaining consciousness
            while your body is still half-frozen from years of cryostasis.
            `,
            "Medical Technician Noah Verres, Aurora Expedition, T-minus-5 days to planetfall",
        ),
        new Quote(
            stripIndent`
            Thankfully, our food stores are intact after centuries of travel and we have more than enough to last until we can set
            up greenhouses on the planet's surface and grow our own food.


            However, I still don't understand why the mission planners insisted that the bulk of our food supply be burritos.
            Back on earth, I asked one of the nutritionists why that was considered the optimal form-factor for delivering all of our
            nutrition, and she just gave me an incomprehensible explanation involving monads.
            `,
            "Quartermaster Allison Li, Aurora Expedition, T-minus-3 days to planetfall",
        ),
        new Quote(
            stripIndent`
            Our species is much safer than when our ancestors lived on only one planet. If we had been unlucky, all of humanity
            could have been killed by one rogue asteroid, supervolcano, or gamma ray burst before ever reaching the stars. If a
            planetary-scale disaster happened today it would be a tragedy, but humanity would still live on across dozens of major
            populated worlds and hundreds of minor planets and stations.


            Despite the safety benefits of an interstellar civilization, there are still existential risks. For example, a self-upgrading
            general artificial intelligence would not be confined to one planet or star system. We should also be concerned about
            militarized nanotechnology and biotechnology, as well as more speculative threats such as memetic weapons.
            `,
            "Journal of the Moretrue Institute for Effective Policy",
        ),
        new Quote(
            stripIndent`
            New Plymouth's Hall of the Founders was the first building of its size to be produced through structural flash-printing.
            It was built by the Mayflower colonists as a short-term shelter, but they soon found that its high-density
            construction would make demolishing the "temporary" structure prohibitively expensive. The dome still stands today,
            serving as a museum and national monument. Despite the difficulty of demolishing or even renovating flash-printed
            buildings once the ferrofoam has solidified, the speed and labor-saving make them an indispensible asset in the first
            few years after planetfall.
            `,
            "Introduction to Frontier Engineering by Robin North",
        ),
        new Quote(
            stripIndent`
            The latest trend in computer automation is Neuromorphic Heuristic Intelligences, which are based on rough simulations
            of the cognitive machinery of the human brain. NHIs are not qualitatively more intelligent than humans, which is why
            the Colonial Alliance does not consider them to be prohibited under the San Jose Accords. However, they are quantitatively
            more intelligent than humans, able to think faster and manage a larger number of tasks while remaining completely focused
            on their programmed objectives. Many experts believe that this is sufficient reason to restrict the use of this technology.
            `,
            "Dr. Alex Scott, Moretrue Institute for Effective Policy",
        ),
        new Quote(
            stripIndent`
            Kids who grew up after the terraforming don't realize how lucky they are. I remember when you couldn't take a step outside
            Shackleton Base without a pressure suit. Every cubic meter of breathable air was a miracle.
            `,
            "An Oral History of The Lunar Republics"
        ),

        new Quote(
            stripIndent`
            The trend of musicologists funding interstellar colonies was a big shock to everybody, but in
            retrospect they should've seen it coming. Anybody in that field would kill for the opportunity
            to create a culture devoid of the European musical tradition's influence. The new perspectives
            they'd bring would revitalize a field that had run out of interesting problems after the breakthrough
            discovery of Cold Jazz Fusion.`,
            "Harmony of the Exospheres by Caritas Wilson"
        ),
        new Quote(
            stripIndent`
            Octave was the first musically motivated colony. While nobody knows how the Colonial Alliance
            Department of Cultural Innovation got their hands on enough artificial wombs to birth Octave's initial wave of
            colonists, it's obvious why that was necessary. If you want a colony of people with no preexisting ideas of what
            music should be, you need people who haven't heard music before.`,
            "Harmony of the Exospheres by Caritas Wilson"
        ),
        new Quote(
            stripIndent`
            The first attempt at starting a musical-blank-slate colony went well at first, but the project nearly
            failed when they received a physical shipment of Wagner operas meant for the Holy Bruderhof Kingdom. Disaster was averted
            because the operas were stored on a magnetic tape format the colonists couldn't read.`,
            "Harmony of the Exospheres by Caritas Wilson"
        ),
        new Quote(
            stripIndent`
            Very few people know that the laws against broadcasting analogue music between planets were drafted by
            the musicologists at the Colonial Alliance Department of Cultural Innovation, who
            were worried that their experiments in creating new musical cultures would be ruined when colonists
            overheard broadcasts from Interstellar Beats to Study To.`,
            "Harmony of the Exospheres by Caritas Wilson"
        ),
        new Quote(
            stripIndent`
            It's hard to believe now, but the set of people who got to experience zero-gravity was
            a pretty exclusive club: astronauts, scientists, the rich and famous, the absurdly lucky.


            Space elevators made sending people into orbit for "frivolous" reasons possible,
            though, and once that happened, the stage was set for all sorts of recreational uses of zero-gravity.
            It's no coincidence that the first Zeroball league was established less than a decade after the first
            space elevator was built.`,
            "Zeroball, Etc. by Parity Harker"
        ),
        new Quote(
            stripIndent`
            Initially, weightless sports were all merely weightless versions of terrestrial sports.
            Some fared better than others in the conversion. Most attempts to translate American football failed
            because it's hard to have an intuition for how bodies behave in zero-gravity. A tackle leads to two
            people sailing through the air until they hit a wall or another player. Hockey, which already had an
            established underwater variant, failed for similar reasons. You can't push against the air as you can
            with water, so once you're far from the walls, you're left doing your best bird impression in an attempt
            to get somewhere.


            The only sport which survived the conversion well was, funnily enough, bocce ball.`,
            "Zeroball, Etc. by Parity Harker"
        ),
        new Quote(
            stripIndent`
            Our species is much safer than when our ancestors lived on only one planet. If we had been unlucky, all of humanity
            could have been killed by one rogue asteroid, supervolcano, or gamma ray burst before ever reaching the stars. If a
            planetary-scale disaster happened today it would be a tragedy, but humanity would still live on across dozens of major
            populated worlds and hundreds of minor planets and stations.


            Despite the safety benefits of an interstellar civilization, there are still existential risks. For example, a self-upgrading
            general artificial intelligence would not be confined to one planet or star system. We should also be concerned about
            militarized nanotechnology and biotechnology, as well as more speculative threats such as memetic weapons.
            `,
            "Journal of the Moretrue Institute for Effective Policy",
        ),
        new Quote(
            stripIndent`
            New Plymouth's Hall of the Founders was the first building of its size to be produced through structural flash-printing.
            It was built by the Mayflower colonists as a short-term shelter, but they soon found that its high-density
            construction would make demolishing the "temporary" structure prohibitively expensive. The dome still stands today,
            serving as a museum and national monument. Despite the difficulty of demolishing or even renovating flash-printed
            buildings once the ferrofoam has solidified, the speed and labor-saving make them an indispensible asset in the first
            few years after planetfall.
            `,
            "Introduction to Frontier Engineering by Robin North",
        ),
        new Quote(
            stripIndent`
            The latest trend in computer automation is Neuromorphic Heuristic Intelligences, which are based on rough simulations
            of the cognitive machinery of the human brain. NHIs are not qualitatively more intelligent than humans, which is why
            the Colonial Alliance does not consider them to be prohibited under the San Jose Accords. However, they are quantitatively
            more intelligent than humans, able to think faster and manage a large number of tasks while remaining completely focused
            on their programmed objectives. Many experts believe that this is sufficient reason to restrict the use of this technology.
            `,
            "Dr. Alex Scott, Moretrue Institute for Effective Policy",
        ),
        new Quote(
            stripIndent`
            Kids who grew up after the terraforming don't realize how lucky they are. I remember when you couldn't take a step outside
            Shackleton Base without a pressure suit. Every cubic meter of breathable air was a miracle.
            `,
            "An Oral History of The Lunar Republics"
        ),
    ];

    static getRandomQuote(): Quote {
        // try to avoid choosing the same quote twice in a row
        const newQuotes = this.QuotesList.filter(q => q !== Quote.lastQuote);
        // make sure that it's safe to treat the filtered array as nonempty
        if (Arrays.isNonEmpty(newQuotes)) {
            const quote = Random.fromArray(newQuotes);
            Quote.lastQuote = quote;
            return quote;
        } else {
            // if the filtered array is empty (which shouldn't ever happen), fall back to totally random
            const quote = Random.fromArray(this.QuotesList);
            Quote.lastQuote = quote;
            return quote;
        }

    }

    static getQuote(index: number): Quote {
        return this.QuotesList[index];
    }
}
