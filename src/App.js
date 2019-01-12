import React, { useState, useEffect } from "react";
import { useAccountEffect } from "web3-react/hooks";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import MyBids from "./components/MyBids";
import MyAuctions from "./components/MyAuctions";
import Home from "./components/Home/Homepage";
import Auction from "./components/Auction/Auction";
import TokenFaucet from "./components/TokenFaucet";
import ConfirmationModal from "./components/Modal/Modal";
import { loadCdps, loadAuctions, getAuction } from "./services/requestInfura";
import FAQ from "./components/FAQ";

const Maker = require("@makerdao/dai");

const App = () => {
  const maker = Maker.create("browser");
  const [proxy, setProxy] = useState("pending");
  const [cdps, setCdps] = useState(null);
  const [auctions, setAuctions] = useState(null);
  const [modalProps, setModalProps] = useState({
    show: false,
    method: "",
    params: {},
    callback: null
  });

  const fetchAuctionData = async count => {
    if (auctions) {
      setAuctions(null);
    }
    try {
      const auctions = await loadAuctions(count);
      setAuctions(auctions);
    } catch (err) {
      setAuctions([]);
      console.log(err);
    }
  };

  const fetchCdps = async () => {
    setProxy("pending");

    try {
      await maker.authenticate();
    } catch (err) {
      console.log(err);
      setProxy(null);
    }

    if (cdps) {
      setCdps(null);
    }
    setProxy(maker.service("proxy").currentProxy());
    if (maker.service("proxy").currentProxy()) {
      var user = maker.currentAccount().address;
      try {
        var result = await loadCdps(
          user,
          maker.service("proxy").currentProxy()
        );
        setCdps(result);
      } catch (err) {
        console.log(err);
        setCdps([]);
      }
    } else {
      setCdps([]);
    }
  };

  const handleNewListing = async events => {
    const copy = auctions.slice();
    setAuctions(null);
    const id = events[1].raw.topics[3];

    try {
      var newAuction = await getAuction(id);
      setAuctions([newAuction, ...copy]);
    } catch (err) {
      setAuctions(copy);
      console.log(err);
    }

    const cdpId = newAuction.cdpId;
    const updatedCdps = cdps.filter(cdp => cdp.id !== cdpId);
    setCdps(updatedCdps);
  };

  const handleSaleTransfer = auctionId => {
    removeAuction(auctionId);
    fetchCdps();
  };

  const handleListingRemoval = (auctionId, cdp) => {
    removeAuction(auctionId);
    addCDP(cdp);
  };

  const removeAuction = auctionId => {
    const newAuctions = auctions.filter(auction => auction.id !== auctionId);
    setAuctions(newAuctions);
  };

  const addCDP = cdp => {
    const newCdps = [cdp, ...cdps];
    setCdps(newCdps);
  };

  const updateAuction = updatedAuction => {
    const copy = auctions.slice();
    const index = copy.findIndex(auction => {
      return auction.id === updateAuction.id;
    });
    copy[index] = updatedAuction;
    setAuctions(copy);
  };

  const triggerModal = (method, params, callback) => {
    const copy = { ...modalProps };
    copy.show = true;
    copy.method = method;
    copy.params = params;
    copy.callback = !callback ? handleNewListing : callback;
    setModalProps(copy);
  };

  const closeModal = () => {
    const copy = { ...modalProps };
    copy.show = false;
    copy.method = "false";
    copy.params = [];
    copy.callback = null;
    setModalProps(copy);
  };

  useEffect(() => {
    fetchAuctionData();
  }, []);

  useAccountEffect(() => {
    fetchCdps();
  });

  return (
    <React.Fragment>
      <Navbar />
      <ConfirmationModal
        maker={maker}
        proxy={proxy}
        modal={modalProps}
        onClose={closeModal}
        onSetProxy={setProxy}
      />
      <main className="container">
        <Switch>
          <Route path="/faucet" component={TokenFaucet} />
          <Route path="/faq" component={FAQ} />
          <Route
            exact
            path="/myauctions"
            render={props => (
              <MyAuctions
                onModal={triggerModal}
                onCancel={handleListingRemoval}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/mybids"
            render={props => <MyBids onModal={triggerModal} {...props} />}
          />
          <Route
            path="/:id"
            render={props => (
              <Auction
                onModal={triggerModal}
                onSale={handleSaleTransfer}
                onCancel={handleListingRemoval}
                {...props}
              />
            )}
          />
          <Route
            path="/"
            exact
            render={() => (
              <Home
                auctions={auctions}
                cdp={cdps}
                maker={maker}
                proxy={proxy}
                onSetProxy={setProxy}
                onModal={triggerModal}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default App;
