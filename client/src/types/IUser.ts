import { ITransaction } from './ITransaction';
import { UserRole } from './UserRole';

export interface IUser {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  transactions?: ITransaction[];
  balance?: number;
};
