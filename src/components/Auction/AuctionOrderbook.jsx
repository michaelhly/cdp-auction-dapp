import React, { useState, useEffect } from "react";
import Table from "../common/Table";
import { loadBidInfo } from "../../services/requestInfura";
import {
  getTokenSymbolByAddress,
  convertExpiryBlocks,
  trimHexString
} from "../../utils/helpers";

const AuctionOrderbook = props => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBook = async () => {
    const bids = await loadBidInfo(props.bidIds);
    setBook(bids);
  };

  useEffect(() => {
    fetchBook();
    setLoading(false);
  }, []);

  return (
    <div className="row">
      <div className="col p-0">
        <h3>Offers</h3>
        <Table headers={["Bidder", "Offer", "Expires in"]}>
          {book.map(bid => (
            <React.Fragment>
              <tr>
                <td>{trimHexString(bid.buyer, 36)}</td>
                <td>
                  {bid.value} {getTokenSymbolByAddress(bid.token)}
                </td>
                <td>{convertExpiryBlocks(bid.expiry)}</td>
              </tr>
            </React.Fragment>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default AuctionOrderbook;
