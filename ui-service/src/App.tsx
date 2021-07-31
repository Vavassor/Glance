import { About } from "Components/About";
import { Home } from "Components/Home";
import { useLocaleSetup } from "Hooks/useLocaleSetup";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  useLocaleSetup();
  return (
    <Router>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={About} exact path="/about" />
      </Switch>
    </Router>
  );
}

export default App;
