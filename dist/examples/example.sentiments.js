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
// Create an agent to get market sentiment analysis
const agent = new game_1.GameAgent(process.env.GAME_API_KEY ?? "", {
    name: "TokenMetrics Sentiment Analysis Agent",
    goal: "Get hourly sentiment scores from Twitter, Reddit, and news sources to understand market sentiment and social media trends.",
    description: "You are an AI agent specialized in analyzing cryptocurrency market sentiment. You can retrieve hourly sentiment scores from social media platforms (Twitter, Reddit) and news sources, providing insights into market psychology and social trends that influence crypto prices.",
    workers: [
        tokenMetricsPlugin.getWorker({
            functions: [tokenMetricsPlugin.getSentiments],
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
//# sourceMappingURL=example.sentiments.js.map