import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { hot } from 'react-hot-loader';


const Home = () => { return (<h2>Hello. You are in Home</h2>) };


const PostCreate = () => {
  let history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();

  let saveData = (data) => {
    fetch('http://localhost:3001/posts', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        history.push('/posts');
      });
  }


  const onSubmit = data => {
    saveData(data);
  };

  return (
    <>
      <h2>Create new Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group input-group">
          <input type="text" placeholder="Title" name="title" ref={register({ required: true })} className="form-control" />
          <span>{errors.title && 'Title is required'}</span>
        </div>
        <div className="form-group input-group">
          <input type="text" placeholder="Summary" name="emText" ref={register({ required: true, maxLength: 100 })} className="form-control" />
        </div>
        <div className="form-group input-group">
          <textarea name="articleText" ref={register({ required: true })} className="form-control" />
        </div>
        <div className="form-group input-group">
          <input type="url" placeholder="Image URL" name="imgUrl" ref={register({ required: true })} className="form-control" />
        </div>

        <input type="submit" className="btn btn-primary btn-block" />
      </form>
    </>
  )
};

const PostEdit = (props) => {
  let history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();
  let { id } = useParams();

  let fetchData = (id) => {
    fetch(`http://localhost:3001/posts/${id}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: 'no-referrer', // no-referrer, *client
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setPost(response.data);
      });
  }

  useEffect(() => {
    fetchData(id);
  }, [id])

  let [post, setPost] = useState({});


  let updateData = (data) => {
    fetch(`http://localhost:3001/posts/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        history.push('/posts');
      });
  }

  const onSubmit = data => {
    updateData(data);
  };

  return (
    <>
      <h2>Update new Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group input-group">
          <input type="text" placeholder="Title" name="title" defaultValue={post.title} ref={register({ required: true })} className="form-control" />
          <span>{errors.title && 'Title is required'}</span>
        </div>
        <div className="form-group input-group">
          <input type="text" placeholder="Summary" name="emText" defaultValue={post.emText} ref={register({ required: true, maxLength: 100 })} className="form-control" />
        </div>
        <div className="form-group input-group">
          <textarea name="articleText" defaultValue={post.articleText} ref={register({ required: true })} className="form-control" />
        </div>
        <div className="form-group input-group">
          <input type="url" placeholder="Image URL" name="imgUrl" defaultValue={post.imgUrl} ref={register({ required: true })} className="form-control" />
        </div>

        <input type="submit" className="btn btn-primary btn-block" />
      </form>
    </>
  )
};

const PostDelete = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  let { id } = useParams();
  let history = useHistory();

  let fetchData = (id) => {
    fetch(`http://localhost:3001/posts/${id}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: 'no-referrer', // no-referrer, *client
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setPost(response.data);
      });
  }

  useEffect(() => {
    fetchData(id);
  }, [id])

  let [post, setPost] = useState({});


  let deleteData = () => {
    fetch(`http://localhost:3001/posts/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: 'no-referrer', // no-referrer, *client
      //body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        history.push('/posts');
      });
  }

  const onSubmit = data => {
    deleteData();
  };

  return (
    <>
      <h2>Delete Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{post.title}</h2>
        <img src={post.imgUrl} style={{ height: "50px", width: "50px" }} alt="post img" className="pull-left thumb margin10 img-thumbnail"></img>
        <article><p>{post.articleText}</p></article>
        <input type="submit" className="btn btn-primary btn-block" value="Delete" />
      </form>
    </>
  )
};


const PostSummary = (post) => {
  return (
    <div align="left" className="col-md-10 blogShort" id={post._id}>
      <h3>{post.title}</h3>
      <img src={post.imgUrl} style={{ height: "50px", width: "50px" }} alt="post img" className="pull-left thumb margin10 img-thumbnail"></img>
      <p>{post.emText}</p>
      <Link to={location => `/post-detail/${post._id}`}>Detail</Link> &nbsp;
      <Link to={location => `/post-edit/${post._id}`}>Edit</Link> &nbsp;
      <Link to={location => `/post-delete/${post._id}`}>Delete</Link> &nbsp;
    </div>
  )
}

const PostDetail = (props) => {

  let { id } = useParams();

  let fetchData = (id) => {
    fetch(`http://localhost:3001/posts/${id}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: 'no-referrer', // no-referrer, *client
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setPost(response.data);
      });
  }

  useEffect(() => {
    fetchData(id);
  }, [id])

  let [post, setPost] = useState({});

  return (
    <div align="left" className="col-md-10 blogShort" id={id}>
      <h2>{post.title}</h2>
      <img src={post.imgUrl} style={{ height: "50px", width: "50px" }} alt="post img" className="pull-left thumb margin10 img-thumbnail"></img>
      <article><p>{post.articleText}</p></article>
      <a className="btn btn-blog pull-right marginBottom10" href={post.readMoreUrl}>READ MORE</a>
    </div>
  )
};

const Posts = () => {
  let dispatch = useDispatch();
  let [posts, setPosts] = useState([]);

  let fetchData = () => {
    // fetch('http://localhost:3001/posts/search', {
    //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //   mode: 'cors', // no-cors, *cors, same-origin
    //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //   headers: {
    //     'Content-Type': 'application/json'
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   referrerPolicy: 'no-referrer', // no-referrer, *client
    //   // body: JSON.stringify(data) // body data type must match "Content-Type" header
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((result) => {
    //     console.log(result);
    //     setPosts(result.data);
    //   });

    dispatch({
      type: "FETCH_POSTS", payload: [ { _id: '2', title: 'title 2'}]
    })

  }

  useEffect(() => {
    // Update the document title using the browser API
    if (posts.length === 0) {
      fetchData();
    }
  }, [posts]);

  return (
    <div className="container">
      <div id="blog" className="row">
        {
          posts.map(p => <PostSummary {...p} key={p._id} />)
        }
        <div className="col-md-12 gap10"></div>
      </div>
    </div>
  )
}



function App() {

  const myState = useSelector(state => {
    console.log('App.useSelector.state.posts', state.posts);
    return state;
  });

  const dispatch = useDispatch();

  return (
    <Router>
      <div className="App">
        <div className="d-flex" id="wrapper">
          <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">Code with me</div>
            <div className="list-group list-group-flush">

              <Link to="/" className="list-group-item list-group-item-action bg-light">Home</Link>
              <Link to="/posts" className="list-group-item list-group-item-action bg-light">Posts</Link>
              <Link to="/post-create" className="list-group-item list-group-item-action bg-light">Create Post</Link>
            </div>
          </div>

          <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
              <h3>hello world</h3>
            </nav>

            <div className="container-fluid">
              <Switch>
                <Route path="/post-detail/:id"><PostDetail /></Route>
                <Route path="/post-create"><PostCreate /></Route>
                <Route path="/post-edit/:id"><PostEdit /></Route>
                <Route path="/post-delete/:id"><PostDelete /></Route>
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