// @flow

import {curry} from "flow-static-land/lib/Fun";

import type {CurriedFn2} from "flow-static-land/lib/Fun";

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

export default (curry(chain): CurriedFn2<
  Array<Function>,
  Promise<*>,
  Promise<*>
>);
