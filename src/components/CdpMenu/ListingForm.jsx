import React, { Component } from "react";

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
        <select class="form-control form-control-lg">
          <p>{this.props.cdp}</p>
          <option>Large select</option>
        </select>
        <select class="form-control">
          <option>Default select</option>
        </select>
        <select class="form-control form-control-sm">
          <option>Small select</option>
        </select>
      </div>
    );
  }
}

export default ListingForm;
