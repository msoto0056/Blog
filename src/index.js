import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import {GlobalProvider} from './context/GlobalStore';
import {BlogProvider} from './context/blogs/BlogStore';
import { UserProvider } from './context/users/UserStore';
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const routing = (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <UserProvider>
          <BlogProvider>
            <App/>
          </BlogProvider>
        </UserProvider>
      </GlobalProvider>
  </QueryClientProvider>
  </React.StrictMode>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
