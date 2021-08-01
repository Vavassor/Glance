import { RequestHandler } from "express";
import { AccountPublicAdo } from "Types/Ado/AccountPublicAdo";
import { ErrorAdo } from "Types/Ado/ErrorAdo";
import { PostAdo } from "Types/Ado/PostAdo";
import { ParamsDictionary, ParsedQs } from "Types/Express";

const placeholderAccount: AccountPublicAdo = {
  id: "a",
  username: "name",
};

const placeholderPosts: PostAdo[] = [
  {
    account: placeholderAccount,
    content: "something",
    creation_date: "2021-07-30T21:52:52Z",
    id: "a",
    title: "Chipmunk",
  },
  {
    account: placeholderAccount,
    content: "something",
    creation_date: "2021-07-30T21:52:52Z",
    id: "b",
    title: "Groundhog",
  },
  {
    account: placeholderAccount,
    content: "something",
    creation_date: "2021-07-30T21:52:52Z",
    id: "c",
    title: "Beaver",
  },
  {
    account: placeholderAccount,
    content: "something",
    creation_date: "2021-07-30T21:52:52Z",
    id: "d",
    title: "Gopher",
  },
  {
    account: placeholderAccount,
    content: "something",
    creation_date: "2021-07-30T21:52:52Z",
    id: "e",
    title: "Prairie dog",
  },
];

interface SearchRecentQuery extends ParsedQs {
  limit?: string;
  since_id?: string;
  until_id?: string;
}

export const getAccountTimelinePosts: RequestHandler<
  ParamsDictionary,
  PostAdo[] | ErrorAdo,
  any,
  SearchRecentQuery
> = async (request, response, next) => {
  response.json(placeholderPosts);
};
