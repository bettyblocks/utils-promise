// @flow

import objectBuild from "./objectBuild";

type PromisesByName = {
  [name: string]: Promise<*>
};

type ResultsByName = {
  [name: string]: any
};

/**
 * Returns a promise that will be resolved with an object the results of all the
 * given promises or it will reject with an Error that will have an additional
 * property "from" with the name of the promise that caused the rejection. 
 */
const allByName = (promisesByName: PromisesByName): Promise<ResultsByName> => {
  // we need to do this since Object.entries returns Array<[string, mixed]>
  // and mixed can't be directly casted to another type
  const promiseEntries: Array<[string, Promise<*>]> = (Object.entries(
    promisesByName
  ): Array<[string, any]>);

  const promises = promiseEntries.map(([name, promise]) =>
    promise.catch(error => Object.assign(error, {from: name}))
  );

  const promiseNames = Object.keys(promisesByName);

  return Promise.all(promises).then(objectBuild(promiseNames));
};

export default allByName;

export type {PromisesByName};
