import { Feed } from "Components/Feed";
import { Header } from "Components/Header";
import { PostCard } from "Components/PostCard";
import React, { useEffect, useState } from "react";
import { AsyncStatus } from "Types/AsyncStatus";
import { Post } from "Types/Domain";
import { authService, getAccountTimelinePosts } from "Utilities/Api";

const getKey = (article: Post) => {
  return article.id;
};

export const Home: React.FC = () => {
  const latestPostsHeadingId = "timeline";
  const [posts, setPosts] = useState<Post[]>([]);
  const [postLoadStatus, setPostLoadStatus] = useState<AsyncStatus>(
    AsyncStatus.Idle
  );

  useEffect(() => {
    const getPosts = async () => {
      try {
        setPostLoadStatus(AsyncStatus.Pending);
        const accessToken = await authService.getRefreshedAccessToken();
        const posts = await getAccountTimelinePosts(accessToken.accessToken);
        setPosts(posts);
        setPostLoadStatus(AsyncStatus.Success);
      } catch (error) {
        setPostLoadStatus(AsyncStatus.Failure);
      }
    };

    getPosts();
  }, []);

  return (
    <>
      <Header />
      <h2 className="sr-only" id={latestPostsHeadingId}>
        Latest Posts
      </h2>
      <Feed
        articleProps={{
          className:
            "dark:text-white focus:outline-none focus:ring-2 focus:ring-focus",
        }}
        articles={posts}
        feedProps={{ className: "gap-3 m-auto max-w-sm py-2" }}
        getKey={getKey}
        idPrefix="latest-posts"
        isLoadingArticles={postLoadStatus === AsyncStatus.Pending}
        labelId={latestPostsHeadingId}
        renderArticle={PostCard}
      />
    </>
  );
};
