import React, { Component } from "react";
import { BLOCK_PER_DAY } from "../../utils/helpers";
const Tokens = require("../../utils/tokens.json");

class ListingForm extends Component {
  render() {
    return (
      <div>
        <button
          type="button"
          class="btn btn-light"
          onClick={() => this.props.onBack()}
        >
          Back
        </button>
        <h1>{this.props.cdp.id}</h1>
        <form>
          <label>Token</label>
          <select class="form-control form-control">
            {Tokens.kovan.map(token => (
              <option>{token.symbol}</option>
            ))}
          </select>
          <label>Ask amount</label>
          <input class="form-control" type="text" placeholder="123" />
          <label>Days to expiration</label>
          <input class="form-control" type="text" placeholder="5" />
        </form>
        <button type="button" class="btn btn-success">
          List CDP
        </button>
      </div>
    );
  }
}

export default ListingForm;
