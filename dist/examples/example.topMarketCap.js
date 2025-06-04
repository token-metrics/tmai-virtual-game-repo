"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: "./.env" });
const game_1 = require("@virtuals-protocol/game");
const index_1 = __importDefault(require("../index"));
const tokenMetricsPlugin = new index_1.default({
    apiClientConfig: {
        apiKey: process.env.TOKENMETRICS_API_KEY,
    },
});
// Create an agent to get top market cap cryptocurrencies
const agent = new game_1.GameAgent(process.env.GAME_API_KEY ?? "", {
    name: "TokenMetrics Top Market Cap Agent",
    goal: "Get the list of top cryptocurrencies by market capitalization to identify the most valuable and established digital assets.",
    description: "You are an AI agent specialized in identifying leading cryptocurrencies by market capitalization using TokenMetrics data. You provide information about the most valuable and established digital assets in the crypto market.",
    workers: [
        tokenMetricsPlugin.getWorker({
            functions: [tokenMetricsPlugin.getTopMarketCapTokens],
        }),
    ],
});
(async () => {
    agent.setLogger((agent, message) => {
        console.log(`-----[${agent.name}]-----`);
        console.log(message);
        console.log("\n");
    });
    await agent.init();
    while (true) {
        await agent.step({
            verbose: true,
        });
    }
})();
//# sourceMappingURL=example.topMarketCap.js.map