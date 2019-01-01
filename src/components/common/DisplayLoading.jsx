import React from "react";
import { Spin, Icon } from "antd";

const DisplayLoading = props => {
  const spinner = (
    <Icon type="loading" style={{ color: "green" }} theme="outlined" />
  );
  Spin.setDefaultIndicator(spinner);

  return (
    <React.Fragment>
      <Spin size={props.size} />
    </React.Fragment>
  );
};

export default DisplayLoading;
