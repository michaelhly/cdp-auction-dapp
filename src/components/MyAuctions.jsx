import React, { useState } from "react";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import { loadUserAuctions } from "../services/requestInfura";
import { auctionStatus } from "../utils/helpers";
import Table from "./common/Table";
import DisplayLoading from "./common/DisplayLoading";

const MyAuctions = props => {
  const web3 = useWeb3Context();
  const [myAuctions, setMyAuctions] = useState(null);

  const fetchMyAuction = async () => {
    try {
      var auctions = await loadUserAuctions(web3.account);
    } catch (err) {
      console.log(err);
    }
    setMyAuctions(auctions);
  };

  const handleCancel = event => {
    const updates = event.LogEndedAuction.returnValues;
    const copy = [...myAuctions];
    const index = copy.findIndex(auction => {
      return auction.id === updates.auctionId;
    });
    copy[index].state = parseInt(updates.state);
    setMyAuctions(copy);

    const cdp = {
      cup: updates.cdp,
      id: web3.web3js.utils.hexToNumber(updates.cdp)
    };
    props.onCancel(updates.auctionId, cdp);
  };

  const stageCancel = auctionId => {
    props.onModal("cancelAuction", { id: auctionId }, handleCancel);
  };

  const toggleTable = () => {
    if (!myAuctions) return <DisplayLoading size="large" />;

    return myAuctions.length === 0 ? (
      <div>You have no auctions.</div>
    ) : (
      <Table headers={["AuctionId", "Bids", "Status", "Action"]}>
        {myAuctions.map(auction => (
          <React.Fragment>
            <tr key={auction.id}>
              <td>
                <button
                  type="button"
                  className="btn btn-link"
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
              <td>{auctionStatus(auction.state, auction.expiry)}</td>
              <td>
                {auction.state === 0 ? (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => stageCancel(auction.id)}
                  >
                    Cancel
                  </button>
                ) : null}
              </td>
            </tr>
          </React.Fragment>
        ))}
      </Table>
    );
  };

  useAccountEffect(() => {
    if (myAuctions) {
      setMyAuctions(null);
    }
    fetchMyAuction();
  });

  return (
    <div>
      <h2 className="mb-3">My Auctions</h2>
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
