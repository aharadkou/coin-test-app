import './HeaderComponent.css';
import user from '../../assets/user.svg';

import { navigateToLogin } from '../../helpers/common';
import { IUser } from '../../types/IUser';
import { invalidateToken } from '../../services/tokenService';

export function HeaderComponent({userInfo}: {userInfo: IUser}) {
  const handleLogout = () => {
    invalidateToken();
    navigateToLogin();
  }

  return (
    <header>
      <div className='user-info'>
        <img src={user} className="user-icon" alt="user" />
        {userInfo?.username}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
