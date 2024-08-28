const { Web3 } = require('web3');

require("dotenv").config();
const key = process.env.INFURA_API_KEY
// const web3 = new Web3(`https://mainnet.infura.io/v3/${key}`);
const web3 = new Web3(`https://rpc.eth.testnet.creatachain.com/`);




const ethereumModesOfTransaction=async()=>{
    const sugguestedPriority = [1, 1.5, 2]
    const arbitraryConstant = [1, 1.35, 1.70]
    return await web3.eth.getBlock("pending").then(async (block) => {
        const baseFeePerGas = +web3.utils.fromWei(block.baseFeePerGas, "gwei");

        const slow = sugguestedPriority[0] + baseFeePerGas * arbitraryConstant[0];
        const average = sugguestedPriority[1] + baseFeePerGas * arbitraryConstant[1];
        const fast = sugguestedPriority[2] + baseFeePerGas * arbitraryConstant[2];
        const EstimatedBaseFeePerGas = baseFeePerGas;

        return {
            "low": {
                "suggestedMaxPriorityFeePerGas": sugguestedPriority[0],
                "suggestedMaxFeePerGas": slow,
                "minWaitTimeEstimate": 15000,
                "maxWaitTimeEstimate": 60000
            },
            "medium": {
                "suggestedMaxPriorityFeePerGas": sugguestedPriority[1],
                "suggestedMaxFeePerGas": average,
                "minWaitTimeEstimate": 15000,
                "maxWaitTimeEstimate": 45000
            },
            "high": {
                "suggestedMaxPriorityFeePerGas": sugguestedPriority[2],
                "suggestedMaxFeePerGas": fast,
                "minWaitTimeEstimate": 15000,
                "maxWaitTimeEstimate": 30000
            },
            "estimatedBaseFee": EstimatedBaseFeePerGas,
            "networkCongestion": 0.96,
        };
    });
}

// ethereumModesOfTransaction().then((res)=>console.table(res))
 



 

// Function to calculate network congestion
async function calculateNetworkCongestion(web3, numBlocks = 500) {
    const latestBlock = await web3.eth.getBlock('latest');
    const latestBaseFee = Number(web3.utils.fromWei(latestBlock.baseFeePerGas, 'gwei'));

    let historicalBaseFees = [];

    // Get base fees from previous blocks
    for (let i = 1; i <= numBlocks; i++) {
        const block = await web3.eth.getBlock(Number(latestBlock.number) - i);
        const baseFee = Number(web3.utils.fromWei(block.baseFeePerGas, 'gwei'));
        historicalBaseFees.push(baseFee);
    }

    // Calculate historical range
    const minHistoricalBaseFee = Math.min(...historicalBaseFees);
    const maxHistoricalBaseFee = Math.max(...historicalBaseFees);

    // Estimate congestion as a percentage where 100% is when the base fee is at its historical max
    const congestion = ((latestBaseFee - minHistoricalBaseFee) / (maxHistoricalBaseFee - minHistoricalBaseFee)) ;

    return congestion.toFixed(2); // Return as a percentage
}

// Usage example
calculateNetworkCongestion(web3).then(congestion => {
    console.log(`Network Congestion: ${congestion}`);
}).catch(console.error);

