const Web3 = require("web3");
const web3 = new Web3(new Web3("wss://kovan.infura.io/ws"));

const SaiTub = require("../artifacts/SaiTub.json");
const AddressBook = require("../utils/AddressBook.json");

export const loadCDPs = async (address, block) => {
  const tub = new web3.eth.Contract(SaiTub.abi, AddressBook.kovan.saiTub);
  try {
    const events = await tub.getPastEvents("LogNewCup", {
      filter: { lad: address },
      fromBlock: block,
      toBlock: "latest"
    });
  } catch (err) {
    console.log("Error:", err.message);
  }
};
