import './App.css';
import ListBlog from './components/blog/ListBlogs';
import {AddBlog} from './components/blog/AddBlog';
import {UpdateBlog} from './components/blog/UpdateBlog';
import Register from './components/users/Register';
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
            <ListBlog />
          </Route>  
          <Route path="/register">
            <Register />
          </Route>
          <Route path='/addBlog'>
            <AddBlog />
          </Route> 
          <Route Path='/updateBlog/:id'>
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
