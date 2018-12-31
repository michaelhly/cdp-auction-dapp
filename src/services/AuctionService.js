import { fetchCdpData } from "./MkrService";

const Web3 = require("web3");
const web3 = new Web3(new Web3("wss://kovan.infura.io/ws"));

const Auction = require("../artifacts/Auction.json");
const AddressBook = require("../common/addressBook.json");

export const loadAuctions = async () => {
  const auctionInstance = new web3.eth.Contract(
    Auction.abi,
    AddressBook.kovan.auction
  );

  var totalListings = 0;
  var currentBlock = 0;
  try {
    totalListings = await auctionInstance.methods.totalListings().call();
    currentBlock = await web3.eth.getBlockNumber();
  } catch (err) {
    console.log("Error:", err.message);
  }

  var auctions = [];
  var stopIndex = totalListings - 100 > 0 ? totalListings - 100 : 0;

  for (let i = totalListings; i > stopIndex; i--) {
    try {
      var auction = await auctionInstance.methods
        .getAuctionInfoByIndex(i)
        .call();
    } catch (err) {
      console.log("Error:", err.message);
    }

    try {
      var cdp = await fetchCdpData(web3.utils.hexToNumber(auction.cdp));
      console.log(cdp);
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
      ask: auction.ask,
      expiry: parseInt(auction.expiry) - parseInt(currentBlock),
      state: auction.state,
      bids: bids,
      cdpDebt: cdp.debt,
      cdpFee: cdp.fee,
      cdpLiquidation: cdp.liquidation,
      cdpCollateral: cdp.collateral
    };

    auctions.push(auctionEntry);
  }
  return auctions;
};

export const loadBids = async auctionId => {
  const auctionInstance = new web3.eth.Contract(
    Auction.abi,
    AddressBook.kovan.auction
  );

  try {
    return await auctionInstance.methods.getBids(auctionId).call();
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

const random = max => Math.floor(Math.random() * (max + 1));

const tokens = [
  "0xc778417e063141139fce010982780140aa0cd5ab",
  "0x4e17c87c52d0e9a0cad3fbc53b77d9514f003807",
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
    }),
    cdpDebt: random(300),
    cdpFee: random(5),
    cdpLiquidation: random(100),
    cdpCollateral: random(10)
  };
};

export const loadDummyAuctions = number => {
  return [...Array(number)].map(element => genFakeAuctions());
};
