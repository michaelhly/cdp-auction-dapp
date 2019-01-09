import React, { useState } from "react";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import { loadUserBids } from "../services/requestInfura";
import DisplayLoading from "./common/DisplayLoading";
import Table from "./common/Table";
import {
  getTokenSymbolByAddress,
  convertExpiryBlocks,
  trimHexString
} from "../utils/helpers";

const MyBids = () => {
  const web3 = useWeb3Context();
  const [myBids, setMyBids] = useState(null);

  const fetchMyBids = async () => {
    try {
      var bids = await loadUserBids(web3.account);
      console.log(bids);
    } catch (err) {
      console.log(err);
    }
    setMyBids(bids);
  };

  const toggleTable = () => {
    if (!myBids) return <DisplayLoading size="large" />;
    console.log(myBids);
    return myBids.length === 0 ? (
      <div>You have not submitted any bid orders.</div>
    ) : (
      <Table headers={["BidId", "AuctionId", "Offer", "Expire in", "Action"]}>
        {myBids.map(bid => (
          <tr key={bid.id}>
            <td>{trimHexString(bid.id, 20)}</td>
            <td>
              <button type="button" class="btn btn-link">
                {trimHexString(bid.auctionId, 20)}
              </button>
            </td>
            <td>
              {bid.value} {getTokenSymbolByAddress(bid.token)}
            </td>
            <td>{convertExpiryBlocks(bid.expiry)}</td>
            <td>
              <button type="button" class="btn btn-danger btn-sm">
                Cancel
              </button>
            </td>
          </tr>
        ))}
      </Table>
    );
  };

  useAccountEffect(() => {
    if (myBids) {
      setMyBids(null);
    }
    fetchMyBids();
  });

  return (
    <div>
      <h2 className="mb-4">My Bids</h2>
      <div className="container">
        <div className="row">
          <div className="col-12" />
          {toggleTable()}
        </div>
      </div>
    </div>
  );
};

export default MyBids;
