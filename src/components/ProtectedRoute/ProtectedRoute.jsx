import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from '../../services/actions/authorization';
import { useState } from 'react';


export function ProtectedRoute({ children , path }) {

  const dispatch = useDispatch();
  const { data } = useSelector(store => ({
    data: store.authorization
  }))

  const [isUserLoaded, setUserLoaded] = useState(true);

  React.useEffect(() => {
    setUserLoaded(true);
    dispatch(getUser);
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
      {data.currentUser ? children : <Redirect to={{ pathname: '/login', state: {path} }}/>}
    </Route>
  )
}
