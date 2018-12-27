const Web3 = require("web3");
const web3 = new Web3(new Web3("wss://kovan.infura.io/ws"));

const Auction = require("../artifacts/Auction.json");
const AddressBook = require("../utils/addressBook.json");

export const loadAuctions = async () => {
  const auctionInstance = new web3.eth.Contract(
    Auction.abi,
    AddressBook.kovan.auction
  );

  var totalListings = 0;
  try {
    totalListings = await auctionInstance.methods.totalListings().call();
  } catch (err) {
    console.log("Error:", err.message);
  }

  var auctions = [];
  var stopIndex = totalListings - 100 > 0 ? totalListings - 100 : 0;

  for (let i = totalListings; i >= stopIndex; i--) {
    try {
      var auction = await auctionInstance.methods
        .getAuctionInfoByIndex(i)
        .call();
    } catch (err) {
      console.log("Error:", err.message);
    }

    var auctionEntry = {
      id: auction.id,
      cdp: web3.utils.hexToNumber(auction.cdp),
      seller: auction.seller,
      token: auction.token,
      ask: auction.ask,
      expiry: auction.expiry,
      state: auction.state
    };

    auctions.push(auctionEntry);
  }
  return auctions;
};
