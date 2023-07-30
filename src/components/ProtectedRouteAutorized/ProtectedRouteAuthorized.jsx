import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useState } from 'react';

export function ProtectedRouteAuthorized({ children , path}) {

  const getAuth = (store) => (store.authorization);
  const data = useSelector(getAuth);

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
    <Route path={path}>
      {!data.currentUser ? children : <Redirect to='/' replace /> }
    </Route>
  )
}
