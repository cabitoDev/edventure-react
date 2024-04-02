import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logoutSuccess } from '../redux/userSlice';
export const Login = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    const dispatch = useDispatch();
  
    React.useEffect(() => {
      if (isAuthenticated) {
        console.log(user)
        dispatch(loginSuccess(user)); 
      } else {
        dispatch(logoutSuccess()); 
      }
    }, [isAuthenticated, user]);
  
    return <>
    <button onClick={()=> loginWithRedirect()}>Login</button>
    <button onClick={()=> logout()}>Logout</button>
    this is the login page</>
}