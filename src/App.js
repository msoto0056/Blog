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
import Layout from './layout/Layout';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Maps from './components/map/Maps'
import {Mapa} from './components/map/Mapa';
import {Mapita} from './components/map/Mapita';
import D3_GlobeMap from './components/map/D3_GlobeMap';


// import About from './layout/About';

function App() {
 
  return (
    <div >
      <Router>
        <Layout>  
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
            <Route exact path='/map' element= {<Maps />} />
            <Route exact path='/mapa' element= {<Mapa />} />
            <Route exact path='/mapita' element= {<Mapita />} />
            <Route exact path='/d3GlobeMap' element= {<D3_GlobeMap />} />
          </Routes>
      </Layout>
    </Router>
    {/* <ReactQueryDevtools /> */}
    </div>
  );
}

export default App;
