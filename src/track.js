// @flow

import type {PromiseInfo} from "./types";

const createInfo = (status, result) => ({
  status,
  result
});

const get = promise =>
  new Promise(resolve => {
    const handler = status => result => resolve(createInfo(status, result));

    promise.then(handler("resolved")).catch(handler("rejected"));
  });

/**
 * Returns an object with status and value properties that are updated as soon
 * as the promise is resolved or rejected
 */
const track = <Result: *>(
  promise: Promise<Result>
): PromiseInfo<$Supertype<Result>> => {
  const info = createInfo();

  get(promise).then(updatedInfo => Object.assign(info, updatedInfo));

  return info;
};

export default track;
