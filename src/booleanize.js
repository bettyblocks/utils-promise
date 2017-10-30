// @flow

const returnTrue = () => true;

const returnFalse = () => false;

/**
 * Returns a new promise which follows the one given returning true in case
 * there was no error, or false otherwise
 */
const booleanize = (promise: Promise<any>): Promise<boolean> =>
  promise.then(returnTrue).catch(returnFalse);

export default booleanize;
