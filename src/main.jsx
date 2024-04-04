import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Home } from "./routes/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { UserEvents } from "./routes/UserEvents.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { Settings } from "./routes/Settings.jsx";
import { KProvider } from "./components/Kbar/KProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
      <KProvider>
      <RouterProvider router={router} />
      </KProvider>
    </Provider>
    </ThemeProvider>
  </NextUIProvider>
);
