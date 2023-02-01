import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import './LoginComponent.css';
import cat from '../../assets/cat.png';

import { navigateToLogin } from '../../helpers/common';
import { getUserInfo } from '../../services/authService';
import { applyDailyBonus } from '../../services/transactionService';
import { getToken, setToken } from '../../services/tokenService';

export function LoginComponent({setUserInfo}) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
   const existingToken = getToken();

   const token = searchParams.get('token') ? decodeURIComponent(searchParams.get('token')) : existingToken;

   if (!token) {
    return navigateToLogin();
   }

   setToken(token);

   applyDailyBonus()
    .catch(() => navigateToLogin())
    .then(() => getUserInfo())
    .then(userInfo => setUserInfo(userInfo))
    .then(() => navigate('/profile'))
  }, [setUserInfo, searchParams, navigate]);

  return (
    <div>
      <div className='message'>
        Redirecting you to the main app and applying your daily bonus...
      </div>
      <div>
        <img src={cat} alt="cat" />
      </div>
    </div>
  );
}