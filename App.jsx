import { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [account, setAccount] = useState(null);

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

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>My Web3 Platform</h1>
      <button onClick={connectWallet} style={{ padding: '1rem', fontSize: '16px' }}>
        {account ? 'Connected: ' + account.slice(0, 6) + '...' : 'Connect Wallet'}
      </button>
      {account && <p>Your Ethereum account: {account}</p>}
    </div>
  );
}

export default App;
