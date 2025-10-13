import { ethers } from 'ethers';

export const getProvider = () => new ethers.BrowserProvider(window.ethereum);

export const getBalance = async (account) => {
  const provider = getProvider();
  const balance = await provider.getBalance(account);
  return ethers.formatEther(balance);
};
