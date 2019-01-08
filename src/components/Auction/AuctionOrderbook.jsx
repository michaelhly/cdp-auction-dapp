import React, { useState, useEffect } from "react";
import Table from "../common/Table";
import { loadBidInfo } from "../../services/requestInfura";
import {
  getTokenSymbolByAddress,
  convertExpiryBlocks,
  trimHexString
} from "../../utils/helpers";
import DisplayLoading from "../common/DisplayLoading";

const AuctionOrderbook = props => {
  const [book, setBook] = useState(null);

  const fetchBook = async () => {
    const bids = await loadBidInfo(props.bidIds);
    setBook(bids);
  };

  const toggleTableContent = () => {
    return book.length === 0 ? (
      <div>Currently there are no offers for this auction.</div>
    ) : (
      <React.Fragment>
        <Table headers={["Bidder", "Offer", "Expires in"]}>
          {book.map(bid => (
            <tr>
              <td>{trimHexString(bid.buyer, 36)}</td>
              <td>
                {bid.value} {getTokenSymbolByAddress(bid.token)}
              </td>
              <td>{convertExpiryBlocks(bid.expiry)}</td>
            </tr>
          ))}
        </Table>
      </React.Fragment>
    );
  };

  useEffect(() => {
    fetchBook();
  }, []);

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
