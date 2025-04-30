import { User } from '../entities/user.entity';

export type Context = {
  token?: string;
  user?: {
    id: number;
    username: string;
  };
};

export class LoginResponse {
  token!: string;
  user!: User;
}