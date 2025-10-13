import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function Wallet() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Install MetaMask!');
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!account) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    provider.getBalance(account).then((bal) => setBalance(ethers.formatEther(bal)));
  }, [account]);

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account.slice(0, 6)}...` : 'Connect Wallet'}
      </button>
      {balance && <p>Balance: {balance} ETH</p>}
    </div>
  );
}
