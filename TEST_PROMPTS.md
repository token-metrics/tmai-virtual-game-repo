# TokenMetrics Plugin - Test Prompts

## 📊 **Trading Signals Endpoint** (`/trading-signals`)
Test these prompts - should route to dedicated trading signals endpoint:
- `trading signals`
- `show me signals`
- `buy sell signals`
- `get trading recommendations`
- `trading advice`

## 😊 **Sentiment Analysis Endpoint** (`/sentiments`)
Test these prompts - should route to sentiment analysis endpoint:
- `market sentiment`
- `sentiment analysis`
- `social media sentiment`
- `twitter sentiment`
- `reddit sentiment`
- `news sentiment`

## 🔮 **Scenario Analysis Endpoint** (`/scenario-analysis`)
Test these prompts - should route to price prediction endpoint:
- `price prediction`
- `scenario analysis`
- `price forecast`
- `bitcoin price scenarios`
- `price predictions`

## 🔗 **Correlation Analysis Endpoint** (`/correlation`)
Test these prompts - should route to correlation endpoint:
- `correlations`
- `token correlations`
- `portfolio correlations`
- `relationship analysis`
- `diversification analysis`

## 📈 **Market Overview** (Multiple Endpoints)
Test these prompts - should call multiple endpoints:
- `market overview`
- `general market overview`

## 🤖 **TokenMetrics AI Chat** (`/tmai`)
Test these prompts - should route to AI chat endpoint:
- `What is the next 100x coin?`
- `How does DeFi work?`
- `Why is crypto volatile?`
- `Should I invest in Bitcoin?`
- `AI explain blockchain`
- `What are the best altcoins?`
- `How to trade crypto?`

## 📊 **Other Data Endpoints** (Direct API calls)
These work through individual example files:
- Market Metrics: `npm run example:market-metrics`
- Top Tokens: `npm run example:top-market-cap-tokens`
- Token Grades: `npm run example:token-grades`
- Price Predictions: `npm run example:price-predictions`
- And 13 more endpoints...

## 🎯 **Expected Routing Behavior:**
1. **Specific keywords** (signals, sentiment, correlations) → Dedicated endpoints
2. **Question words** (what, how, why) → AI chat endpoint
3. **Market overview** → Multiple endpoints simultaneously
4. **Default fallback** → AI chat endpoint

## ✅ **Success Indicators:**
- Correct endpoint URL shown in logs
- Appropriate data formatting (charts, tables, analysis)
- No 429 rate limit errors (auto-retry working)
- Real-time data with current timestamps 