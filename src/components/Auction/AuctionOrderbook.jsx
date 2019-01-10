import React, { useState, useEffect } from "react";
import Table from "../common/Table";
import { loadBidInfo } from "../../services/requestInfura";
import {
  getTokenSymbolByAddress,
  convertExpiryBlocks,
  trimHexString,
  round2Decimals
} from "../../utils/helpers";
import DisplayLoading from "../common/DisplayLoading";

const AuctionOrderbook = props => {
  const [book, setBook] = useState(null);

  const fetchBook = async () => {
    const bids = await loadBidInfo(props.bidIds);
    setBook(bids);
  };

  const handleRemoveBid = event => {
    const copy = [...book];
    const revokedBid = event.LogRevokedBid.returnValues;
    const index = copy.findIndex(bid => {
      return bid.id === revokedBid.bidId;
    });
    copy[index].revoked = true;
    setBook(copy);
  };

  const stageRevokeBid = bidId => {
    props.onModal("revokeBid", { id: bidId }, handleRemoveBid);
  };

  const toggleStatus = bid => {
    if (bid.revoked) return "Cancelled";
    if (bid.won) return "Winner";
    return convertExpiryBlocks(bid.expiry);
  };

  const toggleButtons = bid => {
    const account = props.account;
    if (
      account.toLowerCase() === bid.buyer.toLowerCase() &&
      !bid.revoked &&
      !bid.won
    ) {
      return convertExpiryBlocks(bid.expiry) === "Expired" ? (
        <button
          type="button"
          class="btn btn-outline-dark btn-sm"
          onClick={() => stageRevokeBid(bid.id)}
        >
          Retrieve Tokens
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => stageRevokeBid(bid.id)}
        >
          Cancel
        </button>
      );
    } else if (
      account.toLowerCase() === props.auctioneer.toLowerCase() &&
      !bid.revoked &&
      convertExpiryBlocks(bid.expiry) !== "Expired" &&
      props.auctionState === 1
    ) {
      return (
        <button type="button" className="btn btn-outline-primary btn-sm">
          Take Offer
        </button>
      );
    }
  };

  const toggleTableContent = () => {
    return book.length === 0 ? (
      <div>There are no offers for this auction.</div>
    ) : (
      <React.Fragment>
        <Table headers={["Bidder", "Offer", "Expiry/Status", "Action"]}>
          {book.map(bid => (
            <tr key={bid.id}>
              <td>{trimHexString(bid.buyer, 30)}</td>
              <td>
                {round2Decimals(bid.value)} {getTokenSymbolByAddress(bid.token)}
              </td>
              <td>{toggleStatus(bid)}</td>
              <td>{toggleButtons(bid)}</td>
            </tr>
          ))}
        </Table>
      </React.Fragment>
    );
  };

  useEffect(
    () => {
      fetchBook();
    },
    [props.bidIds]
  );

  return (
    <div className="row">
      <div className="col p-0">
        <h3>Offers</h3>
        {!book ? <DisplayLoading size="large" /> : toggleTableContent()}
      </div>
    </div>
  );
};

export default AuctionOrderbook;
