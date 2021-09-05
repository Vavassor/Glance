import { Post, PostSpec } from "Types/Domain";
import { getAdoFromPostSpec } from "Utilities/Mapping/AdoMapping";
import { getPostFromPostAdo } from "Utilities/Mapping/DomainMapping";
import { isPostAdo, isPostAdoArray } from "Utilities/Typeguards";
import { callApi } from "./ApiUtilities";

export const createPost = async (
  accessToken: string,
  spec: PostSpec
): Promise<Post> => {
  const ado = await callApi("post", {
    bearerToken: accessToken,
    body: getAdoFromPostSpec(spec),
    method: "POST",
  });

  if (!isPostAdo(ado)) {
    throw new Error("The response body was not the expected type 'PostAdo'.");
  }

  return getPostFromPostAdo(ado);
};

export const getAccountTimelinePosts = async (
  accessToken: string
): Promise<Post[]> => {
  const postAdos = await callApi("post/account_timeline", {
    bearerToken: accessToken,
    method: "GET",
  });

  if (!isPostAdoArray(postAdos)) {
    throw new Error("The response body was not the expected type 'PostAdo[]'.");
  }

  return postAdos.map(getPostFromPostAdo);
};
