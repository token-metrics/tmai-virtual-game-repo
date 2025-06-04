"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenMetricsApiCall = tokenMetricsApiCall;
exports.tokenMetricsApiPostCall = tokenMetricsApiPostCall;
exports.exceptionHandler = exceptionHandler;
const game_1 = require("@virtuals-protocol/game");
async function tokenMetricsApiCall(apiKey, baseApiUrl, endpoint, args, logger) {
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
    return new game_1.ExecutableGameFunctionResponse(game_1.ExecutableGameFunctionStatus.Done, message);
}
async function tokenMetricsApiPostCall(apiKey, baseApiUrl, endpoint, body, logger) {
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
    return new game_1.ExecutableGameFunctionResponse(game_1.ExecutableGameFunctionStatus.Done, message);
}
function exceptionHandler(e, logger) {
    const errorMessage = `An error occurred while querying TokenMetrics data: ${e.message || "Unknown error"}`;
    logger(errorMessage);
    return new game_1.ExecutableGameFunctionResponse(game_1.ExecutableGameFunctionStatus.Failed, errorMessage);
}
//# sourceMappingURL=utils.js.map