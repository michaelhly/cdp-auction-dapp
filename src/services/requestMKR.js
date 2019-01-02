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
      var d = await cdp.getDebtValue(Maker.USD);
      var f = await cdp.getGovernanceFee(Maker.USD);
      var l = await cdp.getLiquidationPrice();
      var c = await cdp.getCollateralValue();
      var p = await maker.service("price").getEthPrice();
    } catch (err) {
      console.log("Error:", err.message);
    }
  }

  const debt = d._amount.toNumber();
  const fee = f._amount.toNumber();
  const liquidation = l._amount.toNumber();
  const collateral = c._amount.toNumber();
  const ethPrice = p._amount.toNumber();

  return {
    debt,
    fee,
    liquidation,
    collateral,
    ethPrice
  };
};

export const fetchPrice = async () => {
  const maker = Maker.create("browser");

  try {
    await maker.authenticate();
    var price = maker.service("price");
    var ethPrice = await price.getEthPrice();
  } catch (err) {
    console.log("Error:", err.message);
  }

  return ethPrice;
};
