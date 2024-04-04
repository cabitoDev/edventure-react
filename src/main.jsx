import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Login } from "./routes/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { UserEvents } from "./routes/UserEvents.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { Settings } from "./routes/Settings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/:user/settings",
    element: <Settings />,
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
      
        <RouterProvider router={router} />
    </Provider>
    </ThemeProvider>
  </NextUIProvider>
);
