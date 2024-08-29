const { Web3 } = require("web3");

require("dotenv").config();
const key = process.env.INFURA_API_KEY;
// const web3 = new Web3(`https://mainnet.infura.io/v3/${key}`);
const web3 = new Web3(`https://rpc.eth.testnet.creatachain.com/`);

const ethereumModesOfTransaction = async () => {
    const sugguestedPriority = [1, 1.5, 2];
    const arbitraryConstant = [1, 1.35, 1.7];
    return await web3.eth.getBlock("pending").then(async (block) => {
        const baseFeePerGas = +web3.utils.fromWei(block.baseFeePerGas, "gwei");

        const slow = sugguestedPriority[0] + baseFeePerGas * arbitraryConstant[0];
        const average =
            sugguestedPriority[1] + baseFeePerGas * arbitraryConstant[1];
        const fast = sugguestedPriority[2] + baseFeePerGas * arbitraryConstant[2];
        const EstimatedBaseFeePerGas = baseFeePerGas;

        return {
            low: {
                suggestedMaxPriorityFeePerGas: sugguestedPriority[0],
                suggestedMaxFeePerGas: slow,
                minWaitTimeEstimate: 15000,
                maxWaitTimeEstimate: 60000,
            },
            medium: {
                suggestedMaxPriorityFeePerGas: sugguestedPriority[1],
                suggestedMaxFeePerGas: average,
                minWaitTimeEstimate: 15000,
                maxWaitTimeEstimate: 45000,
            },
            high: {
                suggestedMaxPriorityFeePerGas: sugguestedPriority[2],
                suggestedMaxFeePerGas: fast,
                minWaitTimeEstimate: 15000,
                maxWaitTimeEstimate: 30000,
            },
            estimatedBaseFee: EstimatedBaseFeePerGas,
            networkCongestion: 0.96,
        };
    });
};

// ethereumModesOfTransaction().then((res)=>console.table(res))

// Function to calculate network congestion
async function calculateNetworkCongestion(numBlocks = 29) {
    const feeHistory = await web3.eth.getFeeHistory(numBlocks, 'latest', [100]);
    const historicalBaseFee = feeHistory.baseFeePerGas;
    // console.log(historicalBaseFee);
    let latestBaseFee = historicalBaseFee.at(numBlocks - 1);
    latestBaseFee = +web3.utils.fromWei(latestBaseFee, 'gwei');
    let maxBigInt = historicalBaseFee[0];
    let minBigInt = historicalBaseFee[0];

    for (const num of historicalBaseFee) {
        if (num > maxBigInt) maxBigInt = num;
        if (num < minBigInt) minBigInt = num;
    }

    const maxHistoricalBaseFee = +web3.utils.fromWei(maxBigInt, 'gwei');
    const minHistoricalBaseFee = +web3.utils.fromWei(minBigInt, 'gwei');

    const congestion =
        (latestBaseFee - minHistoricalBaseFee) /
        (maxHistoricalBaseFee - minHistoricalBaseFee);

    console.log(latestBaseFee);

    return congestion.toFixed(2);
}

// Usage example
calculateNetworkCongestion()
    .then((congestion) => {
        console.log(`My Network Congestion: ${congestion}`);
        fetch("https://gas.api.infura.io/v3/71583074c5c34727b3ec122ec0bea1e0/networks/11155111/suggestedGasFees")
            .then((result) => result.json())
            .then((result) => {
                console.log(+result.estimatedBaseFee);
                console.log(`Infura Network Congestion: ${result.networkCongestion}`);
            });
    })
    .catch(console.error);




 