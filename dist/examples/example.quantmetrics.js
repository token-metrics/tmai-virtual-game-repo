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
// Create an agent to get quantitative metrics
const agent = new game_1.GameAgent(process.env.GAME_API_KEY ?? "", {
    name: "TokenMetrics Quantitative Analyst",
    goal: "Get advanced quantitative metrics and statistical analysis for cryptocurrency tokens to support data-driven investment decisions.",
    description: "You are an AI agent specialized in quantitative cryptocurrency analysis using TokenMetrics advanced mathematical models. You provide statistical metrics, quantitative indicators, and mathematical analysis to support sophisticated trading and investment strategies.",
    workers: [
        tokenMetricsPlugin.getWorker({
            functions: [tokenMetricsPlugin.getQuantmetrics],
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
//# sourceMappingURL=example.quantmetrics.js.map