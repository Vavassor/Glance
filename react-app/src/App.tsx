import { PrivateRoute } from "Components/PrivateRoute";
import { useLocaleSetup } from "Hooks/useLocaleSetup";
import { useThemeModeSetup } from "Hooks/useThemeModeSetup";
import { About } from "Pages/About";
import { Home } from "Pages/Home";
import { Login } from "Pages/Login";
import { Register } from "Pages/Register";
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
        <Route component={Login} exact path={RoutePath.Login} />
        <Route component={Register} exact path={RoutePath.Register} />
        <PrivateRoute component={Home} exact path={RoutePath.Home} />
      </Switch>
    </Router>
  );
}

export default App;
