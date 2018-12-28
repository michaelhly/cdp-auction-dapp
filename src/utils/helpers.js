export const BLOCKS_PER_DAY = 4 * 60 * 24;

export const extractFunction = (abi, method, params) => {
  const func = abi.filter(function(element) {
    return element.name == method;
  });

  const { name, type, inputs } = func[0];
  return { name, type, inputs };
};

export const random = max => Math.floor(Math.random() * (max + 1));
