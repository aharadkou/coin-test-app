import './UsersComponent.css';
import { IUser } from '../../types/IUser';
import plus from '../../assets/plus.svg';
import minus from '../../assets/minus.svg';
import coin from '../../assets/coin.svg';
import { useEffect, useState } from 'react';
import { TRANSACTIONS_URL, USERS_URL } from '../../config';
import { updateUserBalance, updateUsersBalance } from '../../helpers/userHelpers';

const BALANCE_DIFF = 1000;

export function UsersComponent({userInfo}: {userInfo: IUser}) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isRequestInProgress, setRequestInProgress] = useState(false);

  useEffect(() => {
    if (userInfo) {
      fetch(USERS_URL, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      })
      .then(usersResponse => usersResponse.json())
      .then((users: IUser[]) => {
        setUsers(updateUsersBalance(users))
      });
    }
   }, [userInfo]);

  const handleAddTransaction = async (user: IUser, amount: number) => {
    if (isRequestInProgress) {
      return;
    }

    setRequestInProgress(true);

    await fetch(TRANSACTIONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify({
        userId: user.id,
        amount,
      })
    })

    setUsers(updateUserBalance(users, user, amount));

    setRequestInProgress(false);
  }

  return (
    <div className='users-list'>
      <h2>Users</h2>
      <div className='row'>
        <div className='row-field'>Username</div>
        <div className='row-field'>Role</div>
        <div className='row-field'>Balance</div>
      </div>
      <div>
        {users.map(user => 
          <div className='row' key={user.id}>
            <div className='row-field'>
              {user.username}
            </div>
            <div className='row-field'>
              {user.role}
            </div>
            <div className='row-field'>
              { user.balance }
              <img src={coin} className='coin' alt='coin' />
              <div className='balance-controls'>
                <img src={plus} role='button' alt='balance-increase' onClick={() => handleAddTransaction(user, BALANCE_DIFF)} className={isRequestInProgress ? 'disabled' : null} />
                <img src={minus} role='button' alt='balance-decrease' onClick={() => handleAddTransaction(user, -BALANCE_DIFF)} className={isRequestInProgress ? 'disabled' : null}/>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
