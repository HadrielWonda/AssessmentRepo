import { AppDataSource } from './data-source';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';

async function seed() {
  await AppDataSource.initialize();
  
  const userRepo = AppDataSource.getRepository(User);
  const admin = userRepo.create({
    username: 'admin',
    password: await argon2.hash('admin')
  });
  
  await userRepo.save(admin);
  console.log('Database seeded!');
}

seed().catch(console.error);