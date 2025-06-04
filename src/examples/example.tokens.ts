import { config } from "dotenv";
config({ path: "./.env" });
import { GameAgent } from "@virtuals-protocol/game";
import TokenMetricsPlugin from "../index";

const tokenMetricsPlugin = new TokenMetricsPlugin({
  apiClientConfig: {
    apiKey: process.env.TOKENMETRICS_API_KEY!,
  },
});

// Create an agent to get the tokens database
const agent = new GameAgent(process.env.GAME_API_KEY ?? "", {
  name: "TokenMetrics Token Database Agent",
  goal: "Get the list of all cryptocurrencies and their token IDs from the TokenMetrics database.",
  description:
    "You are an AI agent specialized in retrieving cryptocurrency token information. You can search the TokenMetrics database to find token IDs, symbols, names, and categories for over 6,000 crypto assets.",
  workers: [
    tokenMetricsPlugin.getWorker({
      functions: [tokenMetricsPlugin.getTokens],
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