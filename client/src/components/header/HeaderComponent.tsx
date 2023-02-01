import { navigateToLogin } from '../../helpers/common';
import './HeaderComponent.css';
import user from '../../assets/user.svg';
import { IUser } from '../../types/IUser';

export function HeaderComponent({userInfo}: {userInfo: IUser}) {
  const handleLogout = () => {
    localStorage.clear();
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
