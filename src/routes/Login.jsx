import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const navigateTo = useNavigate();
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    const dispatch = useDispatch();
  
    React.useEffect(() => {
      if (isAuthenticated) {
        console.log(user)
        navigateTo(`/${user.nickname}`)
        dispatch(loginSuccess(user)); 
      }
    }, [isAuthenticated]);
  
    return <>
    <button onClick={()=> loginWithRedirect()}>Login</button>
    this is the login page</>
}