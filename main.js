const ethers = require('ethers');
// const axios = require('axios');

// Fungsi untuk melakukan voting
async function vote(privateKey) {
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/taiko'); // RPC URL Taiko Mainnet
  const wallet = new ethers.Wallet(privateKey, provider);
  try {

    // Ganti dengan alamat kontrak dan ABI yang sesuai
    const contractAddress = '0x4D1E2145082d0AB0fDa4a973dC4887C7295e21aB'; // Alamat kontrak voting
    const contractABI = [
        { stateMutability: "payable", type: "fallback" },
        {
          inputs: [],
          name: "vote",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
    ]; // ABI kontrak voting

    const contract = new ethers.Contract(contractAddress, contractABI, wallet);
    const maxPriorityFeePerGas = ethers.utils.parseUnits('0.111', 'gwei')
    const maxFeePerGas = ethers.utils.parseUnits('0.25', 'gwei')
    const gasPrice = ethers.utils.parseUnits('0.2333', 'gwei')

    // Ganti dengan fungsi voting yang sesuai
    const tx = await contract.vote({
        value: "0",
        // maxPriorityFeePerGas: maxPriorityFeePerGas,
        // maxFeePerGas: maxFeePerGas,
        gasPrice: gasPrice,
        gasLimit: 23000,
    });
    console.log(`Wallet Address: ${wallet.address}`)
    console.log(`https://taikoscan.io/tx/${tx.hash}`)
    // await tx.wait();

    console.log(`BERHASIL MELAKUKAN VOTING RUBYSCORE TAIKO!`);
    console.log();
  } catch (error) {
    console.log();
    console.log(`Wallet Address: ${wallet.address}`)
    console.log(`TERJADI ERROR SAAT VOOTING!!!`);
    console.log();
    console.error(error);
  }
}

// Fungsi untuk menambahkan jeda
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Fungsi utama 
async function main() {
  const privateKeys = [
    "YOUR_PRIVATE_KEY"
  ];
  
  for (let i = 0; i < 75; i++) {
    console.log();
    console.log(`========== VOTING BATCH KE-${i + 1} ==========`);
    for (const privateKey of privateKeys) {
      await vote(privateKey);
      await delay(5000); // Jeda 5 detik antara setiap voting
    }
    await delay(5000); // Jeda 1 menit antara setiap iterasi
  }
}

main().catch(console.error);