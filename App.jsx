import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

function App() {
  const [accounts, setAccounts] = useState([]) // iki hesab üçün array
  const [balances, setBalances] = useState([])

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accs = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setAccounts(accs.slice(0, 2)) // yalnız iki hesab götür
      } catch (err) {
        console.error('User denied account access', err)
      }
    } else {
      alert('Please install MetaMask!')
    }
  }

  const getBalances = async (accs) => {
    if (window.ethereum && accs.length > 0) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const bals = await Promise.all(accs.map(async (acc) => {
        const bal = await provider.getBalance(acc)
        return ethers.utils.formatEther(bal)
      }))
      setBalances(bals)
    }
  }

  useEffect(() => {
    if (accounts.length > 0) {
      getBalances(accounts)
    }
  }, [accounts])

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1>Qoşa Pul Kisəsi</h1>
      <button
        onClick={connectWallet}
        style={{ padding: '1rem', fontSize: '16px', cursor: 'pointer', marginBottom: '1rem' }}
      >
        {accounts.length > 0 ? 'Connected' : 'Connect Wallet'}
      </button>

      {accounts.length > 0 && accounts.map((acc, idx) => (
        <div key={acc} style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
          <p>Ethereum Account: {acc}</p>
          <p>Balance: {balances[idx] || 'Loading...'} ETH</p>
        </div>
      ))}
    </div>
  )
}

export default App
