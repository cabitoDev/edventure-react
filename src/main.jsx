import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Login } from "./routes/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import { store } from "./redux/store.js";
import { UserEvents } from "./routes/UserEvents.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

const pro = window.location.origin.includes("myedventure.netlify.app");
const domain = pro ? "dev-9bbt1y5j.us.auth0.com" : "dev-9bbt1y5j.us.auth0.com";
const clientId = pro
  ? "5gpAXndTBJpbEj4PbW8apKvpKe52XnYP"
  : "1gemzxvcpddr2gAfGUrbdR4kfqkiWI4Y";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/:user",
    element: <UserEvents />,
    loader: () => {
      
      return JSON.parse(window.localStorage.getItem("userLogged"));
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <ThemeProvider  attribute="class" defaultTheme="dark">
    <Provider store={store}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </Provider>
    </ThemeProvider>
  </NextUIProvider>
);
