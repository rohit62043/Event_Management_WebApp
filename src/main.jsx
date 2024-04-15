import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './component/index.js'


import AddEvent from "./pages/AddEvent.jsx";
import Signup from './pages/Signup'
import EditEvent from "./pages/EditEvent.jsx";

import Post from "./pages/Post";

import AllEvent from "./pages/AllEvent.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-events",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllEvent />
          </AuthLayout>
        ),
      },
      {
        path: "/add-event",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddEvent />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-event/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditEvent />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)