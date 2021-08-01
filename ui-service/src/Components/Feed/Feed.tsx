import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  KeyboardEvent,
  KeyboardEventHandler,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { Key } from "Types/Key";
import { Article, ArticleProps } from "./Article";
import clsx from "clsx";

export interface FeedProps<T> {
  articleProps?: Partial<ArticleProps>;
  articles: T[];
  elementAfterFeed?: HTMLElement | null;
  elementBeforeFeed?: HTMLElement | null;
  feedProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  getKey: (article: T) => string;
  idPrefix: string;
  isLoadingArticles: boolean;
  labelId: string;
  renderArticle: (props: RenderArticleProps<T>) => ReactNode;
}

export interface RenderArticleProps<T> {
  article: T;
  labelId: string;
}

export function Feed<T>({
  articleProps,
  articles,
  elementAfterFeed,
  elementBeforeFeed,
  feedProps,
  getKey,
  idPrefix,
  isLoadingArticles,
  labelId,
  renderArticle,
}: FeedProps<T>) {
  const { className, ...remainingFeedProps } = feedProps || {};
  const articlesByKey = useRef<Map<string, HTMLElement>>(new Map());

  const focusArticle = (article: T) => {
    const key = getKey(article);
    const element = articlesByKey.current.get(key);
    element?.focus();
  };

  const handleArticleKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    index: number
  ) => {
    switch (event.key) {
      case Key.End:
        if (event.ctrlKey) {
          elementAfterFeed?.focus();
        }
        break;

      case Key.Home:
        if (event.ctrlKey) {
          elementBeforeFeed?.focus();
        }
        break;

      case Key.PageDown:
        event.preventDefault();
        const nextIndex = Math.min(index + 1, articles.length - 1);
        focusArticle(articles[nextIndex]);
        break;

      case Key.PageUp:
        event.preventDefault();
        const priorIndex = Math.max(index - 1, 0);
        focusArticle(articles[priorIndex]);
        break;
    }
  };

  const handleArticleRef = (instance: HTMLElement | null, key: string) => {
    if (instance) {
      articlesByKey.current.set(key, instance);
    }
  };

  useEffect(() => {
    const currentArticlesByKey = articlesByKey.current;
    return () => {
      currentArticlesByKey.clear();
    };
  }, [articles]);

  return (
    <div
      aria-busy={isLoadingArticles}
      aria-labelledby={labelId}
      className={clsx("flex flex-col", feedProps?.className)}
      role="feed"
      {...remainingFeedProps}
    >
      {articles.map((article, index) => {
        const key = getKey(article);
        const labelId = `${idPrefix}-${key}-label`;

        const handleKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
          handleArticleKeyDown(event, index);
        };

        const handleRef = (instance: HTMLElement | null) => {
          handleArticleRef(instance, key);
        };

        return (
          <Article
            key={key}
            labelId={labelId}
            onKeyDown={handleKeyDown}
            positionInSet={index + 1}
            ref={handleRef}
            setSize={articles.length}
            {...articleProps}
          >
            {renderArticle({ article, labelId })}
          </Article>
        );
      })}
    </div>
  );
}
