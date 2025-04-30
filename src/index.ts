import 'reflect-metadata';
import { config } from 'dotenv';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import cors from 'cors';
import { AppDataSource } from './data-source';
import { createServer } from './app';
import { authMiddleware } from './middleware/auth.middleware';

config();

async function bootstrap() {
  // Initialize database
  await AppDataSource.initialize()
    .then(() => console.log('Database connected'))
    .catch((error) => console.log('Database connection error:', error));

  // Create Express and Apollo Server
  const app = express();
  const server = await createServer();
  
  // Apply middleware
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.authorization }),
    })
  );

  // Start server
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/graphql`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});