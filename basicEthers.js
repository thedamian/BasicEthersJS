import {ethers} from "ethers";
const InfraPersonalKey = "XXXXYYYYZZZZ"// get yours here: https://infura.io/register
const RcpProvider = "https://ropsten.infura.io/v3/"+InfraPersonalKey; 
const recipient = "0x79A4105C64548aABffB53d555F3441f0b2f3Dd03"; // You should change this, or else you're sending this to me.

(async() => {
    
    const connection = new ethers.providers.JsonRpcProvider(RcpProvider);
    const gasPrice = connection.getGasPrice();
    const wallet = ethers.Wallet.createRandom();
    console.log({wallet});;
    //const wallet = ethers.Wallet.fromMnemonic("Mnemonic from the wallet you created in the .createRandom() or from your own wallet");
    const signer = wallet.connect(connection);
    
    const tx= {
        from: wallet.address,
        to: recipient,
        value: ethers.utils.parseUnits("0.001","ether"),
        gasPrice: gasPrice,
        nonce: connection.getTransactionCount(wallet.address,"latest"),
        gasLimit: ethers.utils.hexlify(100_000)
    }
    console.log("balance",await connection.getBalance(wallet.address));
    console.log("your wallet:",wallet.mnemonic.phrase);
    console.log(" wallet.address", wallet.address);
    console.log("your wallet:",wallet.privateKey);
    console.log("tx",tx)
    const transaction = await signer.sendTransaction(tx);
    console.log(transaction);

})()