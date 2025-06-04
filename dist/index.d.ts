import { GameWorker, GameFunction } from "@virtuals-protocol/game";
export declare const DEFAULT_BASE_API_URL = "https://api.tokenmetrics.com/v2";
interface ITokenMetricsPluginOptions {
    id?: string;
    name?: string;
    description?: string;
    apiClientConfig: {
        apiKey: string;
        baseApiUrl?: string;
    };
}
declare class TokenMetricsPlugin {
    private id;
    private name;
    private description;
    private apiKey;
    private baseApiUrl;
    constructor(options: ITokenMetricsPluginOptions);
    getWorker(data?: {
        functions?: GameFunction<any>[];
        getEnvironment?: () => Promise<Record<string, any>>;
    }): GameWorker;
    get getTokens(): GameFunction<[{
        readonly name: "limit";
        readonly description: "Limit the number of items in response (default: 50)";
        readonly type: "number";
        readonly default: 50;
    }, {
        readonly name: "page";
        readonly description: "Page number for pagination (default: 1)";
        readonly type: "number";
        readonly default: 1;
    }, {
        readonly name: "token_name";
        readonly description: "Optional: Comma separated crypto asset names (e.g., Bitcoin, Ethereum). Only use when searching for specific tokens.";
        readonly type: "string";
    }, {
        readonly name: "symbol";
        readonly description: "Optional: Comma separated token symbols (e.g., BTC, ETH). Only use when searching for specific tokens.";
        readonly type: "string";
    }, {
        readonly name: "category";
        readonly description: "Optional: Comma separated category names. Only use when filtering by specific categories.";
        readonly type: "string";
    }]>;
    get getTopMarketCapTokens(): GameFunction<[{
        readonly name: "top_k";
        readonly description: "Number of top cryptocurrencies to retrieve based on market cap (default: 100)";
        readonly type: "number";
        readonly default: 100;
    }, {
        readonly name: "page";
        readonly description: "Page number for pagination (default: 1)";
        readonly type: "number";
        readonly default: 1;
    }]>;
    get getPriceData(): GameFunction<[{
        readonly name: "token_id";
        readonly description: "Comma separated Token IDs (e.g., 3375,3306 for BTC,ETH)";
        readonly type: "string";
    }]>;
    get getTraderGrades(): GameFunction<[{
        readonly name: "token_id";
        readonly description: "Comma separated Token IDs";
        readonly type: "string";
    }, {
        readonly name: "startDate";
        readonly description: "Start date in YYYY-MM-DD format (e.g., 2023-10-01)";
        readonly type: "string";
    }, {
        readonly name: "endDate";
        readonly description: "End date in YYYY-MM-DD format (e.g., 2023-10-10)";
        readonly type: "string";
    }, {
        readonly name: "symbol";
        readonly description: "Comma separated token symbols (e.g., BTC,ETH)";
        readonly type: "string";
    }, {
        readonly name: "limit";
        readonly description: "Limit the number of items in response (default: 50)";
        readonly type: "number";
        readonly default: 50;
    }, {
        readonly name: "page";
        readonly description: "Page number for pagination (default: 1)";
        readonly type: "number";
        readonly default: 1;
    }]>;
    get getInvestorGrades(): GameFunction<[{
        readonly name: "token_id";
        readonly description: "Comma separated Token IDs";
        readonly type: "string";
    }, {
        readonly name: "startDate";
        readonly description: "Start date in YYYY-MM-DD format";
        readonly type: "string";
    }, {
        readonly name: "endDate";
        readonly description: "End date in YYYY-MM-DD format";
        readonly type: "string";
    }, {
        readonly name: "symbol";
        readonly description: "Comma separated token symbols";
        readonly type: "string";
    }, {
        readonly name: "limit";
        readonly description: "Limit the number of items in response (default: 50)";
        readonly type: "number";
        readonly default: 50;
    }, {
        readonly name: "page";
        readonly description: "Page number for pagination (default: 1)";
        readonly type: "number";
        readonly default: 1;
    }]>;
    get getTradingSignals(): GameFunction<[{
        readonly name: "token_id";
        readonly description: "Comma separated Token IDs";
        readonly type: "string";
    }, {
        readonly name: "startDate";
        readonly description: "Start date in YYYY-MM-DD format";
        readonly type: "string";
    }, {
        readonly name: "endDate";
        readonly description: "End date in YYYY-MM-DD format";
        readonly type: "string";
    }, {
        readonly name: "symbol";
        readonly description: "Comma separated token symbols";
        readonly type: "string";
    }, {
        readonly name: "signal";
        readonly description: "Current signal value (1=bullish, -1=bearish, 0=no signal)";
        readonly type: "string";
    }, {
        readonly name: "limit";
        readonly description: "Limit the number of items in response (default: 50)";
        readonly type: "number";
        readonly default: 50;
    }, {
        readonly name: "page";
        readonly description: "Page number for pagination (default: 1)";
        readonly type: "number";
        readonly default: 1;
    }]>;
    get getMarketMetrics(): GameFunction<[{
        readonly name: "startDate";
        readonly description: "Start date in YYYY-MM-DD format";
        readonly type: "string";
    }, {
        readonly name: "endDate";
        readonly description: "End date in YYYY-MM-DD format";
        readonly type: "string";
    }, {
        readonly name: "limit";
        readonly description: "Limit the number of items in response (default: 50)";
        readonly type: "number";
        readonly default: 50;
    }, {
        readonly name: "page";
        readonly description: "Page number for pagination (default: 1)";
        readonly type: "number";
        readonly default: 1;
    }]>;
    get getQuantmetrics(): GameFunction<[{
        readonly name: "token_id";
        readonly description: "Comma separated Token IDs";
        readonly type: "string";
    }, {
        readonly name: "symbol";
        readonly description: "Comma separated token symbols";
        readonly type: "string";
    }, {
        readonly name: "limit";
        readonly description: "Limit the number of items in response (default: 50)";
        readonly type: "number";
        readonly default: 50;
    }, {
        readonly name: "page";
        readonly description: "Page number for pagination (default: 1)";
        readonly type: "number";
        readonly default: 1;
    }]>;
    get getHourlyOhlcv(): GameFunction<[{
        readonly name: "token_id";
        readonly description: "Comma separated Token IDs";
        readonly type: "string";
    }, {
        readonly name: "symbol";
        readonly description: "Comma separated token symbols";
        readonly type: "string";
    }, {
        readonly name: "token_name";
        readonly description: "Comma separated crypto asset names";
        readonly type: "string";
    }, {
        readonly name: "startDate";
        readonly description: "Start date in YYYY-MM-DD format (max 30 days from current)";
        readonly type: "string";
    }, {
        readonly name: "endDate";
        readonly description: "End date in YYYY-MM-DD format";
        readonly type: "string";
    }, {
        readonly name: "limit";
        readonly description: "Limit the number of items in response (default: 50)";
        readonly type: "number";
        readonly default: 50;
    }, {
        readonly name: "page";
        readonly description: "Page number for pagination (default: 1)";
        readonly type: "number";
        readonly default: 1;
    }]>;
    get getDailyOhlcv(): GameFunction<[{
        readonly name: "token_id";
        readonly description: "Comma separated Token IDs";
        readonly type: "string";
    }, {
        readonly name: "symbol";
        readonly description: "Comma separated token symbols";
        readonly type: "string";
    }, {
        readonly name: "token_name";
        readonly description: "Comma separated crypto asset names";
        readonly type: "string";
    }, {
        readonly name: "startDate";
        readonly description: "Start date in YYYY-MM-DD format (max 30 days from current)";
        readonly type: "string";
    }, {
        readonly name: "endDate";
        readonly description: "End date in YYYY-MM-DD format";
        readonly type: "string";
    }, {
        readonly name: "limit";
        readonly description: "Limit the number of items in response (default: 50)";
        readonly type: "number";
        readonly default: 50;
    }, {
        readonly name: "page";
        readonly description: "Page number for pagination (default: 1)";
        readonly type: "number";
        readonly default: 1;
    }]>;
    get getAiReports(): GameFunction<[{
        readonly name: "token_id";
        readonly description: "Comma separated Token IDs";
        readonly type: "string";
    }, {
        readonly name: "symbol";
        readonly description: "Comma separated token symbols";
        readonly type: "string";
    }, {
        readonly name: "limit";
        readonly description: "Limit the number of items in response (default: 50)";
        readonly type: "number";
        readonly default: 50;
    }, {
        readonly name: "page";
        readonly description: "Page number for pagination (default: 1)";
        readonly type: "number";
        readonly default: 1;
    }]>;
    get getCryptoInvestors(): GameFunction<[{
        readonly name: "limit";
        readonly description: "Limit the number of items in response (default: 50)";
        readonly type: "number";
        readonly default: 50;
    }, {
        readonly name: "page";
        readonly description: "Page number for pagination (default: 1)";
        readonly type: "number";
        readonly default: 1;
    }]>;
    get getResistanceSupport(): GameFunction<[{
        readonly name: "token_id";
        readonly description: "Comma separated Token IDs";
        readonly type: "string";
    }, {
        readonly name: "symbol";
        readonly description: "Comma separated token symbols";
        readonly type: "string";
    }, {
        readonly name: "limit";
        readonly description: "Limit the number of items in response (default: 50)";
        readonly type: "number";
        readonly default: 50;
    }, {
        readonly name: "page";
        readonly description: "Page number for pagination (default: 1)";
        readonly type: "number";
        readonly default: 1;
    }]>;
    get getTokenMetricsAi(): GameFunction<[{
        readonly name: "user_message";
        readonly description: "Your question or message to TokenMetrics AI (e.g., 'What is the next 100x coin?')";
        readonly type: "string";
    }]>;
    get getSentiments(): GameFunction<[{
        readonly name: "limit";
        readonly description: "Limit the number of items in response (default: 50)";
        readonly type: "number";
        readonly default: 50;
    }, {
        readonly name: "page";
        readonly description: "Page number for pagination (default: 1)";
        readonly type: "number";
        readonly default: 1;
    }]>;
    get getScenarioAnalysis(): GameFunction<[{
        readonly name: "token_id";
        readonly description: "Comma separated Token IDs. Click here to access the list of token IDs. Example: 3375,3306";
        readonly type: "string";
    }, {
        readonly name: "symbol";
        readonly description: "Comma separated Token Symbols. Click here to access the list of token symbols. Example: BTC,ETH";
        readonly type: "string";
    }, {
        readonly name: "limit";
        readonly description: "Limit the number of items in response (default: 50)";
        readonly type: "number";
        readonly default: 50;
    }, {
        readonly name: "page";
        readonly description: "Page number for pagination (default: 1)";
        readonly type: "number";
        readonly default: 1;
    }]>;
    get getCorrelation(): GameFunction<[{
        readonly name: "token_id";
        readonly description: "Comma separated Token IDs. Click here to access the list of token IDs. Example: 3375,3306";
        readonly type: "string";
    }, {
        readonly name: "symbol";
        readonly description: "Comma separated Token Symbols. Click here to access the list of token symbols. Example: BTC,ETH";
        readonly type: "string";
    }, {
        readonly name: "category";
        readonly description: "Comma separated category name. Click here to access the list of categories. Example: layer-1,nft";
        readonly type: "string";
    }, {
        readonly name: "exchange";
        readonly description: "Comma separated exchange name. Click here to access the list of exchanges. Example: gate,binance";
        readonly type: "string";
    }, {
        readonly name: "limit";
        readonly description: "Limit the number of items in response (default: 50)";
        readonly type: "number";
        readonly default: 50;
    }, {
        readonly name: "page";
        readonly description: "Page number for pagination (default: 1)";
        readonly type: "number";
        readonly default: 1;
    }]>;
}
export default TokenMetricsPlugin;
//# sourceMappingURL=index.d.ts.map