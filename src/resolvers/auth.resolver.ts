import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '../types/auth.types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string
  ): Promise<LoginResponse> {
    const user = await this.authService.validateUser(username, password);
    const token = this.authService.generateToken(user);
    return { token, user };
  }
}