import './App.css';
import ListBlog from './components/blog/ListBlogs';
import Posts from './components/blog/Posts';
import Post from './components/blog/Post';
import {AddBlog} from './components/blog/AddBlog';
import {UpdateBlog} from './components/blog/UpdateBlog';
import Register from './components/users/Register';
import Login from './components/users/Login';
import Logout from './components/users/Logout';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import Header from './layout/Header';
import Footer from './layout/Footer';


// import About from './layout/About';

function App() {
 
  return (
    <div className="container">
      <Router>
        <Header title='BlogmeUp'/>
        <Switch>
          <Route exact path='/'>
            <Posts  />
          </Route>  
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path='/addBlog/'>
            <AddBlog />
          </Route> 
          <Route path="/viewBlog/:slug"> 
            <Post />
          </Route> 
          <Route Path='/updateBlog/:slug'>
            <UpdateBlog />
          </Route> 
      </Switch>
      <Footer/>
    </Router>
    <ReactQueryDevtools />
    </div>
  );
}

export default App;
