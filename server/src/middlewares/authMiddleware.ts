import { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';

import { AUTH_APP_API_URL } from '../core/constants';

export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  try {
    const userInfoResponse = await fetch(`${AUTH_APP_API_URL}/api/auth/user-info`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      }
    });
    
    request.loggedInUser = await userInfoResponse.json();

    next();
  } catch(err) {
    response.status(401).send({error: 'Unauthorized'});
  }
}
