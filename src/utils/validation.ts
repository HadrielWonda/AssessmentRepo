import { validate } from 'class-validator';
import { ApolloError } from 'apollo-server-express';

export const validateInput = async (input: object) => {
  const errors = await validate(input);
  if (errors.length > 0) {
    const message = errors
      .map((error) => error.constraints ? Object.values(error.constraints) : [])
      .join(', ');
    throw new ApolloError(message, 'BAD_REQUEST');
  }
};