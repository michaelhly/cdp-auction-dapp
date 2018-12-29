const Maker = require("@makerdao/dai");

export const fetchCdpData = async id => {
  const maker = Maker.create("browser");

  try {
    await maker.authenticate();
    var cdp = await maker.getCdp(id);
  } catch (err) {
    console.log("Error:", err.message);
  }
  if (cdp) {
    try {
      var debt = await cdp.getDebtValue(Maker.USD);
      var fee = await cdp.getGovernanceFee(Maker.USD);
      var liquidation = await cdp.getLiquidationPrice();
      var collateral = await cdp.getCollateralValue(Maker.PETH);
    } catch (err) {
      console.log("Error:", err.message);
    }
  }

  return {
    debt,
    fee,
    liquidation,
    collateral
  };
};

export const fetchPrice = async () => {
  const maker = Maker.create("browser");

  try {
    await maker.authenticate();
    var price = maker.service("price");
    var ethPrice = await price.getEthPrice();
    var ratio = await price.getWethToPethRatio();
  } catch (err) {
    console.log("Error:", err.message);
  }

  return {
    ethPrice,
    ratio
  };
};
