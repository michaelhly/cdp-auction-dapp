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
  const [cdps, setCdps] = useState("pending");
  const [loading, setLoading] = useState({
    mainLoad: true,
    effectsLoad: false
  });
  const [auctions, setAuctions] = useState([]);
  const [modalProps, setModalProps] = useState({
    show: false,
    method: "",
    params: {},
    callback: null
  });

  const fetchAuctionData = async count => {
    const copy = { ...loading };
    if (!copy.mainLoad) {
      copy.mainLoad = true;
      setLoading(copy);
    }
    try {
      const auctions = await loadAuctions(count);
      setAuctions(auctions);
    } catch (err) {
      console.log(err);
    }
    copy.mainLoad = false;
    if (copy.effectsLoad) {
      copy.effectsLoad = false;
    }
    setLoading(copy);
  };

  const fetchCdps = async () => {
    const copy = { ...loading };
    await maker.authenticate();
    setProxy(maker.service("proxy").currentProxy());
    if (maker.service("proxy").currentProxy()) {
      var user = maker.currentAccount().address;
      try {
        var result = await loadCdps(
          user,
          maker.service("proxy").currentProxy()
        );
        setCdps(result);
        if (!copy.mainLoad) {
          copy.effectsLoad = false;
          setLoading(copy);
        }
      } catch (err) {
        console.log(err);
        setCdps([]);
        if (!copy.mainLoad) {
          copy.effectsLoad = false;
          setLoading(copy);
        }
      }
    } else {
      setCdps([]);
      if (!copy.mainLoad) {
        copy.effectsLoad = false;
        setLoading(copy);
      }
    }
  };

  const handleNewListing = async events => {
    let loadCopy = { ...loading };
    loadCopy.mainLoad = true;
    setLoading(loadCopy);
    const id = events[1].raw.topics[3];

    try {
      var newAuction = await getAuction(id);
      setAuctions([newAuction, ...auctions]);
    } catch (err) {
      console.log(err);
      loadCopy.mainLoad = false;
      setLoading(loadCopy);
    }

    const cdpId = newAuction.cdpId;
    const updatedCdps = cdps.filter(cdp => cdp.id !== cdpId);
    setCdps(updatedCdps);

    loadCopy.mainLoad = false;
    setLoading(loadCdps);
  };

  const handleSaleTransfer = auctionId => {
    removeAuction(auctionId);
    const copy = { ...loading };
    copy.effectsLoad = true;
    setLoading(copy);
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
    const copy = [...auctions];
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
    fetchCdps();
  }, []);

  useAccountEffect(() => {
    const copy = { ...loading };
    if (!copy.mainLoad) {
      copy.effectsLoad = true;
      setLoading(copy);
      fetchCdps();
    }
  });

  return (
    <React.Fragment>
      <Navbar />
      <ConfirmationModal
        maker={maker}
        proxy={proxy}
        modal={modalProps}
        loading={loading.effectsLoad}
        onClose={closeModal}
        onSetProxy={setProxy}
        onSetLoading={setLoading}
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
                loading={loading}
                auctions={auctions}
                cdp={cdps}
                maker={maker}
                proxy={proxy}
                onSetProxy={setProxy}
                onSetLoading={setLoading}
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
