// *******************************************************************************************
// Function to get gas fee details based on priority level
function getGasFeeEstimate(data, priority = 'medium') {
    if (!['low', 'medium', 'high'].includes(priority)) {
        throw new Error('Invalid priority level. Choose between "low", "medium", or "high".');
    }

    const estimate = data[priority];
    return {
        maxPriorityFeePerGas: estimate.suggestedMaxPriorityFeePerGas,
        maxFeePerGas: estimate.suggestedMaxFeePerGas,
        minWaitTimeEstimate: estimate.minWaitTimeEstimate,
        maxWaitTimeEstimate: estimate.maxWaitTimeEstimate
    };
}

// Usage example
const jsonData = { /* Your JSON object here */ };
const gasFeeEstimate = getGasFeeEstimate(jsonData, 'medium');
console.log(gasFeeEstimate);


// *********************************************************************************************
// Function to get network congestion
function getNetworkCongestion(data) {
    return data.networkCongestion;
}

// Usage example
const networkCongestion = getNetworkCongestion(jsonData);
console.log(`Network Congestion: ${networkCongestion * 100}%`);



// **********************************************************************************************

// Function to analyze fee trends
function analyzeFeeTrends(data) {
    return {
        priorityFeeTrend: data.priorityFeeTrend,
        baseFeeTrend: data.baseFeeTrend
    };
}

// Usage example
const feeTrends = analyzeFeeTrends(jsonData);
console.log(`Priority Fee Trend: ${feeTrends.priorityFeeTrend}`);
console.log(`Base Fee Trend: ${feeTrends.baseFeeTrend}`);


// *********************************************************************************************

// Function to get historical fee ranges
function getHistoricalFeeRanges(data) {
    return {
        historicalPriorityFeeRange: data.historicalPriorityFeeRange,
        historicalBaseFeeRange: data.historicalBaseFeeRange
    };
}

// Usage example
const historicalFeeRanges = getHistoricalFeeRanges(jsonData);
console.log('Historical Priority Fee Range:', historicalFeeRanges.historicalPriorityFeeRange);
console.log('Historical Base Fee Range:', historicalFeeRanges.historicalBaseFeeRange);



// ******************************************************************************************************


// Function to estimate transaction gas fees
async function estimateTransactionGasFees(web3, data, priority = 'medium') {
    const gasEstimate = getGasFeeEstimate(data, priority);
    const baseFee = web3.utils.toWei(data.estimatedBaseFee, 'gwei');
    const maxPriorityFee = web3.utils.toWei(gasEstimate.maxPriorityFeePerGas, 'gwei');
    const maxFee = web3.utils.toWei(gasEstimate.maxFeePerGas, 'gwei');

    return {
        baseFee,
        maxPriorityFee,
        maxFee
    };
}

// Usage example with Web3.js
// Assuming you have initialized a Web3 instance
const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

estimateTransactionGasFees(web3, jsonData, 'medium').then(gasFees => {
    console.log('Estimated Gas Fees:', gasFees);
});





// INFURA API_KEY = 71583074c5c34727b3ec122ec0bea1e0
// INFURA API_SECRET = po8JmUrX5y3zWZ6hmdxw60NTulqAmTqn6iq839dRZvlrW/P3EU28hw