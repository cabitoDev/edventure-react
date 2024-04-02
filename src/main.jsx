import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Login } from "./routes/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';

const domain = 'dev-9bbt1y5j.us.auth0.com'
const clientId = '1gemzxvcpddr2gAfGUrbdR4kfqkiWI4Y'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{
    redirect_uri: window.location.origin
  }}>
  <RouterProvider router={router}  />
  </Auth0Provider>
);
