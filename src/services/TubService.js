const Web3 = require("web3");
const web3 = new Web3(new Web3("wss://kovan.infura.io/ws"));

const SaiTub = require("../artifacts/SaiTub.json");
const AddressBook = require("../utils/addressBook.json");

export const loadUserCdps = async (user, proxy, block) => {
  const tub = new web3.eth.Contract(SaiTub.abi, AddressBook.kovan.saiTub);
  try {
    const events = await tub.getPastEvents("LogNewCup", {
      filter: { lad: [user, proxy] },
      fromBlock: block,
      toBlock: "latest"
    });

    var cdps = [];
    for (let i = events.length - 1; i >= 0; i--) {
      var cup = events[i].returnValues.cup;
      var ink = await tub.methods.ink(cup).call();
      var lad = await tub.methods.lad(cup).call();
      if (ink > 0 && lad === proxy) {
        cdps.push({ cup: cup, id: web3.utils.hexToNumber(cup) });
      }
    }
  } catch (err) {
    console.log("Error:", err.message);
  }
  return cdps;
};
