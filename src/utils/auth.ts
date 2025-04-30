import jwt from 'jsonwebtoken';
import { User } from '../entities/user.entity';

export const generateToken = (user: User): string => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

export const authChecker = ({ context }: { context: Context }) => {
  return !!context.user;
};




// // src/utils/auth.ts
// import jwt from 'jsonwebtoken';
// import { User } from '../entities/user.entity';

// export const generateToken = (user: User): string => {
//   return jwt.sign(
//     { id: user.id, username: user.username },
//     process.env.JWT_SECRET!,
//     { expiresIn: '1h' }
//   );
// };

// export const verifyToken = (token: string): any => {
//   return jwt.verify(token, process.env.JWT_SECRET!);
// };