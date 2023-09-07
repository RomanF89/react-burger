import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useState } from 'react';


export function ProtectedRoute({ children , path }) {

  const getAuth = (store) => (store.authorization);
  const data = useSelector(getAuth);

  const [isUserLoading, setUserLoading] = useState(true);

  React.useEffect(() => {
    setUserLoading(true);
  }, []);

  React.useEffect(() => {
    if (data.getUserRequest === true) {
      setUserLoading(true)
    }
    if (data.getUserRequest === false) {
      setUserLoading(false)
    }
  }, [data])

  if (isUserLoading) {
    return null;
  }

  return (
    <Route path={path}>
      {data.currentUser ? children : <Redirect to={{ pathname: '/login', state: {path} }}/>}
    </Route>
  )
}
