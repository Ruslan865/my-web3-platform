import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  // MetaMask-ə qoşulma funksiyası
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (err) {
        console.error("User rejected the request:", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Balansı alma funksiyası
  const getBalance = async (accountAddress) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(accountAddress);
      setBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      console.error(err);
    }
  };

  // Hesab dəyişəndə balansı yenilə
  useEffect(() => {
    if (account) {
      getBalance(account);
    }
  }, [account]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>My Web3 Platform</h1>

      <button
        onClick={connectWallet}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        {account ? account.substring(0, 6) + "..." : "Connect Wallet"}
      </button>

      {account && (
        <div style={{ marginTop: "1rem" }}>
          <p>
            <strong>Account:</strong> {account}
          </p>
          <p>
            <strong>Balance:</strong> {balance ? balance + " ETH" : "Loading..."}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
