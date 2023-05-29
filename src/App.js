import React, {useEffect} from 'react';
import './App.css';
import ListBlog from './components/blog/ListBlogs';
import Posts from './components/blog/Posts';
import Post from './components/blog/Post';
import Products from './components/eCommerce/Products';
import Product from './components/eCommerce/Product';
import {AddBlog} from './components/blog/AddBlog';
import {UpdateBlog} from './components/blog/UpdateBlog';
import Login from './components/users/Login';
import Logout from './components/users/Logout';
import ResetPassword from './components/users/ResetPassword';
import Register from './components/users/Register';
import Settings from './components/webSite/settings';
import LocalSettings from './components/webSite/localSettings';
import AnyPage from './components/webSite/anyPage';
import Cart from './components/eCommerce/Cart';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from './layout';
import Maps from './components/map/Maps'
import {Mapa} from './components/map/Mapa';
import {Mapita} from './components/map/Mapita';
import D3GlobeMap from './components/map/D3GlobeMap';
import { useProductState } from "./context/eCommerce/ProductStore";
import { InitialDataLoad } from './context/GlobalStore';



// import About from './layout/About';

function App() {

  const [{urlPromo:url}, dispatch] = useProductState();

  useEffect(() => {
    document.title = "Web Site - Home";
    //load promotions 
    InitialDataLoad({url, dispatch});
  }, [url, dispatch]);

  return (
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
            <Route path='/Products' element={<Products  />} />
            <Route path="/viewProduct/:slug" element ={<Product />}  />
            <Route path='/settings' element ={<Settings />} />
            <Route path='/localSettings' element ={<LocalSettings />} />
            <Route path='/anyPage' element ={<AnyPage />} />
            <Route path='/resetPassw' element ={<ResetPassword />} />
            <Route exact path='/map' element= {<Maps />} />
            <Route exact path='/mapa' element= {<Mapa />} />
            <Route exact path='/mapita' element= {<Mapita />} />
            <Route exact path='/d3GlobeMap' element= {<D3GlobeMap />} />
          </Routes>
          <Cart />
      </Layout>
      <ReactQueryDevtools/>
    </Router>

  );
}

export default App;
