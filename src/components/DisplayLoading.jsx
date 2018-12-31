import React from "react";
import { Spin, Icon } from "antd";

const DisplayLoading = () => {
  const spinner = (
    <Icon type="loading" style={{ color: "green" }} theme="outlined" />
  );
  Spin.setDefaultIndicator(spinner);

  return (
    <React.Fragment>
      <Spin size="large" />
    </React.Fragment>
  );
};

export default DisplayLoading;
