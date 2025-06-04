# 🚀 TokenMetrics Plugin for Virtuals Game

> 🎯 **Supercharge your G.A.M.E agents with AI-powered cryptocurrency analysis!**

The TokenMetrics plugin seamlessly empowers G.A.M.E agents with comprehensive cryptocurrency analysis capabilities using the TokenMetrics API, enabling the retrieval of AI-powered market data, trading signals, and investment insights without introducing any additional complexity.

---

## ✨ Features

- 📊 **Comprehensive Token Data**: Access to 17 TokenMetrics API endpoints
- 🤖 **AI-Powered Analysis**: Get AI reports, sentiment analysis, and market insights
- 📈 **Trading Intelligence**: Retrieve trader grades, investor grades, and trading signals
- 📉 **Market Analytics**: Access quantmetrics, OHLCV data, and correlation analysis
- ⚡ **Real-time Data**: Current prices, market metrics, and resistance/support levels
- 💬 **Interactive Chat Interface**: Built-in chat system for testing and exploration
- 🛡️ **Robust Error Handling**: Built-in error handling and rate limiting

---

## 🔧 Available Functions

### 📋 Core Data Functions
| Function | Description | 🎯 Purpose |
|----------|-------------|-----------|
| `getTokens` | Get supported cryptocurrencies and TOKEN_IDs | 🪙 Token Discovery |
| `getTopMarketCapTokens` | Retrieve top cryptos by market cap | 👑 Market Leaders |
| `getPriceData` | Get current market prices | 💰 Price Tracking |

### 📊 Trading & Investment Analysis
| Function | Description | 🎯 Purpose |
|----------|-------------|-----------|
| `getTraderGrades` | AI-powered trader performance grades | 🏆 Performance Analysis |
| `getInvestorGrades` | Investor performance analysis | 🎯 Investment Insights |
| `getTradingSignals` | Buy/sell/hold recommendations | 📡 Trading Signals |
| `getMarketMetrics` | Comprehensive market analysis | 📈 Market Overview |

### 🔬 Advanced Analytics
| Function | Description | 🎯 Purpose |
|----------|-------------|-----------|
| `getQuantmetrics` | Quantitative trading metrics | 🧮 Quant Analysis |
| `getHourlyOhlcv` | Hourly OHLC data with volume | ⏰ Short-term Data |
| `getDailyOhlcv` | Daily OHLC with technical indicators | 📅 Long-term Data |

### 🤖 AI & Research
| Function | Description | 🎯 Purpose |
|----------|-------------|-----------|
| `getAiReports` | AI-generated market reports | 📝 Research Reports |
| `getTokenMetricsAi` | Custom AI analysis queries | 🧠 Custom Analysis |
| `getSentiments` | Market sentiment analysis | 😊 Sentiment Tracking |
| `getCryptoInvestors` | Crypto investor performance | 💼 Investor Data |

### 📈 Technical Analysis
| Function | Description | 🎯 Purpose |
|----------|-------------|-----------|
| `getResistanceSupport` | Resistance and support levels | 🎯 Key Levels |
| `getScenarioAnalysis` | Scenario-based projections | 🔮 Future Scenarios |
| `getCorrelation` | Crypto correlation analysis | 🔗 Relationship Analysis |

---

## 🚀 Quick Start

### 📦 Installation

```bash
# Using npm
npm install tokenmetrics-virtuals-plugin

# Using yarn
yarn add tokenmetrics-virtuals-plugin
```

### 🔑 Environment Setup

Set up your environment variables:

```bash
# Copy the example environment file
cp env.example .env

# Edit the .env file with your API keys
export TOKENMETRICS_API_KEY="your-tokenmetrics-api-key"
export GAME_API_KEY="your-game-api-key"
```

**Required Environment Variables:**
- `TOKENMETRICS_API_KEY`: Your TokenMetrics API key (get one from [TokenMetrics](https://tokenmetrics.com))
- `GAME_API_KEY`: Your Virtuals Protocol GAME API key

> 💡 **Need API keys?** 
> - **TokenMetrics API**: Contact [TokenMetrics](https://tokenmetrics.com) to get started!
> - **GAME API**: Get your key from [Virtuals Protocol](https://virtuals.io)

### ✅ Installation Verification

Verify your installation works correctly:

```bash
# Test the plugin setup
npm run test:setup

# Run a quick example
npm run example:tokens
```

### 💻 Basic Usage

```typescript
import { config } from "dotenv";
config({ path: "./.env" });
import TokenMetricsPlugin from "tokenmetrics-virtuals-plugin";
import { GameAgent } from "@virtuals-protocol/game";

// 🔧 Initialize the plugin
const tokenMetricsPlugin = new TokenMetricsPlugin({
  apiClientConfig: {
    apiKey: process.env.TOKENMETRICS_API_KEY!,
  },
});

// 🤖 Create your crypto analysis agent
const agent = new GameAgent(process.env.GAME_API_KEY ?? "", {
  name: "🚀 Crypto Analysis Agent",
  goal: "Provide comprehensive cryptocurrency market analysis and trading insights",
  description: "You are an AI agent specialized in cryptocurrency analysis. Use TokenMetrics API to help users make informed trading decisions! 📊",
  workers: [tokenMetricsPlugin.getWorker({})], // Include ALL 17 functions
});

// 🎯 Run your agent
(async () => {
  // 📝 Optional: Set up logging
  agent.setLogger((agent, message) => {
    console.log(`🤖 [${agent.name}] 📢`);
    console.log(message);
  });

  await agent.init();

  // 🚀 Example: Get token list
  const result = await agent.run("Show me the available tokens");
  console.log(result);
})();
```

### ⚙️ Custom Configuration

```typescript
// 🎛️ Customize your worker
const customWorker = tokenMetricsPlugin.getWorker({
  functions: [
    tokenMetricsPlugin.getTokens,
    tokenMetricsPlugin.getPriceData,
    tokenMetricsPlugin.getTradingSignals,
  ],
  getEnvironment: async () => ({
    customSetting: "value",
  }),
});
```

### 📋 Configuration Options

```typescript
interface ITokenMetricsPluginOptions {
  id?: string;           // 🆔 Custom worker ID
  name?: string;         // 📛 Custom worker name  
  description?: string;  // 📝 Custom worker description
  apiClientConfig: {
    apiKey: string;      // 🔑 TokenMetrics API key
    baseApiUrl?: string; // 🌐 Custom API endpoint (optional)
  };
}
```

---

## 🛠️ Development

### 🏗️ Setup

```bash
# 1️⃣ Clone the repository
git clone <repository-url>

# 2️⃣ Install dependencies
npm install

# 3️⃣ Set up environment variables
cp env.example .env
# Edit .env file with your API keys:
# TOKENMETRICS_API_KEY=tm-your-tokenmetrics-api-key-here
# GAME_API_KEY=your-game-api-key-here

# 4️⃣ Build the plugin
npm run build

# 5️⃣ Run the example
npm run example:full-agent
# or
npm run dev
```

---

## 💬 Interactive Chat Interface

Launch the interactive terminal for testing:

```bash
npm run chat
```

### 🎮 Example Chat Commands

- 💰 `"What's the price of Bitcoin?"`
- 📊 `"Show me trading signals"`
- 🏆 `"Get trader grades for top tokens"`
- 😊 `"Analyze market sentiment"`
- 📝 `"Show me AI reports"`
- 🔗 `"Get correlation analysis"`

---

## 🎯 Examples & Testing

### 📊 Basic Token Data
```bash
npm run example:tokens          # 🪙 Get token list
npm run example:price-data      # 💰 Get price data
npm run example:top-market-cap  # 👑 Get top market cap tokens
```

### 📈 Trading Analysis
```bash
npm run example:trader-grades    # 🏆 Get trader performance grades
npm run example:investor-grades  # 🎯 Get investor analysis
npm run example:trading-signals  # 📡 Get trading recommendations
```

### 📉 Market Analytics
```bash
npm run example:market-metrics   # 📊 Get market analysis
npm run example:quantmetrics     # 🧮 Get quantitative metrics
npm run example:hourly-ohlcv     # ⏰ Get hourly price data
npm run example:daily-ohlcv      # 📅 Get daily price data
```

### 🤖 AI & Research
```bash
npm run example:ai-reports       # 📝 Get AI-generated reports
npm run example:tokenmetrics-ai  # 🧠 Query TokenMetrics AI
npm run example:sentiments       # 😊 Get sentiment analysis
npm run example:crypto-investors # 💼 Get crypto investor data
```

### 📈 Technical Analysis
```bash
npm run example:resistance-support  # 🎯 Get support/resistance levels
npm run example:scenario-analysis   # 🔮 Get scenario projections
npm run example:correlation         # 🔗 Get correlation analysis
```

### 🧪 Testing Suite

```bash
npm run test:all                 # 🧪 Run all tests
npm run test:individual          # 🔍 Test individual functions
npm run test:integration         # 🔄 Test integration scenarios
```

### 🎮 Demo Scenarios

```bash
npm run demo:trading-bot         # 🤖 Trading bot simulation
npm run demo:research-agent      # 🔬 Research agent demo
npm run demo:new-endpoints       # ✨ New endpoints demonstration
```

---

## 📚 API Reference

### 🔧 Core Functions

#### 🪙 getTokens(args)
Get the list of supported cryptocurrencies.

**Parameters:**
- `limit` (number): Number of items to return (default: 50)
- `page` (number): Page number for pagination (default: 1)
- `token_name` (string): Comma-separated crypto asset names
- `symbol` (string): Comma-separated token symbols
- `category` (string): Comma-separated category names

#### 💰 getPriceData(args)
Get current market prices for specified tokens.

**Parameters:**
- `token_id` (string): Comma-separated Token IDs (required)

#### 📡 getTradingSignals(args)
Get AI-powered trading recommendations.

**Parameters:**
- `token_id` (string): Comma-separated Token IDs
- `limit` (number): Number of signals to return
- `page` (number): Page number for pagination

### 🔬 Advanced Functions

#### 🧮 getQuantmetrics(args)
Get comprehensive quantitative trading metrics.

**Parameters:**
- `token_id` (string): Comma-separated Token IDs
- `limit` (number): Number of results to return
- `page` (number): Page number for pagination

#### 📝 getAiReports(args)
Get AI-generated comprehensive market reports.

**Parameters:**
- `token_id` (string): Comma-separated Token IDs
- `limit` (number): Number of reports to return
- `page` (number): Page number for pagination

> 📖 **Complete Documentation**: [TokenMetrics API Documentation](https://developers.tokenmetrics.com/)

---

## 🛡️ Error Handling

The plugin includes comprehensive error handling:

- ⏱️ **Rate Limiting**: Automatic rate limiting with configurable delays
- 🔄 **Retry Logic**: Exponential backoff for failed requests
- ✅ **Validation**: Input validation for all parameters
- 🎯 **Graceful Degradation**: Fallback responses for API failures

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. 🍴 Fork the repository
2. 🌟 Create your feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add some amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔁 Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🆘 Support

Need help? We've got you covered:

- 🐛 **Bug Reports**: Create an issue on GitHub
- 🔧 **API Questions**: Contact TokenMetrics support
- 📚 **Documentation**: Check our comprehensive examples and tests
- 💬 **Community**: Join our discussions

---

## 📈 Changelog

### 🎉 v1.0.0
- ✨ Initial release with 17 TokenMetrics API endpoints
- 💬 Interactive chat interface
- 📚 Comprehensive examples and tests
- 🛡️ Built-in error handling and rate limiting
- 🔷 Full TypeScript support

---

<div align="center">

**🚀 Ready to revolutionize your crypto analysis?**

[📖 Documentation](https://developers.tokenmetrics.com/)

---

*Made with ❤️ by the TokenMetrics team*

</div>