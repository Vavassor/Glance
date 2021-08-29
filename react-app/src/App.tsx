import { PrivateRoute } from "Components/PrivateRoute";
import { useLocaleSetup } from "Hooks/useLocaleSetup";
import { useThemeModeSetup } from "Hooks/useThemeModeSetup";
import { About } from "Pages/About";
import { BeginPasswordReset } from "Pages/BeginPasswordReset";
import { Home } from "Pages/Home";
import { Login } from "Pages/Login";
import { PasswordReset } from "Pages/PasswordReset";
import { Register } from "Pages/Register";
import { SendPasswordReset } from "Pages/SendPasswordReset";
import { VerifyEmail } from "Pages/VerifyEmail";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { RoutePath } from "Types/RoutePath";

function App() {
  useLocaleSetup();
  useThemeModeSetup();

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to={RoutePath.Home} />} />
        <Route component={About} exact path={RoutePath.About} />
        <Route
          component={BeginPasswordReset}
          exact
          path={RoutePath.BeginPasswordReset}
        />
        <Route component={Login} exact path={RoutePath.Login} />
        <Route component={PasswordReset} exact path={RoutePath.PasswordReset} />
        <Route component={Register} exact path={RoutePath.Register} />
        <Route
          component={SendPasswordReset}
          exact
          path={RoutePath.SendPasswordReset}
        />
        <Route component={VerifyEmail} exact path={RoutePath.VerifyEmail} />
        <PrivateRoute component={Home} exact path={RoutePath.Home} />
      </Switch>
    </Router>
  );
}

export default App;
