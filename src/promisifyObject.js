// @flow

import mapValues from "lodash/fp/mapValues";

import promisifyFunction from "./promisifyFunction";

/**
 * Returns a new object with the result of having promisified all the methods of
 * the one given.
 */
const promisifyObject = (object: Object) =>
  mapValues(
    value =>
      typeof value === "function"
        ? promisifyFunction(object[value].bind(object))
        : value,
    object
  );

export default promisifyObject;
