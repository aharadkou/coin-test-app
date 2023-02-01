export interface ITransaction {
  id: string;
  type: TransactionType
  amount: number;
  dateIssued: string;
  userId: string;
};

export enum TransactionType {
  MANUAL = 'MANUAL',
  DAILY_BONUS = 'DAILY_BONUS',
}

export interface IUser {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  transactions?: ITransaction[]
};

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

declare global {
  namespace Express {
    export interface Request {
      loggedInUser?: IUser;
    }
  }
}