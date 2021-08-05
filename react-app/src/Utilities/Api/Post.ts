import { Post } from "Types/Domain";
import { getPostFromPostAdo } from "Utilities/Mapping/DomainMapping";
import { isPostAdoArray } from "Utilities/Typeguards";
import { callApi } from "./ApiUtilities";

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
