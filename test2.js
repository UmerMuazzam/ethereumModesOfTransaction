const axios = require("axios");
require("dotenv").config();

const Auth = Buffer.from(
    process.env.INFURA_API_KEY + ":" + process.env.INFURA_API_KEY_SECRET,
).toString("base64");

const chainId = 1; // Ethereum Mainnet

(async () => {
    try {
        const { data } = await axios.get(
            `https://gas.api.infura.io/networks/${chainId}/suggestedGasFees`,
            {
                headers: { Authorization: `Basic ${Auth}` },
            },
        );
        console.log("Suggested gas fees:", data);
    } catch (error) {
        console.log("Server responded with:", error);

    }
})();














// Function to calculate the suggested max fee per gas
// async function calculateSuggestedMaxFeePerGas(web3, maxPriorityFeePerGasInGwei) {
//     const latestBlock = await web3.eth.getBlock('latest');
    
//     const baseFeePerGas = web3.utils.fromWei(latestBlock.baseFeePerGas, 'gwei');
//     console.log("base fee per gas", baseFeePerGas)
//     const suggestedMaxFeePerGas = parseFloat(baseFeePerGas) + parseFloat(maxPriorityFeePerGasInGwei); 
//     return suggestedMaxFeePerGas.toFixed(9); // Return as Gwei, rounded to two decimal places
// }
// // Usage example
// const maxPriorityFeePerGasInGwei = '2'; // Assume you have calculated or estimated this value
// calculateSuggestedMaxFeePerGas(web3, maxPriorityFeePerGasInGwei).then(suggestedMaxFeePerGas => {
//     console.log(`Suggested Max Fee Per Gas: ${suggestedMaxFeePerGas} Gwei`);
// }).catch(console.error);

