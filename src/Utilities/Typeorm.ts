import { Between, LessThan, MoreThan } from "typeorm";

export const getQuerySelector = (
  sinceId: string | undefined,
  untilId: string | undefined
) => {
  if (sinceId && untilId) {
    return Between(parseInt(sinceId) - 1, parseInt(untilId) + 1);
  }
  if (sinceId) {
    return MoreThan(sinceId);
  }
  if (untilId) {
    return LessThan(untilId);
  }
  return null;
};
