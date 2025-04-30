import { validate } from 'class-validator';
import { BadRequestError } from 'apollo-server-express';

export const validateInput = async (input: object) => {
  const errors = await validate(input);
  if (errors.length > 0) {
    const message = errors
      .map((error) => Object.values(error.constraints))
      .join(', ');
    throw new BadRequestError(message);
  }
};