import './App.css';
import ListBlog from './components/blog/ListBlogs';
import Posts from './components/blog/Posts';
import Post from './components/blog/Post';
import {AddBlog} from './components/blog/AddBlog';
import {UpdateBlog} from './components/blog/UpdateBlog';
import Register from './components/users/Register';
import Login from './components/users/Login';
import Logout from './components/users/Logout';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import Header from './layout/Header';
import Footer from './layout/Footer';


// import About from './layout/About';

function App() {
 
  return (
    <div className="container">
      <Router>
        <Header title='BlogmeUp'/>
        <Routes>
          <Route exact path='/' element={<Posts  />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='/addBlog/' element= {<AddBlog />} />
          <Route path="/viewBlog/:slug" element ={<Post />}  />
          <Route Path='/updateBlog/:slug' element ={<UpdateBlog />} />
      </Routes>
      <Footer/>
    </Router>
    <ReactQueryDevtools />
    </div>
  );
}

export default App;
