import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from '../../hooks';
import { useState } from 'react';
import { TProtectedRouteProps } from '../../types/types';

export const ProtectedRouteAuthorized: React.FC<TProtectedRouteProps> = ({ children, path }) => {

  const data = useSelector(store => store.authorization);
  const [isUserLoaded, setUserLoaded] = useState(true);

  React.useEffect(() => {
    setUserLoaded(true);
  }, []);

  React.useEffect(() => {
    if (data.getUserRequest === true) {
      setUserLoaded(true)
    }
    if (data.getUserRequest === false) {
      setUserLoaded(false)
    }
  }, [data])


  if (isUserLoaded) {
    return null;
  }

  return (
    <Route exact path={path}>
      {!data.currentUser ? children : <Redirect to='/' />}
    </Route>
  )
}
