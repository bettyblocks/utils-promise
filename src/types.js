// @flow

type Deferred<Result> = {
  promise: Promise<Result>,
  resolve: (result: Result) => void,
  reject: (error: any) => void
};

type PromiseInfo<Result> = {
  result: Result,
  status: void | "rejected" | "resolved"
};

export type {Deferred, PromiseInfo};
