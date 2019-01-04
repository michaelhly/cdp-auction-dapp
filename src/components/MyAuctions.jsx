import React, { useState } from "react";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import { loadUserAuctions } from "../services/requestInfura";
import { Route, Link } from "react-router-dom";
import Auction from "./Auction/Auction";
import Table from "./common/Table";
import DisplayLoading from "./common/DisplayLoading";

const MyAuctions = props => {
  console.log(props);
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
      <div>You have no Auctions</div>
    ) : (
      <Table headers={["AuctionId", "Bids", "Status", "Action"]}>
        {myAuctions.map(auction => (
          <React.Fragment>
            <tr>
              <td>
                <Link
                  className="to auction"
                  to={{
                    pathname: `/${auction.id}`
                  }}
                >
                  {auction.id}
                </Link>
              </td>
              <td>{auction.bids.length}</td>
              <td>{auction.state}</td>
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
      {myAuctions.map(auction => (
        <Route
          key={auction.id}
          path={`/${auction.id}`}
          render={() => (
            <Auction
              auctions={myAuctions}
              onModal={props.onModal}
              onUpdate={props.onUpdate}
            />
          )}
        />
      ))}
      <div className="container">
        <div className="row">
          <div className="col" />
          {toggleTable()}
        </div>
      </div>
    </div>
  );
};

export default MyAuctions;
