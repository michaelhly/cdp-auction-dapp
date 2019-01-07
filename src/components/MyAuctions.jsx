import React, { useState } from "react";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import { loadUserAuctions } from "../services/requestInfura";
import { auctionStatus } from "../utils/helpers";
import Table from "./common/Table";
import DisplayLoading from "./common/DisplayLoading";

const MyAuctions = props => {
  const web3 = useWeb3Context();
  const [myAuctions, setMyAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyAuction = async () => {
    try {
      var auctions = await loadUserAuctions(web3.account);
    } catch (err) {
      console.log(err.message);
    }
    setMyAuctions(auctions);
    setLoading(false);
  };

  const toggleTable = () => {
    if (loading) return <DisplayLoading size="large" />;

    return myAuctions.length === 0 ? (
      <div>You have no auctions.</div>
    ) : (
      <Table headers={["AuctionId", "Bids", "Status", "Action"]}>
        {myAuctions.map(auction => (
          <React.Fragment>
            <tr>
              <td>
                <button
                  type="button"
                  class="btn btn-link"
                  onClick={() =>
                    props.history.push({
                      pathname: `/${auction.id}`,
                      state: { auction: auction }
                    })
                  }
                >
                  {auction.id}
                </button>
              </td>
              <td>{auction.bids.length}</td>
              <td>{auctionStatus(auction.state)}</td>
              <td>
                <button type="button" class="btn btn-danger btn-sm">
                  Cancel
                </button>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </Table>
    );
  };

  useAccountEffect(() => {
    if (!loading) {
      setLoading(true);
    }
    fetchMyAuction();
  });

  return (
    <div>
      <h2 className="mb-4">My Auctions</h2>
      <div className="container">
        <div className="row">
          <div className="col-12" />
          {toggleTable()}
        </div>
      </div>
    </div>
  );
};

export default MyAuctions;
