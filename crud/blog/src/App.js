import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => { return (<h2>Hello. You are in Home</h2>) };

const PostCreate = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();

  const [location, setLocation] = useState({});

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    //location = { latitude, longitude };  
    setLocation({ latitude, longitude });
  }

  function error() {
    console.error('Unable to retrieve your location');
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  let saveData = (data) => {
    dispatch({
      type: "ADD_POST", payload: data
    })

    history.push('/posts');
  }

  const onSubmit = data => {
    let payload = { ...data, lat: location.latitude.toString(), long: location.longitude.toString() };
    saveData(payload);
  };

  return (
    <>
      <h2>Create new Post</h2>
      <h4>Location: {location.latitude}, {location.longitude}</h4>
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
  let dispatch = useDispatch();

  const [location, setLocation] = useState({});

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    //location = { latitude, longitude };  
    setLocation({ latitude, longitude });
  }

  function error() {
    console.error('Unable to retrieve your location');
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  let fetchData = (id) => {
    dispatch({ type: "FETCH_POST_DETAIL", payload: id });
  }

  useEffect(() => {
    fetchData(id);
  }, [id])

  const post = useSelector(state => {
    return state.posts.selectedPost;
  });

  let updateData = (data) => {
    const payload = { ...data, id, lat: location.latitude.toString(), long: location.longitude.toString() };
    dispatch({ type: "EDIT_POST", payload: payload });
    history.push('/posts');
  }

  const onSubmit = data => {
    updateData(data);
  };

  return (
    <>
      <h2>Update new Post</h2>
      <h4>Location: {location.latitude}, {location.longitude}</h4>
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
  let dispatch = useDispatch();

  let fetchData = (id) => {
    dispatch({ type: "FETCH_POST_DETAIL", payload: id });
  }

  useEffect(() => {
    fetchData(id);
  }, [id])

  const post = useSelector(state => {
    return state.posts.selectedPost;
  });


  let deleteData = () => {
    dispatch({ type: "DELETE_POST", payload: id });
    history.push('/posts');
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
    <div align="left" className="col-md-10 blogShort" id={post.id}>
      <h3>{post.title}</h3>
      <img src={post.imgUrl} style={{ height: "50px", width: "50px" }} alt="post img" className="pull-left thumb margin10 img-thumbnail"></img>
      <p>{post.emText}</p>
      <Link to={location => `/post-detail/${post.id}`}>Detail</Link> &nbsp;
      <Link to={location => `/post-edit/${post.id}`}>Edit</Link> &nbsp;
      <Link to={location => `/post-delete/${post.id}`}>Delete</Link> &nbsp;
    </div>
  )
}

const Comments = (props) => {

  let { id } = useParams();
  let dispatch = useDispatch();

  const comments = useSelector(state => {
    return state.posts.selectedComments;
  });

  let fetchData = () => {
    dispatch({
      type: "FETCH_COMMENTS", payload: id,
    })
  }

  useEffect(() => {
    fetchData(id);
  }, [])

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">Comments count: {comments.length}</div>
          <div className="col-sm-12">
            {
              comments.map(comment => {
                let date = comment.date;
                if (date) {
                  let d = new Date(date.toString());
                  date = d.toDateString();
                }
                else date = 'No Date';

                return (
                  <>
                    <div className="panel panel-default" key={comment.id}>
                      <div className="panel-body">
                        {comment.body} [{date}]
                      </div>
                    </div>
                  </>
                );
              }
              )
            }
          </div>
        </div>
      </div>
    </>
  )
};

const CommentCreate = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();

  let { id } = useParams();

  let saveData = (data) => {

    let comment = { body: data.title, date: new Date() };

    dispatch({
      type: "ADD_COMMENT", payload: { postId: id, data: comment }
    })

    history.goBack();
  }



  const onSubmit = data => {
    saveData(data);
  };

  return (
    <>
      <div className="row">

        <div className="col-md-6">
          <div className="widget-area no-padding blank">
            <div className="status-upload">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Write your comment here" name="title" ref={register({ required: true })} className="form-control" />
                <input type="submit" className="btn btn-primary btn-block" />
              </form>
            </div>
          </div>
        </div>

      </div>

    </>
  )
};

const PostDetail = (props) => {

  let { id } = useParams();

  let dispatch = useDispatch();

  let fetchData = (id) => {
    dispatch({ type: "FETCH_POST_DETAIL", payload: id });
  }

  useEffect(() => {
    fetchData(id);
  }, [])

  const post = useSelector(state => {
    return state.posts.selectedPost;
  });

  let match = useRouteMatch();

  return (
    <>
      <div align="left" className="col-md-10 blogShort" id={id}>
        <h2>{post.title}</h2>
        <img src={post.imgUrl} style={{ height: "50px", width: "50px" }} alt="post img" className="pull-left thumb margin10 img-thumbnail"></img>
        <article><p>{post.articleText}</p></article>
        <a className="btn btn-blog pull-right marginBottom10" href={post.readMoreUrl}>READ MORE</a>
      </div>
      <div>
        <h4>Comments</h4>
        <Link className="btn btn-blog pull-right" to={`${match.url}/comments`}>Show comments</Link> &nbsp;
        <Link className="btn btn-blog pull-right" to={`${match.url}/add-comment`}>Add comment</Link>
        <Switch>
          <Route path={`${match.path}/comments`} component={Comments}></Route>
          <Route path={`${match.path}/add-comment`} component={CommentCreate}></Route>
        </Switch>
      </div>
    </>
  )
};

const Posts = () => {
  let dispatch = useDispatch();

  const posts = useSelector(state => {
    return state.posts.postList;
  });

  let fetchData = () => {
    dispatch({ type: "FETCH_POSTS" });
    dispatch({ type: "CLEAR_SELECTION" });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div id="blog" className="row">
        {
          posts.map(p => <PostSummary {...p} key={p.id} />)
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