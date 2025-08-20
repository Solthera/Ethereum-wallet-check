import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.15.0/ethers.min.js";
import './style.css'
// import detectAddressInput  from "./detect-address-input.js"
const connectBtn = document.getElementById("connectWallet");
const addressDisplay = document.getElementById("addressWallet");
const inputAddr = document.getElementById("addressInput");
const getBalanceBtn = document.getElementById("getBalance");
const getAccAddress = document.getElementById("accAddress");
const getAccBalance = document.getElementById("accBalance");
const getconnectedWallet = document.getElementById("connectedWallet");
const getAccNetwork = document.getElementById("accNetwork");
 
const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/dadcaf94e1e44df4b628d187ab090c70')



// Wallet connection & address input
connectBtn.onclick = async () => {
    
    if (window.ethereum) { 
        const provider = new ethers.BrowserProvider(window.ethereum)
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        connectBtn.remove()
        getconnectedWallet.innerHTML = `Connedted`;
        getAccNetwork.innerHTML = `Ethereum Mainnet`;
        addressDisplay.innerHTML = "Connected to wallet";
        console.log(`Connected to wallet: ${address}`);
        getAccAddress.innerHTML = `Address: ${address}`;
        getAccBalance.innerHTML = `Balance: ${ethers.formatEther(await provider.getBalance(address))} ETH`;
    } else {
        alert("Wallet not found.")
        getconnectedWallet.innerHTML = "Please install wallet extension.";
        connectBtn.remove()
    }
}

// const detectNetwork = async () => {
//   const network = await detectAddressInput();

//   console.log(`Detected network: ${network.network.join(', ')}`);
  
//   document.getElementById("accNetwork").innerHTML = `Network: ${network.network.join(', ')}`;
// }
 
// Get balance of input address
getBalanceBtn.onclick = async () => {
    const addresses = inputAddr.value.trim();
    
    if (!addresses) {
        alert("Please enter an address.");
        return;
    }
    
    if (!ethers.isAddress(addresses)) {
        alert("Invalid address format. Please check the address and try again.");
        return;
    }
    
  try {
      console.log(`Fetching balance for address: ${addresses}`);
      const balance = await provider.getBalance(addresses);
      getAccAddress.innerHTML = `Address: ${addresses}`;
      getAccBalance.innerHTML = `Balance: ${ethers.formatEther(balance)} ETH`;
      getAccNetwork.innerHTML = `Ethereum Mainnet`;
  } catch (err) {
      console.error("Error fetching balance:", err);
      alert("Failed to fetch balance. Please try again.");
  }
}

