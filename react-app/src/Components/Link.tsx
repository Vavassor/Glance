import clsx from "clsx";
import React from "react";
import { Link as RouterLink, NavLink } from "react-router-dom";

export enum LinkType {
  External,
  Internal,
  Nav,
}

export interface LinkProps {
  className?: string;
  to: string;
  type?: LinkType;
}

export const Link: React.FC<LinkProps> = ({
  children,
  className,
  to,
  type = LinkType.Internal,
}) => {
  const props = {
    className: clsx("underline", className),
  };

  switch (type) {
    case LinkType.External:
      return (
        <a {...props} href={to}>
          {children}
        </a>
      );

    case LinkType.Internal:
      return (
        <RouterLink {...props} to={to}>
          {children}
        </RouterLink>
      );

    case LinkType.Nav:
      return (
        <NavLink {...props} to={to}>
          {children}
        </NavLink>
      );
  }
};
