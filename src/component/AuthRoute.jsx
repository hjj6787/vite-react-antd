import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function AuthRoute(props) {
  const location = useLocation();
  const isLogin = localStorage.getItem('isLogin');
  const currentPath = location.pathname;

  const condition = currentPath === '/login' && !isLogin;

  if (condition) {
    return props.children;
  }

  if (!isLogin) {
    return <Navigate to="/login" />;
  }
  return props.children;
}
