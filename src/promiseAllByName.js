// @flow

import zipObject from "lodash/fp/zipObject";

type PromisesByName = {
  [name: string]: Promise<*>
};

type ResultsByName = {
  [name: string]: any
};

const promiseAllByName = (
  promisesByName: PromisesByName
): Promise<ResultsByName> => {
  // we need to do this since Object.entries returns Array<[string, mixed]>
  // and mixed can't be directly casted to another type
  const promiseEntries: Array<[string, Promise<*>]> = (Object.entries(
    promisesByName
  ): Array<[string, any]>);

  const promises = promiseEntries.map(([name, promise]) =>
    promise.catch(error => Object.assign(error, {from: name}))
  );

  const promiseNames = Object.keys(promisesByName);

  return Promise.all(promises).then(results =>
    zipObject(promiseNames, results)
  );
};

export default promiseAllByName;

export type {PromisesByName};
