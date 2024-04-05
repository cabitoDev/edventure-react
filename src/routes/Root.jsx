import React from "react";
import { NavBar } from "../components/Navbar/NavBar";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";

import { KProvider } from "../components/Kbar/KProvider";
import { Kactions } from "../components/Kbar/Kactions";

export const Root = () => {
  const navigateTo = useNavigate();

  const actions = Kactions.map((action) => {
    return {
      id: action.id,
      name: action.name,
      shortcut: action.shortcut,
      keywords: action.keywords,
      perform: () => navigateTo(action.route),
    };
  });
  return (
    <>
      <KProvider actions={actions}>
        <NavBar />
        <Outlet />
      </KProvider>
    </>
  );
};
