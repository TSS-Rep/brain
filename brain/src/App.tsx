import React, { Component } from "react";
import BrainNav from "./components/layout/BrainNav";
import BrainFooter from "./components/layout/BrainFooter";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Scheduler from "./components/scheduler/Scheduler";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <BrainNav />
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/shceduler" component={Scheduler} />
          </Switch>
          <BrainFooter />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
