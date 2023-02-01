import { useEffect, useState } from 'react';

import { IUser } from '../../types/IUser';
import './TransactionsComponent.css';
import coin from '../../assets/coin.svg';
import { findLastBonusTransaction, getTransactionAmountSum } from '../../helpers/transactionHelpers';
import { getNextDayTimestamp } from '../../helpers/dateHelpers';
import { ITransaction } from '../../types/ITransaction';

const COUNTDOWN_INTERVAL_MS = 1000;

export function TransactionsComponent({userInfo}: {userInfo: IUser}) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [newBonusTimestamp, setNewBonusTimestamp] = useState(0);
  const [secToNewBonus, setSecToNewBonus] = useState(0);

  const setTimestampOfNewBonus = (transactions: ITransaction[]): void => {
    const lastBonusTransaction = findLastBonusTransaction(transactions);

    const nextDayTimestamp = getNextDayTimestamp(lastBonusTransaction.dateIssued);

    setNewBonusTimestamp(nextDayTimestamp);
  }

  useEffect(() => {
    if (userInfo) {
      setTransactions(userInfo.transactions);
      userInfo.balance = getTransactionAmountSum(userInfo.transactions);
      setTimestampOfNewBonus(userInfo.transactions);
    }
   }, [userInfo]);


  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.round((newBonusTimestamp - new Date().getTime()) / COUNTDOWN_INTERVAL_MS);
      setSecToNewBonus(diff > 0 ? diff : 0);
    }, COUNTDOWN_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [newBonusTimestamp]);

  return (
    <div className='list'>
    <h2>Your transactions</h2>
    <div className='row'>
        <div className='row-field'>Cash flow</div>
        <div className='row-field'>Date of transaction</div>
        <div className='row-field'>Source</div>
    </div>
    <div>
      {transactions.map(transaction => 
        <div className='row' key={transaction.id}>
          <div className='row-field'>
            {transaction.amount > 0 ?
              <div className='profit'>+{transaction.amount}</div> :
              <div className='loss'>{transaction.amount}</div>
            }
            <img src={coin} className="coin" alt="coin" />
          </div>
          <div className='row-field'>{transaction.dateIssued}</div>
          <div className='row-field'>{transaction.type === 'DAILY_BONUS' ? 'Daily bonus' : 'Gift from admin'}</div>
        </div>
      )}
    </div>
    <div className='transaction-info'>
      <label className='total-amount'>
        Balance: {userInfo?.balance} <img src={coin} className="coin" alt="coin" />
      </label>
      <label>Next bonus in {secToNewBonus} seconds</label>
    </div>
  </div>
  );
}
