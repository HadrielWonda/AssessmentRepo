import { User } from '../entities/user.entity';
import { AppDataSource } from '../data-source';
import { generateToken } from '../utils/auth';
import * as argon2 from 'argon2';
import { AuthenticationError } from 'apollo-server-express';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    
    if (!user || !(await argon2.verify(user.password, password))) {
      throw new AuthenticationError('Invalid credentials');
    }

    return user;
  }

  generateToken(user: User): string {
    return generateToken(user);
  }
}