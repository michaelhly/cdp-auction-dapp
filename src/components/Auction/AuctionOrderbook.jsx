import React, { useState, useEffect } from "react";
import { loadBidInfo } from "../../services/requestInfura";

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

  return <div />;
};

export default AuctionOrderbook;
