import _ from "lodash";

export const BLOCKS_PER_DAY = 4 * 60 * 24;

export const extractFunction = (abi, method, params) => {
  const func = abi.filter(function(element) {
    return element.name === method;
  });

  const { name, type, inputs } = func[0];
  return { name, type, inputs };
};

export const random = max => Math.floor(Math.random() * (max + 1));

export const convertExpiryBlocks = expiry => {
  var days = expiry / BLOCKS_PER_DAY;
  if (days < 1) {
    var hours = days * 24;
    if (hours < 1) {
      var minutes = hours * 60;
      if (minutes < 1) {
        return "< 1 minute";
      } else {
        return Math.round(minutes) === 1
          ? "1 minute"
          : `${Math.round(minutes)} minutes`;
      }
    } else {
      return Math.round(hours) === 1 ? "1 hour" : `${Math.round(hours)} hours`;
    }
  } else {
    return Math.round(days) === 1 ? "1 day" : `${Math.round(days)} days`;
  }
};

export const calcValue = (collateral, debt, fee, ethPrice) => {
  return Math.round((collateral - (debt + fee) / ethPrice) * 100) / 100;
};

export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
};
