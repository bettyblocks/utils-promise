// @flow

import {curry} from "flow-static-land/lib/Fun";

import type {CurriedFn2} from "flow-static-land/lib/Fun";

/**
 * Chains all promises starting from initialPromise and binding chainers to
 * next methods 
 */
const chain: CurriedFn2<
  Array<Function>,
  Promise<*>,
  Promise<*>
> = curry((chainers, initialPromise) =>
  chainers.reduce(
    (lastPromise, chainNext) => lastPromise.then(chainNext),
    initialPromise
  )
);

export default chain;
