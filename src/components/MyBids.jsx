import React, { useState } from "react";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import { loadUserBids, getAuction } from "../services/requestInfura";
import DisplayLoading from "./common/DisplayLoading";
import Table from "./common/Table";
import {
  getTokenSymbolByAddress,
  convertExpiryBlocks,
  trimHexString
} from "../utils/helpers";

const MyBids = props => {
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

  const linkToAuction = async bid => {
    const copy = [...myBids];
    const index = myBids.indexOf(bid);
    copy[index] = { ...bid };
    copy[index].loading = true;
    setMyBids(copy);

    try {
      var auction = await getAuction(bid.auctionId);
    } catch (err) {
      console.log(err);
      copy[index].loading = false;
      setMyBids(copy);
    }
    props.history.push({
      pathname: `/${bid.auctionId}`,
      state: { auction: auction }
    });
    copy[index].loading = false;
    setMyBids(copy);
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
            <td style={{ width: "30%" }}>
              {bid.loading ? (
                <div className="d-flex mr-3 w-100">
                  <DisplayLoading />
                </div>
              ) : (
                <button
                  type="button"
                  class="btn btn-link p-0"
                  style={{ verticalAlign: "top" }}
                  onClick={() => linkToAuction(bid)}
                >
                  {trimHexString(bid.auctionId, 20)}
                </button>
              )}
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
