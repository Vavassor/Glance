import { QuerySelector } from "mongodb";

export const getQuerySelector = (
  sinceId?: string,
  untilId?: string
): QuerySelector<string> | null => {
  if (!sinceId && !untilId) {
    return null;
  }

  let idQuery: QuerySelector<string> = {};
  if (sinceId) {
    idQuery.$gt = sinceId;
  }
  if (untilId) {
    idQuery.$lt = untilId;
  }

  return idQuery;
};
