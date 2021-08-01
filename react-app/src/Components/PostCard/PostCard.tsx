import { RenderArticleProps } from "Components/Feed";
import { Toolbar } from "Components/PostToolbar";
import i18next from "i18next";
import React from "react";
import { Post } from "Types/Domain";
import { formatDate, getTime } from "Utilities/Date";

export interface PostCardProps extends RenderArticleProps<Post> {}

export const PostCard: React.FC<PostCardProps> = ({ article }) => {
  const locale = i18next.language;
  return (
    <>
      <h3 className="px-3">{article.title}</h3>
      <section className="px-3">{article.content}</section>
      <section className="flex gap-x-1 px-3">
        <h4 className="sr-only">Post Info</h4>
        <p>{`@${article.account.username}`}</p>
        <time
          dateTime={article.creationDate.toISOString()}
          title={formatDate(article.creationDate, locale)}
        >
          {getTime(article.creationDate, locale)}
        </time>
      </section>
      <Toolbar ariaLabel="Post Actions" />
    </>
  );
};
