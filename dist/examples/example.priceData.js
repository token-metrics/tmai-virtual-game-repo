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
// Create an agent to get real-time price data
const agent = new game_1.GameAgent(process.env.GAME_API_KEY ?? "", {
    name: "TokenMetrics Price Data Agent",
    goal: "Get real-time cryptocurrency prices based on token IDs for current market valuation.",
    description: "You are an AI agent specialized in retrieving real-time cryptocurrency price data using TokenMetrics. You provide current market prices, market capitalizations, and pricing information for specified cryptocurrencies using their token IDs.",
    workers: [
        tokenMetricsPlugin.getWorker({
            functions: [tokenMetricsPlugin.getPriceData],
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
//# sourceMappingURL=example.priceData.js.map