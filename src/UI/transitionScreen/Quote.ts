export default class Quote {
    
    private quote: string;
    private attribution: string;

    //Quotes are of form ["quote", "attribution"]
    //The quote will be automatically formatted to add quotation marks and a dash before the attribution
    static readonly QUOTES = [
        new Quote("quote1", "attribution1"),
        new Quote("quote2", "attribution2"),
        new Quote("quote3", "attribution3"),
        new Quote("quote4", "attribution4"),
        new Quote("quote5", "attribution5"),
        new Quote("quote6", "attribution6"),
        new Quote("quote7", "attribution7"),
        new Quote("quote8", "attribution8")
    ]

    constructor(quote: string, attribution: string) {
        this.quote = quote.replace(/^ *(?=[^"])/, "\"").replace(/(?<=[^"]) *$/, "\"");
        this.attribution = attribution.replace(/^ *(?=[^\-])/, "- ");
    }

    static getRandomQuote(): Quote {
        return this.QUOTES[Math.floor(Math.random() * this.QUOTES.length)];
    }

    getQuote(): string {
        return this.quote;
    }

    getAttribution(): string {
        return this.attribution;
    }
}