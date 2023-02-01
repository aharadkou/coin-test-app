import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileComponent.css';

import { IUser } from '../../types/IUser';
import { UserRole } from '../../types/UserRole';
import { TransactionsComponent } from '../transactions/TransactionsComponent';
import { UsersComponent } from '../users/UsersComponent';

export function ProfileComponent({userInfo}: {userInfo: IUser}) {

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      return navigate('/');
    }
   }, [userInfo, navigate]);

   return (
    <div className='profile-wrapper'>
      <TransactionsComponent userInfo={userInfo}/>
      {
        userInfo?.role === UserRole.ADMIN &&
        <UsersComponent userInfo={userInfo}/>
      }
    </div>
  );
}