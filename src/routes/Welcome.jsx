import React from "react";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/userSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { useLoaderData } from "react-router-dom";

export const Welcome = () => {
  const user = useLoaderData();
  const { logout } = useAuth0();
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem("userLogged");
    dispatch(logoutSuccess());
    logout({ returnTo: window.location.origin })
  }

  return (
    <>
      <button onClick={handleLogout}>
        Logout
      </button>
      <h1>Welcome {user.given_name}</h1>
    </>
  );
};
