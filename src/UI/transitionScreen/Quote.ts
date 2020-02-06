import Random from "../../util/Random.js";

export default class Quote {
    
    readonly quote: string;
    readonly attribution: string;

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

        //Trims outer white space and adds quotation marks if they aren't already there
        this.quote = quote.trim().replace(/^(?=[^"])/, "\"").replace(/(?<=[^"])$/, "\"");
        
        //Trims outer white space and adds a '-' before the attribution if not already there
        this.attribution = attribution.trim().replace(/^(?=[^\-])/, "- ");
    }

    static getRandomQuote(): Quote {
        return Random.fromArray(this.QUOTES);
    }

    getQuote(): string {
        return this.quote;
    }

    getAttribution(): string {
        return this.attribution;
    }
}