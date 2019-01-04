import React, { useState } from "react";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import { loadUserAuctions } from "../services/requestInfura";
import { Route, Link } from "react-router-dom";
import Auction from "./Auction/Auction";

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

  useAccountEffect(() => {
    if (!loading) {
      setLoading(true);
    }
    fetchMyAuction();
  });
  return (
    <div>
      <h2>My Auctions</h2>
      <div className="container">
        <div className="row">
          <div className="col">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAuctions;
