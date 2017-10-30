// @flow

import {curry} from "flow-static-land/lib/Fun";

import type {CurriedFn2} from "flow-static-land/lib/Fun";

const getBuilder = values => (object, key, index) => ({
  ...object,
  [key]: values[index]
});

// TODO: move to @jumpn/utils-object once we create this one
const objectBuild: CurriedFn2<
  Array<string>,
  Array<any>,
  Object
> = curry((keys, values) => keys.reduce(getBuilder(values), {}));

export default objectBuild;
