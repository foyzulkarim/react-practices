import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

const Home = () => { return (<h2>Hello. You are in Home</h2>) };
const PostCreate = () => {
  return (<h2>Create new Post</h2>)
};

const PostDetail = (props) => {
  return (
    <div className="col-md-10 blogShort" id={props.id}>
      <h1>{props.post.title}</h1>
      <em>This snippet use <a href="http://bootsnipp.com/snippets/featured/sexy-sidebar-navigation" target="_blank">{props.post.emText}</a></em>
      <article><p>{props.post.articleText}</p></article>
      <a className="btn btn-blog pull-right marginBottom10" href={props.post.readMoreUrl}>READ MORE</a>
    </div>
  )
};

const Posts = () => {

  let [posts, setPosts] = useState([
    {
      id: '1',
      title: 'Hello world 1',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
      emText: 'Short text',
      articleText: 'this is article text 1',
      readMoreUrl: 'https://youtube.com/foyzulkarim'
    },
    {
      id: '2',
      title: 'Hello world 2',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
      emText: 'Short text',
      articleText: 'this is article text 2',
      readMoreUrl: 'https://youtube.com/foyzulkarim'
    },
    {
      id: '3',
      title: 'Hello world 3',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
      emText: 'Short text',
      articleText: 'this is article text 3',
      readMoreUrl: 'https://youtube.com/foyzulkarim'
    }
  ]);

  return (
    <div className="container">
      <div id="blog" className="row">
          {
            posts.map(p => <PostDetail post={p} />)
          }
        <div className="col-md-12 gap10"></div>
      </div>
    </div>
  )
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
              <Link to="/posts" className="list-group-item list-group-item-action bg-light">Topics</Link>
              <Link to="/post-create" className="list-group-item list-group-item-action bg-light">Create Post</Link>
            </div>
          </div>

          <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
              <h3>hello world</h3>
            </nav>

            <div className="container-fluid">
              <Switch>
                <Route path="/post-create"><PostCreate /></Route>
                <Route path="/posts"><Posts /></Route>
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
