const Web3 = require("web3");
const web3 = new Web3(new Web3("wss://kovan.infura.io/ws"));

const SaiTub = require("../artifacts/SaiTub.json");
const Auction = require("../artifacts/Auction.json");
const AddressBook = require("../utils/addressBook.json");

const getTubInstance = async () => {
  return new web3.eth.Contract(SaiTub.abi, AddressBook.kovan.saiTub);
};

const getAuctionInstance = async () => {
  return new web3.eth.Contract(Auction.abi, AddressBook.kovan.auction);
};

export const loadCdps = async (user, proxy, block) => {
  const tubInstance = await getTubInstance();

  try {
    const events = await tubInstance.getPastEvents("LogNewCup", {
      filter: { lad: [user, proxy] },
      fromBlock: block,
      toBlock: "latest"
    });

    var cdps = [];
    for (let i = events.length - 1; i >= 0; i--) {
      var cup = events[i].returnValues.cup;
      var ink = await tubInstance.methods.ink(cup).call();
      var lad = await tubInstance.methods.lad(cup).call();
      if (ink > 0 && lad === proxy) {
        cdps.push({ cup: cup, id: web3.utils.hexToNumber(cup) });
      }
    }
  } catch (err) {
    console.log("Error:", err.message);
  }
  return cdps;
};

export const loadAuctions = async limit => {
  const auctionInstance = await getAuctionInstance();

  var totalListings = 0;
  var currentBlock = 0;
  try {
    totalListings = await auctionInstance.methods.totalListings().call();
    currentBlock = await web3.eth.getBlockNumber();
  } catch (err) {
    console.log("Error:", err.message);
  }

  var auctions = [];
  var count = totalListings - limit < 0 ? totalListings : limit;

  for (let i = totalListings; i > totalListings - count; i--) {
    console.log(i);
    try {
      var auction = await auctionInstance.methods
        .getAuctionInfoByIndex(i)
        .call();
    } catch (err) {
      console.log("Error:", err.message);
    }

    try {
      var bids = await auctionInstance.methods.getBids(auction.id).call();
    } catch (err) {
      console.log("Error:", err.message);
    }

    var auctionEntry = {
      id: auction.id,
      cdpId: web3.utils.hexToNumber(auction.cdp),
      seller: auction.seller,
      token: auction.token,
      ask: web3.utils.fromWei(auction.ask, "ether"),
      expiry: parseInt(auction.expiry) - parseInt(currentBlock),
      state: auction.state,
      bids: bids
    };

    auctions.push(auctionEntry);
  }
  return auctions;
};

export const loadBids = async auctionId => {
  const auctionInstance = await getAuctionInstance();

  try {
    return await auctionInstance.methods.getBids(auctionId).call();
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

const random = max => Math.floor(Math.random() * (max + 1));

const tokens = [
  "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
  "0xC4375B7De8af5a38a93548eb8453a498222C4fF2",
  "0xb06d72a24df50d4e2cac133b320c5e7de3ef94cb"
];

const genFakeAuctions = () => {
  return {
    id: web3.utils.padLeft(web3.utils.numberToHex(random(10000000)), 40),
    cdpId: random(10000),
    seller: web3.utils.padLeft(web3.utils.numberToHex(random(10000000)), 40),
    token: tokens[random(2)],
    ask: random(100),
    expiry: random(5760 * 7),
    state: random(1),
    bids: [...Array(random(10))].map(element => {
      return web3.utils.padLeft(web3.utils.numberToHex(random(10000000), 40));
    })
  };
};

export const loadDummyAuctions = number => {
  return [...Array(number)].map(element => genFakeAuctions());
};
