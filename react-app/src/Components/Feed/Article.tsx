import React, { forwardRef, HTMLAttributes } from "react";

export interface ArticleProps extends HTMLAttributes<HTMLElement> {
  labelId: string;
  positionInSet: number;
  setSize: number;
}

export const Article = forwardRef<HTMLElement, ArticleProps>(
  ({ children, labelId, positionInSet, setSize, ...remainingProps }, ref) => {
    return (
      <article
        aria-labelledby={labelId}
        aria-posinset={positionInSet}
        aria-setsize={setSize}
        ref={ref}
        tabIndex={0}
        {...remainingProps}
      >
        {children}
      </article>
    );
  }
);
