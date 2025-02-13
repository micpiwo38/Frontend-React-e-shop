import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Products from './components/Products/Products';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import "bootswatch/dist/lux/bootstrap.css";
import Home from './components/Home/Home';
import PageNotFound from './components/PageNotFound/PageNotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <PageNotFound/>
  },
  {
    path: "/accueil",
    element: <Home/>,
    errorElement: <PageNotFound/>
  },
  {
    path: "/produits",
    element: <Products/>,
    errorElement: <PageNotFound/>
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
