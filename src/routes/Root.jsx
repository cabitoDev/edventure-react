import React from 'react'
import { NavBar } from '../components/Navbar/NavBar'
import { Outlet } from 'react-router'

export const Root = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}
