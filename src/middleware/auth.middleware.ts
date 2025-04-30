import { Context } from '../types/context.types';
import { verifyToken } from '../utils/auth';
import { MiddlewareFn } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-express';

export const authMiddleware: MiddlewareFn<Context> = async ({ context }, next) => {
  const authHeader = context.token;
  if (!authHeader) {
    throw new AuthenticationError('No authentication token provided');
  }

  try {
    const decoded = verifyToken(authHeader.replace('Bearer ', ''));
    context.user = decoded;
    return next();
  } catch (error) {
    throw new AuthenticationError('Invalid or expired token');
  }
};