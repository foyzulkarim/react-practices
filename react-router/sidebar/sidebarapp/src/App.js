import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

const About = () => { return (<h2>About</h2>) };
const Home = () => { return (<h2>Home</h2>) };
const Topic = () => {
  const { topicName } = useParams();
  return (<h2>Topic '{topicName}'</h2>)
};
const TopicNotSelected = () => { return (<h2>TopicNotSelected</h2>) }

const Topics = () => {

  let match = useRouteMatch();

  return (
    <>
      <h2>Topics</h2>
      <ul>
        <li><Link to={`${match.url}/components`}>Components</Link></li>
        <li><Link to={`${match.url}/props`}>Props</Link></li>
      </ul>
      <Switch>
        <Route path={`${match.path}/:topicName`} component={Topic}></Route>
        <Route path={`${match.path}`} component={TopicNotSelected}></Route>
      </Switch>
    </>)
}


function App() {
  return (
    <Router>
      <div className="App">
        <div className="d-flex" id="wrapper">
          <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">Code with me</div>
            <div className="list-group list-group-flush">

              <Link to="/" className="list-group-item list-group-item-action bg-light">Home</Link>
              <Link to="/about" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
              <Link to="/topics" className="list-group-item list-group-item-action bg-light">Topics</Link>

            </div>
          </div>

          <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
              <h3>hello world</h3>
            </nav>

            <div className="container-fluid">
              <Switch>
                <Route path="/about"><About /></Route>
                <Route path="/topics"><Topics /></Route>
                <Route path="/"><Home /></Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
