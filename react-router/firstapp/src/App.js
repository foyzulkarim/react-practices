import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about" component={() => <div>This is about component</div>}></Route>
          <Route path="/users" component={() => <div>This is users component</div>}></Route>
          <Route path="/" component={() => <div>This is home component</div>}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
