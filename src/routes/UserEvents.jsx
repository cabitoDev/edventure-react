import React from "react";
import { useDispatch } from "react-redux";
import { useLoaderData, Link } from "react-router-dom";
import { NavBar } from "../components/Navbar/NavBar";
import { Button } from '@nextui-org/react' 
import "../index.css"

export const UserEvents = () => {
  const user = useLoaderData();
  const dispatch = useDispatch();

  

  return (
    <>
    <NavBar/>
    </>
  );
};
