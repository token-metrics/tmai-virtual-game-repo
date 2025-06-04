import {
    ExecutableGameFunctionResponse,
    ExecutableGameFunctionStatus,
  } from "@virtuals-protocol/game";
  
  // Color coding for beautiful console output
  const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m'
  };

  // Format large numbers with commas
  function formatNumber(num: any): string {
    if (num === null || num === undefined) return 'N/A';
    const number = parseFloat(num);
    if (isNaN(number)) return 'N/A';
    return number.toLocaleString();
  }

  // Format price with appropriate decimal places
  function formatPrice(price: any): string {
    if (price === null || price === undefined) return 'N/A';
    const num = parseFloat(price);
    if (isNaN(num)) return 'N/A';
    
    if (num >= 1) {
      return `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else if (num >= 0.01) {
      return `$${num.toFixed(4)}`;
    } else {
      return `$${num.toFixed(8)}`;
    }
  }

  // Format tokens response for better readability
  function formatTokensResponse(tokens: any[]): string {
    if (!tokens || tokens.length === 0) {
      return `${colors.yellow}No tokens found.${colors.reset}`;
    }

    let output = `${colors.cyan}${colors.bright}🪙 TokenMetrics Supported Cryptocurrencies${colors.reset}\n`;
    output += `${colors.cyan}${'═'.repeat(60)}${colors.reset}\n\n`;
    
    output += `${colors.green}Found ${tokens.length} cryptocurrencies:${colors.reset}\n\n`;
    
    // Table header
    output += `${colors.bright}${'ID'.padEnd(8)} ${'Symbol'.padEnd(12)} ${'Name'.padEnd(25)} ${'Category'.padEnd(15)}${colors.reset}\n`;
    output += `${colors.dim}${'─'.repeat(8)} ${'─'.repeat(12)} ${'─'.repeat(25)} ${'─'.repeat(15)}${colors.reset}\n`;
    
    // Show first 20 tokens with better formatting
    const displayTokens = tokens.slice(0, 20);
    displayTokens.forEach(token => {
      const id = (token.TOKEN_ID || token.id || 'N/A').toString().padEnd(8);
      const symbol = (token.TOKEN_SYMBOL || token.symbol || 'N/A').padEnd(12);
      const name = (token.TOKEN_NAME || token.name || 'N/A').substring(0, 24).padEnd(25);
      const category = (token.CATEGORY || token.category || 'N/A').substring(0, 14).padEnd(15);
      
      output += `${colors.white}${id} ${colors.yellow}${symbol} ${colors.green}${name} ${colors.blue}${category}${colors.reset}\n`;
    });
    
    if (tokens.length > 20) {
      output += `\n${colors.dim}... and ${tokens.length - 20} more tokens${colors.reset}\n`;
    }
    
    output += `\n${colors.cyan}${'═'.repeat(60)}${colors.reset}\n`;
    output += `${colors.green}✅ Total tokens available: ${formatNumber(tokens.length)}${colors.reset}\n`;
    
    return output;
  }

  // Format price data response
  function formatPriceResponse(priceData: any[]): string {
    if (!priceData || priceData.length === 0) {
      return `${colors.yellow}No price data found.${colors.reset}`;
    }

    let output = `${colors.cyan}${colors.bright}💰 Current Cryptocurrency Prices${colors.reset}\n`;
    output += `${colors.cyan}${'═'.repeat(60)}${colors.reset}\n\n`;
    
    // Table header
    output += `${colors.bright}${'Symbol'.padEnd(12)} ${'Name'.padEnd(20)} ${'Price'.padEnd(15)} ${'Change 24h'.padEnd(12)}${colors.reset}\n`;
    output += `${colors.dim}${'─'.repeat(12)} ${'─'.repeat(20)} ${'─'.repeat(15)} ${'─'.repeat(12)}${colors.reset}\n`;
    
    priceData.forEach(token => {
      const symbol = (token.TOKEN_SYMBOL || token.symbol || 'N/A').padEnd(12);
      const name = (token.TOKEN_NAME || token.name || 'N/A').substring(0, 19).padEnd(20);
      const price = formatPrice(token.CURRENT_PRICE || token.PRICE || token.price).padEnd(15);
      const change = token.change_24h ? 
        (token.change_24h >= 0 ? 
          `${colors.green}+${token.change_24h.toFixed(2)}%${colors.reset}` : 
          `${colors.red}${token.change_24h.toFixed(2)}%${colors.reset}`
        ).padEnd(20) : 'N/A'.padEnd(12);
      
      output += `${colors.yellow}${symbol} ${colors.green}${name} ${colors.white}${price} ${change}\n`;
    });
    
    output += `\n${colors.cyan}${'═'.repeat(60)}${colors.reset}\n`;
    
    return output;
  }

  // Enhanced API call function with better formatting
  export async function tokenMetricsApiCall(
    apiKey: string,
    baseApiUrl: string,
    endpoint: string,
    args: any,
    logger: any
  ) {
    // Prepare headers for the request
    const headers = {
      "accept": "application/json",
      "x-api-key": apiKey,
    };
  
    // Build query parameters
    const queryParams = new URLSearchParams();
    Object.keys(args).forEach(key => {
      if (args[key] !== undefined && args[key] !== null) {
        queryParams.append(key, args[key].toString());
      }
    });
  
    // Prepare request URL
    const url = `${baseApiUrl}${endpoint}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    logger(`${colors.blue}🔍 Making API request to: ${endpoint}${colors.reset}`);
    logger(`${colors.dim}📋 Full URL: ${url}${colors.reset}`);
    logger(`${colors.dim}📋 Parameters: ${JSON.stringify(args)}${colors.reset}`);
    logger(`${colors.dim}📋 Query string: ${queryParams.toString()}${colors.reset}`);
  
    // Make the API request
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
  
    const jsonResponse: any = await response.json();
  
    // Format response based on endpoint
    let formattedMessage = '';
    
    if (endpoint === '/tokens' && jsonResponse.data) {
      formattedMessage = formatTokensResponse(jsonResponse.data);
    } else if (endpoint === '/price' && jsonResponse.data) {
      formattedMessage = formatPriceResponse(jsonResponse.data);
    } else {
      // Default formatting for other endpoints
      formattedMessage = `${colors.green}✅ Successfully retrieved data from ${endpoint}${colors.reset}\n\n`;
      formattedMessage += `${colors.cyan}Response Summary:${colors.reset}\n`;
      
      if (jsonResponse.data && Array.isArray(jsonResponse.data)) {
        formattedMessage += `${colors.white}• Found ${jsonResponse.data.length} items${colors.reset}\n`;
        if (jsonResponse.data.length > 0) {
          formattedMessage += `${colors.white}• Sample data: ${JSON.stringify(jsonResponse.data[0], null, 2)}${colors.reset}\n`;
        }
      } else {
        formattedMessage += `${colors.white}${JSON.stringify(jsonResponse, null, 2)}${colors.reset}\n`;
      }
    }
    
    logger(formattedMessage);
  
    return new ExecutableGameFunctionResponse(
      ExecutableGameFunctionStatus.Done,
      formattedMessage
    );
  }

  export async function tokenMetricsApiPostCall(
    apiKey: string,
    baseApiUrl: string,
    endpoint: string,
    body: any,
    logger: any
  ) {
    // Prepare headers for the POST request
    const headers = {
      "accept": "application/json",
      "content-type": "application/json",
      "x-api-key": apiKey,
    };
  
    // Prepare request URL
    const url = `${baseApiUrl}${endpoint}`;
    
    logger(`${colors.blue}🔍 Making POST API request to: ${endpoint}${colors.reset}`);
    logger(`Request body: ${JSON.stringify(body)}`);
  
    // Make the API request
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
  
    const jsonResponse: any = await response.json();
  
    const formattedMessage = `${colors.green}✅ Successfully queried TokenMetrics AI${colors.reset}\n\n${colors.cyan}AI Response:${colors.reset}\n${colors.white}${JSON.stringify(jsonResponse, null, 2)}${colors.reset}`;
    logger(formattedMessage);
  
    return new ExecutableGameFunctionResponse(
      ExecutableGameFunctionStatus.Done,
      formattedMessage
    );
  }
  
  export function exceptionHandler(e: any, logger: any) {
    const errorMessage = `${colors.red}❌ An error occurred while querying TokenMetrics data:${colors.reset}\n${colors.yellow}${e.message || "Unknown error"}${colors.reset}`;
    logger(errorMessage);
    return new ExecutableGameFunctionResponse(
      ExecutableGameFunctionStatus.Failed,
      errorMessage
    );
  }