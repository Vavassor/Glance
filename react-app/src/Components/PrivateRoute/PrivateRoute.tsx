import { useAppSelector } from "Hooks/ReduxHooks";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { selectIsLoggedIn } from "Slices/AuthSlice";
import { RoutePath } from "Types/RoutePath";

export const PrivateRoute: React.FC<RouteProps> = ({
  children,
  component: Component,
  render,
  ...rest
}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          children ||
          (Component ? <Component {...props} /> : render ? render(props) : null)
        ) : (
          <Redirect
            to={{
              pathname: RoutePath.Login,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
