import { Post } from "Types/Post";

const placeholderPosts: Post[] = [
  { id: "a", title: "Chipmunk" },
  { id: "b", title: "Groundhog" },
  { id: "c", title: "Beaver" },
  { id: "d", title: "Gopher" },
  { id: "e", title: "Prairie dog" },
];

export const getAccountTimelinePosts = async (
  accessToken: string
): Promise<Post[]> => {
  return placeholderPosts;
};
