import React, { useState } from "react";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import { fetchPrice } from "../services/MkrService";

const Auction = props => {
  const web3 = useWeb3Context();
  const [account, setAccount] = useState(web3.account);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(props.ethPrice);
  const [ratio, setRatio] = useState(props.ratio);

  useAccountEffect(() => {
    setLoading(true);
    setAccount(web3.account);
    setLoading(false);
  });

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <div class="card">
              <div class="card-body">This is some text within a card body.</div>
            </div>
          </div>
          <div className="col-lg-9">
            <h3>CDP {props.data.cdpId}</h3>
            <div className="row">
              <div className="col-sm-3">
                <div class="card">
                  <div class="card-body">
                    This is some text within a card body.
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div class="card">
                  <div class="card-body">
                    This is some text within a card body.
                  </div>
                </div>
              </div>
              <div className="col-sm-3" />
              <div class="card">
                <div class="card-body">
                  This is some text within a card body.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auction;

/*
class Auction extends Component {
  state = {};
  render() {
    return <h1>Auction: {this.props.data.id}</h1>;
  }
}

export default Auction;
*/
