import { AccountPublic, Post } from "Types/Domain";

const placeholderAccount: AccountPublic = {
  id: "a",
  username: "name",
};

const placeholderPosts: Post[] = [
  {
    account: placeholderAccount,
    content: "something",
    creationDate: new Date("2021-07-30T21:52:52Z"),
    id: "a",
    title: "Chipmunk",
  },
  {
    account: placeholderAccount,
    content: "something",
    creationDate: new Date("2021-07-30T21:52:52Z"),
    id: "b",
    title: "Groundhog",
  },
  {
    account: placeholderAccount,
    content: "something",
    creationDate: new Date("2021-07-30T21:52:52Z"),
    id: "c",
    title: "Beaver",
  },
  {
    account: placeholderAccount,
    content: "something",
    creationDate: new Date("2021-07-30T21:52:52Z"),
    id: "d",
    title: "Gopher",
  },
  {
    account: placeholderAccount,
    content: "something",
    creationDate: new Date("2021-07-30T21:52:52Z"),
    id: "e",
    title: "Prairie dog",
  },
];

export const getAccountTimelinePosts = async (
  accessToken: string
): Promise<Post[]> => {
  return placeholderPosts;
};
