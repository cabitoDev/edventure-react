import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logoutSuccess } from '../redux/userSlice';
import { useNavigate } from "react-router-dom";
import { Button } from '@nextui-org/react' 


export const Login = () => {
    const navigateTo = useNavigate();
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const dispatch = useDispatch();
  
    React.useEffect(() => {
      if (isAuthenticated) {
        navigateTo(`/${user.nickname}`)
        dispatch(loginSuccess(user)); 
      } else { dispatch(logoutSuccess())}
    }, [isAuthenticated]);
  
    return <>
    <Button color="primary" onClick={()=> loginWithRedirect()}>Login</Button>
    this is the login page</>
}