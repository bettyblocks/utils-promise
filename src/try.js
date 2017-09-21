// @flow

/**
 * Returns a promise that will be resolved with the result of execute,
 * or rejected with the error thrown by it (if any).
 */
const promiseTry = <Result>(execute: () => Result): Promise<Result> =>
  new Promise(resolve => resolve(execute()));

export default promiseTry;
