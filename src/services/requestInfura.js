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

export const loadCdps = async (user, proxy, block = 0) => {
  const tubInstance = await getTubInstance();
  const seen = {};
  const cdps = [];

  try {
    const events = await tubInstance.getPastEvents("LogNewCup", {
      filter: { lad: [user, proxy] },
      fromBlock: block,
      toBlock: "latest"
    });

    for (let i = events.length - 1; i >= 0; i--) {
      const cup = events[i].returnValues.cup;
      const ink = await tubInstance.methods.ink(cup).call();
      const lad = await tubInstance.methods.lad(cup).call();
      if (ink > 0 && lad === proxy) {
        seen[cup] = true;
        cdps.push({ cup: cup, id: web3.utils.hexToNumber(cup) });
      }
    }
  } catch (err) {
    console.log(err);
  }

  try {
    const auctionInstance = await getAuctionInstance();
    const events = await auctionInstance.getPastEvents("LogCDPTransfer", {
      filter: { to: proxy },
      fromBlock: block,
      toBlock: "latest"
    });

    for (let i = events.length - 1; i >= 0; i--) {
      const cup = events[i].returnValues.cdp;
      const ink = await tubInstance.methods.ink(cup).call();
      const lad = await tubInstance.methods.lad(cup).call();
      if (ink > 0 && lad === proxy && !seen[cup]) {
        seen[cup] = true;
        cdps.push({ cup: cup, id: web3.utils.hexToNumber(cup) });
      }
    }
  } catch (err) {
    console.log(err);
  }

  return cdps;
};

export const loadAuctions = async (limit = false) => {
  const auctionInstance = await getAuctionInstance();

  try {
    var totalListings = await auctionInstance.methods.totalListings().call();
    var currentBlock = await web3.eth.getBlockNumber();
  } catch (err) {
    console.log(err);
  }

  const auctions = [];
  const count = totalListings - limit < 0 || !limit ? totalListings : limit;

  for (let i = totalListings; i > totalListings - count; i--) {
    try {
      var auction = await auctionInstance.methods
        .getAuctionInfoByIndex(i)
        .call();
    } catch (err) {
      console.log(err);
    }
    if (parseInt(auction.state) < 2) {
      try {
        var bids = await auctionInstance.methods.getBids(auction.id).call();
      } catch (err) {
        console.log(err);
      }

      const auctionEntry = {
        id: auction.id,
        cdpId: web3.utils.hexToNumber(auction.cdp),
        seller: auction.seller,
        proxy: auction.proxy,
        token: auction.token,
        ask: web3.utils.fromWei(auction.ask, "ether"),
        expiry: parseInt(auction.expiry) - parseInt(currentBlock),
        state: parseInt(auction.state),
        bids: bids
      };

      auctions.push(auctionEntry);
    }
  }
  return auctions;
};

export const loadBidInfo = async bidIds => {
  const auctionInstance = await getAuctionInstance();
  const currentBlock = await web3.eth.getBlockNumber();
  const bids = [];
  for (let i = bidIds.length - 1; i >= 0; i--) {
    try {
      let bid = await auctionInstance.methods.getBidInfo(bidIds[i]).call();
      bids.push({
        id: bidIds[i],
        auctionId: bid.auctionId,
        buyer: bid.buyer,
        cdpId: web3.utils.hexToNumber(bid.cdp),
        expiry: parseInt(bid.expiry) - parseInt(currentBlock),
        proxy: bid.proxy,
        token: bid.token,
        value: web3.utils.fromWei(bid.value, "ether"),
        revoked: Boolean(bid.revoked),
        won: Boolean(bid.won),
        loading: false
      });
    } catch (err) {
      console.log(err);
    }
  }
  return bids;
};

export const getAuction = async auctionId => {
  const auctionInstance = await getAuctionInstance();

  try {
    var bids = await auctionInstance.methods.getBids(auctionId).call();
    var currentBlock = await web3.eth.getBlockNumber();
  } catch (err) {
    console.log(err);
  }

  try {
    var auction = await auctionInstance.methods
      .getAuctionInfo(auctionId)
      .call();
  } catch (err) {
    console.log(err);
  }

  return {
    id: auctionId,
    cdpId: web3.utils.hexToNumber(auction.cdp),
    seller: auction.seller,
    proxy: auction.proxy,
    token: auction.token,
    ask: web3.utils.fromWei(auction.ask, "ether"),
    expiry: parseInt(auction.expiry) - parseInt(currentBlock),
    state: parseInt(auction.state),
    bids: bids
  };
};

export const loadUserAuctions = async account => {
  const auctionInstance = await getAuctionInstance();

  try {
    var auctionIds = await auctionInstance.methods
      .getAuctionsByUser(account)
      .call();
  } catch (err) {
    console.log(err);
  }

  const auctions = [];
  for (let i = 0; i < auctionIds.length; i++) {
    try {
      const auction = await getAuction(auctionIds[i]);
      auctions.push(auction);
    } catch (err) {
      console.log(err);
    }
  }
  return auctions;
};

export const loadUserBids = async account => {
  const auctionInstance = await getAuctionInstance();

  try {
    const bidIds = await auctionInstance.methods.getBidsByUser(account).call();
    var bids = await loadBidInfo(bidIds);
  } catch (err) {
    console.log(err);
  }
  return bids;
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
