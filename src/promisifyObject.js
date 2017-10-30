// @flow

// TODO: retrieve map from @jumpn/utils-object once we have this one
import {map} from "@jumpn/utils-composite";

import promisifyFunction from "./promisifyFunction";

const promisifyIfMethod = (value, key, object) =>
  typeof value === "function"
    ? promisifyFunction(object[value].bind(object))
    : value;

/**
 * Returns a new object with the result of having promisified all the methods of
 * the one given.
 */
const promisifyObject = (object: Object): Object =>
  map(promisifyIfMethod, object);

export default promisifyObject;
