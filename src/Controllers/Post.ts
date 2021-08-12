import { RequestHandler } from "express";
import { findAccountTimelinePosts } from "Repositories/PostRepository";
import { ErrorAdo } from "Types/Ado/ErrorAdo";
import { PostAdo } from "Types/Ado/PostAdo";
import { AccountLocals, ParamsDictionary, ParsedQs } from "Types/Express";
import { config } from "Utilities/Config";
import { getPostAdoFromPost } from "Utilities/Mapping/Ado";
import {
  getIdLimits,
  getLinkEntityHeader,
  getQueryInt,
} from "Utilities/Pagination";

interface SearchRecentQuery extends ParsedQs {
  limit?: string;
  since_id?: string;
  until_id?: string;
}

const DEFAULT_SEARCH_RESULT_COUNT = 100;

export const getAccountTimelinePosts: RequestHandler<
  ParamsDictionary,
  PostAdo[] | ErrorAdo,
  any,
  SearchRecentQuery,
  AccountLocals
> = async (request, response, next) => {
  const limit = getQueryInt(request.query.limit, DEFAULT_SEARCH_RESULT_COUNT);
  const posts = await findAccountTimelinePosts(
    response.locals.accountId,
    request.query.since_id,
    request.query.until_id,
    limit
  );

  const idLimits = getIdLimits(posts);
  if (idLimits) {
    const { sinceId, untilId } = idLimits;
    response.links(
      getLinkEntityHeader(request.originalUrl, config.urlRoot, sinceId, untilId)
    );
  }

  response.json(posts.map(getPostAdoFromPost));
};
