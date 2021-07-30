import { RenderArticleProps } from "Components/Feed";
import React from "react";
import { Post } from "Types/Post";

export interface PostCardProps extends RenderArticleProps<Post> {}

export const PostCard: React.FC<PostCardProps> = ({ article }) => {
  return (
    <>
      <p>{article.title}</p>
    </>
  );
};
