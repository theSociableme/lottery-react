import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const ethEnabled = () => {
  if (window.ethereum) {
    window.ethereum.enable();
    return true;
  }
  return false;
}

if (!ethEnabled()) {
  alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");
}

export default web3;
