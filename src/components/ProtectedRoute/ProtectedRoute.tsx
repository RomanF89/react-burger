import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from '../../hooks';
import { useState } from 'react';
import { TProtectedRouteProps } from '../../types/types';



export const ProtectedRoute: React.FC<TProtectedRouteProps> = ({ children, path }) => {
  const data = useSelector(store => store.authorization);

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
    <Route exact path={path}>
      {data.currentUser ? children : <Redirect to={{ pathname: '/login', state: { path } }} />}
    </Route>
  )
}
