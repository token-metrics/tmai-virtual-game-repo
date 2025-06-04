import {
    ExecutableGameFunctionResponse,
    ExecutableGameFunctionStatus,
  } from "@virtuals-protocol/game";
  
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
    
    logger(`Making API request to: ${url}`);
  
    // Make the API request
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
  
    const jsonResponse = await response.json();
  
    const message = `Successfully queried TokenMetrics data. Response: ${JSON.stringify(jsonResponse)}`;
    logger(message);
  
    return new ExecutableGameFunctionResponse(
      ExecutableGameFunctionStatus.Done,
      message
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
    
    logger(`Making POST API request to: ${url}`);
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
  
    const jsonResponse = await response.json();
  
    const message = `Successfully queried TokenMetrics AI. Response: ${JSON.stringify(jsonResponse)}`;
    logger(message);
  
    return new ExecutableGameFunctionResponse(
      ExecutableGameFunctionStatus.Done,
      message
    );
  }
  
  export function exceptionHandler(e: any, logger: any) {
    const errorMessage = `An error occurred while querying TokenMetrics data: ${
      e.message || "Unknown error"
    }`;
    logger(errorMessage);
    return new ExecutableGameFunctionResponse(
      ExecutableGameFunctionStatus.Failed,
      errorMessage
    );
  }