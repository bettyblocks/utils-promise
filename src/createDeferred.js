// @flow

import type {Deferred} from "./types";

/**
 * Creates a Deferred
 */
const createDeferred = (): Deferred<*> => {
  const deferred = {};

  deferred.promise = new Promise((resolve, reject) =>
    Object.assign(deferred, {resolve, reject})
  );

  // we are casting to any as otherwise flow thinks
  // deferred has neither resolve, nor reject methods
  return (deferred: any);
};

export default createDeferred;

export type {Deferred};
