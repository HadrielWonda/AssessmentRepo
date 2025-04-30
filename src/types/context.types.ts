import { User } from "../entities/user.entity";

export interface UserPayload {
  id: number;
  username: string;
  iat?: number;
  exp?: number;
}

export type Context = {
  req: {
    headers: {
      authorization?: string;
    };
  };
  token?: string;
  user?: UserPayload;
};