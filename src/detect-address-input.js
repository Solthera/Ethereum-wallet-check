import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.15.0/ethers.min.js";

export default async function detectAddressInput() { 
    const address = document.getElementById("addressInput").value.trim();
    
    if (ethers.isAddress(address)) {
        return {
            isValid: true,
            format: 'Ethereum-compatible',
            network: [
                "Ethereum",
                "Binance Smart Chain",
                "Polygon",
                "Avalanche",
                "Fantom",
                "Arbitrum",
                "Optimism"
            ]
        }
    }
    return {
        isValid: false,
        format: 'Invalid address',
        network: []
    }
}