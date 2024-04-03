import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../redux/userSlice';
import { useAuth0 } from '@auth0/auth0-react';

export const Welcome = () => {
    const { logout, isAuthenticated, user } = useAuth0();
    const dispatch = useDispatch();
  
    React.useEffect(() => {
      if (isAuthenticated) {
        console.log(user)
      } else {
        dispatch(logoutSuccess()); 
      }
    }, [isAuthenticated]);
  
    return <>
    <button onClick={()=> logout({ returnTo: window.location.origin })}>Logout</button>
   <h1>Welcome {user.given_name}</h1></>
}