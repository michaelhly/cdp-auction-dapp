import React, { useState, useEffect } from "react";
import { useAccountEffect } from "web3-react/hooks";
import { Route, Switch, Redirect } from "react-router-dom";
import MyAuctions from "./components/MyAuctions";
import MyBids from "./components/MyBids";
import Home from "./components/Home/Homepage";
import Navbar from "./components/Navbar";
import Auction from "./components/Auction/Auction";
import ConfModal from "./components/ConfModal";
import { loadAuctions, loadDummyAuctions } from "./services/requestInfura";
import { loadCdps } from "./services/requestInfura";

const Maker = require("@makerdao/dai");

const App = () => {
  const maker = Maker.create("browser");
  const [proxy, setProxy] = useState("pending");
  const [cdps, setCdps] = useState("pending");
  const [loading, setLoading] = useState({
    initalLoad: true,
    effectsLoad: true
  });
  const [auctions, setAuctions] = useState([]);
  const [modalProps, setModalProps] = useState({
    show: false,
    method: "",
    params: {}
  });

  const fetchAuctionData = async count => {
    try {
      const auctions = await loadAuctions(count);
      setAuctions(auctions);
    } catch (err) {
      console.log("Error:", err.message);
    }
    const copy = { ...loading };
    copy.initalLoad = false;
    copy.effectsLoad = false;
    setLoading(copy);
  };

  const fetchDummyData = () => {
    const fakeAuctions = loadDummyAuctions(10);
    setAuctions(fakeAuctions);
  };

  const fetchCdps = async () => {
    var copy = { ...loading };
    await maker.authenticate();
    setProxy(maker.service("proxy").currentProxy());
    if (maker.service("proxy").currentProxy()) {
      var user = maker.currentAccount().address;
      try {
        var result = await loadCdps(
          user,
          maker.service("proxy").currentProxy(),
          0
        );
        setCdps(result);
        if (!copy.initalLoad) {
          copy.effectsLoad = false;
          setLoading(copy);
        }
      } catch (err) {
        console.log(err.message);
        setCdps([]);
        if (!copy.initalLoad) {
          copy.effectsLoad = false;
          setLoading(copy);
        }
      }
    } else {
      setCdps([]);
      if (!copy.initalLoad) {
        copy.effectsLoad = false;
        setLoading(copy);
      }
    }
  };

  const triggerModal = (method, params) => {
    console.log(method, params);
    const copy = { ...modalProps };
    copy.show = true;
    copy.method = method;
    copy.params = params;
    setModalProps(copy);
  };

  const closeModal = () => {
    const copy = { ...modalProps };
    copy.show = false;
    copy.method = "false";
    copy.params = [];
    setModalProps(copy);
  };

  useEffect(() => {
    fetchAuctionData(2);
    fetchCdps();
  }, []);

  useAccountEffect(() => {
    const copy = { ...loading };
    if (!copy.initalLoad) {
      copy.effectsLoad = true;
      setLoading(copy);
      fetchCdps();
    }
  });

  return (
    <React.Fragment>
      <Navbar />
      <ConfModal
        maker={maker}
        proxy={proxy}
        modal={modalProps}
        onClose={closeModal}
      />
      <main className="container">
        <Switch>
          {auctions.map(auction => (
            <Route
              key={auction.id}
              path={`/${auction.id}`}
              render={() => <Auction auction={auction} />}
            />
          ))}
          <Route path="/myauctions" component={MyAuctions} />
          <Route path="/mybids" component={MyBids} />
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
