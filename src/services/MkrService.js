const Maker = require("@makerdao/dai");

export const fetchCdpData = async id => {
  const maker = Maker.create("browser");
  await maker.authenticate();

  try {
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
