import Random from "../../util/Random.js";

export default class Quote {

    constructor(
        readonly text: string,
        readonly attribution: string
    ) {}
    
    private static QuotesList = [
        new Quote("I am an example quote", "Person McQuoteFace"),
        new Quote("Lorem ipsum dolor sit amet", "Mx. Example"),
        new Quote(
            // TODO fix the fact that this has to be unindented like this
`    Multiline versions are also possible,
and they can use indentation.

    Line breaks are also supported.`,
             "Author Goes Here"
        ),
         new Quote(
             // TODO fix the fact that this has to be unindented like this
`This is a multiline that does not
start with indentation`,
            "Name McNameFace"
         )
    ]

    static getRandomQuote(): Quote {
        return Random.fromArray(this.QuotesList);
    }
}