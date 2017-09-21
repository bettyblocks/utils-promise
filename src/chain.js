// @flow

/**
 * Chains all promises starting from initialPromise and binding chainers to
 * next methods 
 */
const chain = (
  chainers: Array<Function>,
  initialPromise: Promise<*>
): Promise<*> =>
  chainers.reduce(
    (lastPromise, chainNext) => lastPromise.then(chainNext),
    initialPromise
  );

export default chain;
