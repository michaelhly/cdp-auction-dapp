export const encodeAbi = (web3, abi, method, params) => {
  const func = abi.filter(function(element) {
    return element.name == method;
  });

  const { name, type, inputs } = func[0];

  return web3.eth.abi.encodeFunctionCall(
    {
      name,
      type,
      inputs
    },
    params
  );
};
