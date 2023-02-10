import React, { Suspense }  from 'react';
import ReactDOM from 'react-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import { GlobalProvider } from './context/GlobalStore';
import { BlogProvider } from './context/blogs/BlogStore';
import { UserProvider } from './context/users/UserStore';
import { QueryClientProvider, QueryClient } from "react-query";


//Enable Internalization
i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'es', 'fr','de','it','pt','ru'],
    fallbackLng: 'en',
    debug: false,
    // Options for language detector
    detection: {
      // order and from where user language should be detected
      order: ['path', 'cookie', 'htmlTag','querystring', 'localStorage', 'sessionStorage', 'navigator', 'subdomain'],
      caches: ['cookie'],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  })

const queryClient = new QueryClient();

const routing = (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <UserProvider>
          <BlogProvider>
            <Suspense fallback="...Language is loading">
              <App/>
            </Suspense>  
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
