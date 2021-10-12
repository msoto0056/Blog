import './App.css';
import ListBlog from './components/ListBlogs';
import {AddBlog} from './components/AddBlog';
import {UpdateBlog} from './components/UpdateBlog';
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
