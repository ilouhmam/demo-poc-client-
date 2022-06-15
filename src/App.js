import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from './logo.svg';

import AddProcess from "./components/add-process.component";
import Process from "./components/process.component";
import ProcessesList from "./components/processes-list.component";

class App extends Component {
  render() {
    return (
      <div>
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/processes"} className="nav-link">
                processes
              </Link>
            </li>
            
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/processes"]} component={ProcessesList} />
           
            <Route path="/processes/:id" component={Process} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
