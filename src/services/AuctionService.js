const Web3 = require("web3");
const web3 = new Web3(new Web3("wss://kovan.infura.io/ws"));

const Auction = require("../artifacts/Auction.json");
const AddressBook = require("../utils/addressBook.json");
const Maker = require("@makerdao/dai");

export const loadAuctions = async () => {
  const maker = Maker.create("browser");
  await maker.authenticate();
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
      var cdp = await maker.getCdp(web3.utils.hexToNumber(auction.cdp));
    } catch (err) {
      console.log("Error:", err.message);
    }
    if (cdp) {
      try {
        var debt = await cdp.getDebtValue(Maker.USD);
        var fee = await cdp.getGovernanceFee(Maker.USD);
        var liquidation = await cdp.getLiquidationPrice();
        var collateral = await cdp.getCollateralValue(Maker.PETH);
      } catch (err) {
        console.log("Error:", err.message);
      }
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
      cdpDebt: debt,
      cdpFee: fee,
      cdpLiquidation: liquidation,
      cdpCollateral: collateral
    };

    auctions.push(auctionEntry);
  }
  return auctions;
};
