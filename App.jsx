import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  // MetaMask-ə qoşulma
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (err) {
        console.error('User denied account access', err);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  // Balansı alma
  const getBalance = async (account) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const bal = await provider.getBalance(account);
      setBalance(ethers.utils.formatEther(bal));
    }
  };

  useEffect(() => {
    if (account) {
      getBalance(account);
    }
  }, [account]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>My Web3 Platform</h1>
      <button onClick={connectWallet} style={{ padding: '1rem', fontSize: '16px' }}>
        {account ? 'Connected: ' + account.slice(0, 6) + '...' : 'Connect Wallet'}
      </button>
      {account && (
        <div style={{ marginTop: '1rem' }}>
          <p>Ethereum Account: {account}</p>
          <p>Balance: {balance} ETH</p>
        </div>
      )}
    </div>
  );
}

export default App;
