import React, { Component } from "react";
import BrainNav from "./components/layout/BrainNav";
import BrainFooter from "./components/layout/BrainFooter";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Scheduler from "./components/scheduler/Scheduler";
import { UnassignedTicketsProvider } from "contexts/UnassignedTickets"
import { EngineersProvider } from "contexts/Engineers";
import { FollowUpTicketsProvider } from "contexts/FollowUpTickets";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <BrainNav />
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={ SignUp } />
            <Route path="/scheduler" component={ Scheduler } />
          </Switch>
          <BrainFooter />
        </div>
      </BrowserRouter>
    );
  }
}

export default () => (
  <UnassignedTicketsProvider>
    <EngineersProvider>
      <FollowUpTicketsProvider>
        <App/>
      </FollowUpTicketsProvider>
    </EngineersProvider>
  </UnassignedTicketsProvider>
);
