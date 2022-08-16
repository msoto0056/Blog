import './App.css';
import ListBlog from './components/blog/ListBlogs';
import Posts from './components/blog/Posts';
import Post from './components/blog/Post';
import {AddBlog} from './components/blog/AddBlog';
import {UpdateBlog} from './components/blog/UpdateBlog';
import Login from './components/users/Login';
import Logout from './components/users/Logout';
import ResetPassword from './components/users/ResetPassword';
import Register from './components/users/Register';
import Settings from './components/webSite/settings';
import LocalSettings from './components/webSite/localSettings';
import AnyPage from './components/webSite/anyPage';
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
          <Route path='/updateBlog/:slug' element ={<UpdateBlog />} />
          <Route path='/settings' element ={<Settings />} />
          <Route path='/localSettings' element ={<LocalSettings />} />
          <Route path='/anyPage' element ={<AnyPage />} />
          <Route path='/resetPassw' element ={<ResetPassword />} />
      </Routes>
      <Footer/>
    </Router>
    <ReactQueryDevtools />
    </div>
  );
}

export default App;
