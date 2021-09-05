import { PostSpecAdo } from "Types/Ado";
import { PostSpec } from "Types/Domain";

export const getPostSpecFromAdo = (ado: PostSpecAdo) => {
  const { content } = ado;
  const spec: PostSpec = {
    content,
  };
  return spec;
};
