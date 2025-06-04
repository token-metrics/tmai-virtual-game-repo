import {
    GameWorker,
    GameFunction,
    ExecutableGameFunctionResponse,
    ExecutableGameFunctionStatus,
  } from "@virtuals-protocol/game";
  import { exceptionHandler, tokenMetricsApiCall, tokenMetricsApiPostCall } from "./utils";
  
  // Default configuration values
  export const DEFAULT_BASE_API_URL = "https://api.tokenmetrics.com/v2";
  
  // Interface for plugin configuration options
  interface ITokenMetricsPluginOptions {
    id?: string;
    name?: string;
    description?: string;
    apiClientConfig: {
      apiKey: string;
      baseApiUrl?: string;
    };
  }
  
  class TokenMetricsPlugin {
    private id: string;
    private name: string;
    private description: string;
    private apiKey: string;
    private baseApiUrl: string;
  
    constructor(options: ITokenMetricsPluginOptions) {
      this.id = options.id || "tokenmetrics_worker";
      this.name = options.name || "TokenMetrics AI Crypto Data Worker";
      this.description =
        options.description ||
        "Worker that provides AI-powered cryptocurrency analysis using TokenMetrics data including trader grades, investor grades, trading signals, market metrics, and comprehensive AI reports";
  
      this.apiKey = options.apiClientConfig.apiKey;
      this.baseApiUrl =
        options.apiClientConfig.baseApiUrl || DEFAULT_BASE_API_URL;
    }
  
    public getWorker(data?: {
      functions?: GameFunction<any>[];
      getEnvironment?: () => Promise<Record<string, any>>;
    }): GameWorker {
      return new GameWorker({
        id: this.id,
        name: this.name,
        description: this.description,
        functions: data?.functions || [
          this.getTokens,
          this.getTopMarketCapTokens,
          this.getPriceData,
          this.getTraderGrades,
          this.getInvestorGrades,
          this.getTradingSignals,
          this.getMarketMetrics,
          this.getQuantmetrics,
          this.getHourlyOhlcv,
          this.getDailyOhlcv,
          this.getAiReports,
          this.getCryptoInvestors,
          this.getResistanceSupport,
          this.getTokenMetricsAi,
          this.getSentiments,
          this.getScenarioAnalysis,
          this.getCorrelation,
        ],
        getEnvironment: data?.getEnvironment,
      });
    }
  
    get getTokens() {
      return new GameFunction({
        name: "get_tokens",
        description:
          "Get the list of coins and their associated TOKEN_ID supported by Token Metrics. Use this to find token IDs for other API calls.",
        args: [
          {
            name: "limit",
            description: "Limit the number of items in response (default: 50)",
            type: "number",
            default: 50,
          },
          {
            name: "page",
            description: "Page number for pagination (default: 1)",
            type: "number", 
            default: 1,
          },
          {
            name: "token_name",
            description: "Comma separated crypto asset names (e.g., Bitcoin, Ethereum)",
            type: "string",
          },
          {
            name: "symbol",
            description: "Comma separated token symbols (e.g., BTC, ETH)",
            type: "string",
          },
          {
            name: "category",
            description: "Comma separated category names",
            type: "string",
          },
        ] as const,
        executable: async (args: any, logger: any) => {
          try {
            logger(`Querying tokens list with limit: ${args.limit}, page: ${args.page}`);
  
            return await tokenMetricsApiCall(
              this.apiKey,
              this.baseApiUrl,
              "/tokens",
              args,
              logger
            );
          } catch (e: any) {
            return exceptionHandler(e, logger);
          }
        },
      });
    }
  
    get getTopMarketCapTokens() {
      return new GameFunction({
        name: "get_top_market_cap_tokens", 
        description:
          "Get the list of coins for top market cap. Useful for finding the most valuable cryptocurrencies by market capitalization.",
        args: [
          {
            name: "top_k",
            description: "Number of top cryptocurrencies to retrieve based on market cap (default: 100)",
            type: "number",
            default: 100,
          },
          {
            name: "page",
            description: "Page number for pagination (default: 1)",
            type: "number",
            default: 1,
          },
        ] as const,
        executable: async (args: any, logger: any) => {
          try {
            logger(`Querying top ${args.top_k} tokens by market cap`);
  
            return await tokenMetricsApiCall(
              this.apiKey,
              this.baseApiUrl,
              "/top-market-cap-tokens",
              args,
              logger
            );
          } catch (e: any) {
            return exceptionHandler(e, logger);
          }
        },
      });
    }
  
    get getPriceData() {
      return new GameFunction({
        name: "get_price_data",
        description:
          "Get token prices based on the provided token IDs. Returns current market prices for specified cryptocurrencies.",
        args: [
          {
            name: "token_id",
            description: "Comma separated Token IDs (e.g., 3375,3306 for BTC,ETH)",
            type: "string",
          },
        ] as const,
        executable: async (args: any, logger: any) => {
          try {
            if (!args.token_id) {
              return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Failed,
                "token_id is required for querying price data"
              );
            }
  
            logger(`Querying price data for token IDs: ${args.token_id}`);
  
            return await tokenMetricsApiCall(
              this.apiKey,
              this.baseApiUrl,
              "/price",
              args,
              logger
            );
          } catch (e: any) {
            return exceptionHandler(e, logger);
          }
        },
      });
    }
  
    get getTraderGrades() {
      return new GameFunction({
        name: "get_trader_grades",
        description:
          "Get the short term AI grades including 24h percent change for TM Trader Grade. These grades help identify short-term trading opportunities.",
        args: [
          {
            name: "token_id",
            description: "Comma separated Token IDs",
            type: "string",
          },
          {
            name: "startDate",
            description: "Start date in YYYY-MM-DD format (e.g., 2023-10-01)",
            type: "string",
          },
          {
            name: "endDate", 
            description: "End date in YYYY-MM-DD format (e.g., 2023-10-10)",
            type: "string",
          },
          {
            name: "symbol",
            description: "Comma separated token symbols (e.g., BTC,ETH)",
            type: "string",
          },
          {
            name: "limit",
            description: "Limit the number of items in response (default: 50)",
            type: "number",
            default: 50,
          },
          {
            name: "page",
            description: "Page number for pagination (default: 1)", 
            type: "number",
            default: 1,
          },
        ] as const,
        executable: async (args: any, logger: any) => {
          try {
            logger(`Querying trader grades with parameters: ${JSON.stringify(args)}`);
  
            return await tokenMetricsApiCall(
              this.apiKey,
              this.baseApiUrl,
              "/trader-grades",
              args,
              logger
            );
          } catch (e: any) {
            return exceptionHandler(e, logger);
          }
        },
      });
    }
  
    get getInvestorGrades() {
      return new GameFunction({
        name: "get_investor_grades",
        description:
          "Get the long term grades including Technology and Fundamental metrics. These provide comprehensive long-term investment analysis.",
        args: [
          {
            name: "token_id",
            description: "Comma separated Token IDs",
            type: "string",
          },
          {
            name: "startDate",
            description: "Start date in YYYY-MM-DD format",
            type: "string",
          },
          {
            name: "endDate",
            description: "End date in YYYY-MM-DD format", 
            type: "string",
          },
          {
            name: "symbol",
            description: "Comma separated token symbols",
            type: "string",
          },
          {
            name: "limit",
            description: "Limit the number of items in response (default: 50)",
            type: "number",
            default: 50,
          },
          {
            name: "page",
            description: "Page number for pagination (default: 1)",
            type: "number",
            default: 1,
          },
        ] as const,
        executable: async (args: any, logger: any) => {
          try {
            logger(`Querying investor grades with parameters: ${JSON.stringify(args)}`);
  
            return await tokenMetricsApiCall(
              this.apiKey,
              this.baseApiUrl,
              "/investor-grades", 
              args,
              logger
            );
          } catch (e: any) {
            return exceptionHandler(e, logger);
          }
        },
      });
    }
  
    get getTradingSignals() {
      return new GameFunction({
        name: "get_trading_signals",
        description:
          "Get the AI generated trading signals for long and short positions for all tokens. Provides buy/sell recommendations with signal strength.",
        args: [
          {
            name: "token_id",
            description: "Comma separated Token IDs",
            type: "string",
          },
          {
            name: "startDate",
            description: "Start date in YYYY-MM-DD format",
            type: "string",
          },
          {
            name: "endDate",
            description: "End date in YYYY-MM-DD format",
            type: "string",
          },
          {
            name: "symbol",
            description: "Comma separated token symbols",
            type: "string",
          },
          {
            name: "signal",
            description: "Current signal value (1=bullish, -1=bearish, 0=no signal)",
            type: "string",
          },
          {
            name: "limit",
            description: "Limit the number of items in response (default: 50)",
            type: "number",
            default: 50,
          },
          {
            name: "page",
            description: "Page number for pagination (default: 1)",
            type: "number",
            default: 1,
          },
        ] as const,
        executable: async (args: any, logger: any) => {
          try {
            logger(`Querying trading signals with parameters: ${JSON.stringify(args)}`);
  
            return await tokenMetricsApiCall(
              this.apiKey,
              this.baseApiUrl,
              "/trading-signals",
              args,
              logger
            );
          } catch (e: any) {
            return exceptionHandler(e, logger);
          }
        },
      });
    }
  
    get getMarketMetrics() {
      return new GameFunction({
        name: "get_market_metrics",
        description:
          "Get the Market Analytics from Token Metrics including Bullish/Bearish Market indicator. Provides overall crypto market sentiment and conditions.",
        args: [
          {
            name: "startDate",
            description: "Start date in YYYY-MM-DD format",
            type: "string",
          },
          {
            name: "endDate",
            description: "End date in YYYY-MM-DD format",
            type: "string",
          },
          {
            name: "limit",
            description: "Limit the number of items in response (default: 50)",
            type: "number",
            default: 50,
          },
          {
            name: "page",
            description: "Page number for pagination (default: 1)",
            type: "number",
            default: 1,
          },
        ] as const,
        executable: async (args: any, logger: any) => {
          try {
            logger(`Querying market metrics with parameters: ${JSON.stringify(args)}`);
  
            return await tokenMetricsApiCall(
              this.apiKey,
              this.baseApiUrl,
              "/market-metrics",
              args,
              logger
            );
          } catch (e: any) {
            return exceptionHandler(e, logger);
          }
        },
      });
    }
  
    get getQuantmetrics() {
      return new GameFunction({
        name: "get_quantmetrics",
        description:
          "Get the latest quantitative metrics for tokens. Provides advanced mathematical analysis and statistical data for cryptocurrencies.",
        args: [
          {
            name: "token_id",
            description: "Comma separated Token IDs",
            type: "string",
          },
          {
            name: "symbol",
            description: "Comma separated token symbols",
            type: "string",
          },
          {
            name: "limit",
            description: "Limit the number of items in response (default: 50)",
            type: "number",
            default: 50,
          },
          {
            name: "page",
            description: "Page number for pagination (default: 1)",
            type: "number",
            default: 1,
          },
        ] as const,
        executable: async (args: any, logger: any) => {
          try {
            logger(`Querying quantmetrics with parameters: ${JSON.stringify(args)}`);
  
            return await tokenMetricsApiCall(
              this.apiKey,
              this.baseApiUrl,
              "/quantmetrics",
              args,
              logger
            );
          } catch (e: any) {
            return exceptionHandler(e, logger);
          }
        },
      });
    }
  
    get getHourlyOhlcv() {
      return new GameFunction({
        name: "get_hourly_ohlcv",
        description:
          "Get hourly OHLCV (Open, High, Low, Close, Volume) data for tokens. Essential for technical analysis and charting.",
        args: [
          {
            name: "token_id",
            description: "Comma separated Token IDs", 
            type: "string",
          },
          {
            name: "symbol",
            description: "Comma separated token symbols",
            type: "string",
          },
          {
            name: "token_name",
            description: "Comma separated crypto asset names",
            type: "string",
          },
          {
            name: "startDate",
            description: "Start date in YYYY-MM-DD format (max 30 days from current)",
            type: "string",
          },
          {
            name: "endDate",
            description: "End date in YYYY-MM-DD format",
            type: "string",
          },
          {
            name: "limit",
            description: "Limit the number of items in response (default: 50)",
            type: "number",
            default: 50,
          },
          {
            name: "page",
            description: "Page number for pagination (default: 1)",
            type: "number",
            default: 1,
          },
        ] as const,
        executable: async (args: any, logger: any) => {
          try {
            logger(`Querying hourly OHLCV data with parameters: ${JSON.stringify(args)}`);
  
            return await tokenMetricsApiCall(
              this.apiKey,
              this.baseApiUrl,
              "/hourly-ohlcv",
              args,
              logger
            );
          } catch (e: any) {
            return exceptionHandler(e, logger);
          }
        },
      });
    }
  
    get getDailyOhlcv() {
      return new GameFunction({
        name: "get_daily_ohlcv",
        description:
          "Get daily OHLCV (Open, High, Low, Close, Volume) data for tokens. Perfect for longer-term technical analysis and trend identification.",
        args: [
          {
            name: "token_id",
            description: "Comma separated Token IDs",
            type: "string",
          },
          {
            name: "symbol",
            description: "Comma separated token symbols",
            type: "string",
          },
          {
            name: "token_name",
            description: "Comma separated crypto asset names",
            type: "string",
          },
          {
            name: "startDate",
            description: "Start date in YYYY-MM-DD format (max 30 days from current)",
            type: "string",
          },
          {
            name: "endDate",
            description: "End date in YYYY-MM-DD format",
            type: "string",
          },
          {
            name: "limit",
            description: "Limit the number of items in response (default: 50)",
            type: "number",
            default: 50,
          },
          {
            name: "page",
            description: "Page number for pagination (default: 1)",
            type: "number",
            default: 1,
          },
        ] as const,
        executable: async (args: any, logger: any) => {
          try {
            logger(`Querying daily OHLCV data with parameters: ${JSON.stringify(args)}`);
  
            return await tokenMetricsApiCall(
              this.apiKey,
              this.baseApiUrl,
              "/daily-ohlcv",
              args,
              logger
            );
          } catch (e: any) {
            return exceptionHandler(e, logger);
          }
        },
      });
    }
  
    get getAiReports() {
      return new GameFunction({
        name: "get_ai_reports",
        description:
          "Retrieve AI-generated reports providing comprehensive analyses of cryptocurrency tokens including deep dives, investment analyses, and code reviews.",
        args: [
          {
            name: "token_id",
            description: "Comma separated Token IDs",
            type: "string",
          },
          {
            name: "symbol",
            description: "Comma separated token symbols",
            type: "string",
          },
          {
            name: "limit",
            description: "Limit the number of items in response (default: 50)",
            type: "number",
            default: 50,
          },
          {
            name: "page",
            description: "Page number for pagination (default: 1)",
            type: "number",
            default: 1,
          },
        ] as const,
        executable: async (args: any, logger: any) => {
          try {
            logger(`Querying AI reports with parameters: ${JSON.stringify(args)}`);
  
            return await tokenMetricsApiCall(
              this.apiKey,
              this.baseApiUrl,
              "/ai-reports",
              args,
              logger
            );
          } catch (e: any) {
            return exceptionHandler(e, logger);
          }
        },
      });
    }
  
    get getCryptoInvestors() {
      return new GameFunction({
        name: "get_crypto_investors",
        description:
          "Get the latest list of crypto investors and their scores. Provides insights into institutional and whale investor behavior.",
        args: [
          {
            name: "limit",
            description: "Limit the number of items in response (default: 50)",
            type: "number",
            default: 50,
          },
          {
            name: "page",
            description: "Page number for pagination (default: 1)",
            type: "number",
            default: 1,
          },
        ] as const,
        executable: async (args: any, logger: any) => {
          try {
            logger(`Querying crypto investors with limit: ${args.limit}, page: ${args.page}`);
  
            return await tokenMetricsApiCall(
              this.apiKey,
              this.baseApiUrl,
              "/crypto-investors",
              args,
              logger
            );
          } catch (e: any) {
            return exceptionHandler(e, logger);
          }
        },
      });
    }
  
    get getResistanceSupport() {
      return new GameFunction({
        name: "get_resistance_support",
        description:
          "Get the historical levels of resistance and support for each token. Critical for technical analysis and identifying key price levels.",
        args: [
          {
            name: "token_id",
            description: "Comma separated Token IDs",
            type: "string",
          },
          {
            name: "symbol",
            description: "Comma separated token symbols",
            type: "string",
          },
          {
            name: "limit",
            description: "Limit the number of items in response (default: 50)",
            type: "number",
            default: 50,
          },
          {
            name: "page",
            description: "Page number for pagination (default: 1)",
            type: "number",
            default: 1,
          },
        ] as const,
        executable: async (args: any, logger: any) => {
          try {
            logger(`Querying resistance and support levels with parameters: ${JSON.stringify(args)}`);
  
            return await tokenMetricsApiCall(
              this.apiKey,
              this.baseApiUrl,
              "/resistance-support",
              args,
              logger
            );
          } catch (e: any) {
            return exceptionHandler(e, logger);
          }
        },
      });
    }

    get getTokenMetricsAi() {
      return new GameFunction({
        name: "get_tokenmetrics_ai",
        description:
          "Chat with TokenMetrics AI to get insights about cryptocurrency markets, trading strategies, and investment advice. Ask any crypto-related question.",
        args: [
          {
            name: "user_message",
            description: "Your question or message to TokenMetrics AI (e.g., 'What is the next 100x coin?')",
            type: "string",
          },
        ] as const,
        executable: async (args: any, logger: any) => {
          try {
            if (!args.user_message) {
              return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Failed,
                "user_message is required for TokenMetrics AI chat"
              );
            }

            logger(`Asking TokenMetrics AI: ${args.user_message}`);

            const requestBody = {
              messages: [
                {
                  user: args.user_message
                }
              ]
            };

            return await tokenMetricsApiPostCall(
              this.apiKey,
              this.baseApiUrl,
              "/tmai",
              requestBody,
              logger
            );
          } catch (e: any) {
            return exceptionHandler(e, logger);
          }
        },
      });
    }

    get getSentiments() {
      return new GameFunction({
        name: "get_sentiments",
        description:
          "Get the hourly sentiment score for Twitter, Reddit, and all the News, including quick summary of what happened. Useful for understanding market sentiment and social media trends.",
        args: [
          {
            name: "limit",
            description: "Limit the number of items in response (default: 50)",
            type: "number",
            default: 50,
          },
          {
            name: "page",
            description: "Page number for pagination (default: 1)",
            type: "number",
            default: 1,
          },
        ] as const,
        executable: async (args: any, logger: any) => {
          try {
            logger(`Querying sentiment data with limit: ${args.limit}, page: ${args.page}`);

            return await tokenMetricsApiCall(
              this.apiKey,
              this.baseApiUrl,
              "/sentiments",
              args,
              logger
            );
          } catch (e: any) {
            return exceptionHandler(e, logger);
          }
        },
      });
    }

    get getScenarioAnalysis() {
      return new GameFunction({
        name: "get_scenario_analysis",
        description:
          "Get the price prediction based on different Crypto Market scenarios. Provides forecasts under various market conditions (bullish, bearish, neutral).",
        args: [
          {
            name: "token_id",
            description: "Comma separated Token IDs. Click here to access the list of token IDs. Example: 3375,3306",
            type: "string",
          },
          {
            name: "symbol",
            description: "Comma separated Token Symbols. Click here to access the list of token symbols. Example: BTC,ETH",
            type: "string",
          },
          {
            name: "limit",
            description: "Limit the number of items in response (default: 50)",
            type: "number",
            default: 50,
          },
          {
            name: "page",
            description: "Page number for pagination (default: 1)",
            type: "number",
            default: 1,
          },
        ] as const,
        executable: async (args: any, logger: any) => {
          try {
            logger(`Querying scenario analysis with parameters: ${JSON.stringify(args)}`);

            return await tokenMetricsApiCall(
              this.apiKey,
              this.baseApiUrl,
              "/scenario-analysis",
              args,
              logger
            );
          } catch (e: any) {
            return exceptionHandler(e, logger);
          }
        },
      });
    }

    get getCorrelation() {
      return new GameFunction({
        name: "get_correlation",
        description:
          "Get the Top 10 and Bottom 10 correlation of tokens with the top 100 market cap tokens. Useful for portfolio diversification and understanding token relationships.",
        args: [
          {
            name: "token_id",
            description: "Comma separated Token IDs. Click here to access the list of token IDs. Example: 3375,3306",
            type: "string",
          },
          {
            name: "symbol",
            description: "Comma separated Token Symbols. Click here to access the list of token symbols. Example: BTC,ETH",
            type: "string",
          },
          {
            name: "category",
            description: "Comma separated category name. Click here to access the list of categories. Example: layer-1,nft",
            type: "string",
          },
          {
            name: "exchange",
            description: "Comma separated exchange name. Click here to access the list of exchanges. Example: gate,binance",
            type: "string",
          },
          {
            name: "limit",
            description: "Limit the number of items in response (default: 50)",
            type: "number",
            default: 50,
          },
          {
            name: "page",
            description: "Page number for pagination (default: 1)",
            type: "number",
            default: 1,
          },
        ] as const,
        executable: async (args: any, logger: any) => {
          try {
            logger(`Querying correlation data with parameters: ${JSON.stringify(args)}`);

            return await tokenMetricsApiCall(
              this.apiKey,
              this.baseApiUrl,
              "/correlation",
              args,
              logger
            );
          } catch (e: any) {
            return exceptionHandler(e, logger);
          }
        },
      });
    }
  }
  
  export default TokenMetricsPlugin;