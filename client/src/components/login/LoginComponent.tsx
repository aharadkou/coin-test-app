import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { TRANSACTIONS_URL, USER_INFO_URL } from '../../config';
import { navigateToLogin } from '../../helpers/common';

import './LoginComponent.css';

export function LoginComponent({setUserInfo}) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const applyDailyBonus = (token: string) => fetch(`${TRANSACTIONS_URL}/daily-bonus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  const getUserInfo = (token: string) => fetch(USER_INFO_URL, {
    headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
    },
  });

  useEffect(() => {
   const existingToken = localStorage.getItem('auth_token');

   const token = searchParams.get('token') ? decodeURIComponent(searchParams.get('token')) : existingToken;

   if (!token) {
    return navigateToLogin();
   }

   localStorage.setItem('auth_token', token);

   applyDailyBonus(token)
    .catch(() => navigateToLogin())
    .then(() => getUserInfo(token))
    .then(response => response.json())
    .then(responseJson => setUserInfo(responseJson))
    .then(() => navigate('/profile'))
  }, [setUserInfo, searchParams, navigate]);

  return (
    <>
      Redirecting you to the main app and applying your daily bonus...
    </>
  );
}