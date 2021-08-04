import { Op } from "sequelize";

export const getQuerySelector = (
  sinceId: string | undefined,
  untilId: string | undefined
) => {
  if (sinceId && untilId) {
    return {
      [Op.gt]: sinceId,
      [Op.lt]: untilId,
    };
  }

  if (sinceId) {
    return { [Op.gt]: sinceId };
  }

  if (untilId) {
    return { [Op.lt]: untilId };
  }

  return null;
};
