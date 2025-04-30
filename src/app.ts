import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { AuthResolver } from './resolvers/auth.resolver';
import { DepartmentResolver } from './resolvers/department.resolver';
import { SubDepartmentResolver } from './resolvers/sub-department.resolver';
import { authChecker } from './utils/auth';

export async function createServer() {
  const schema = await buildSchema({
    resolvers: [AuthResolver, DepartmentResolver, SubDepartmentResolver],
    authChecker,
    validate: { forbidUnknownValues: false },
  });

  const server = new ApolloServer({
    schema,
    introspection: process.env.NODE_ENV !== 'production',
  });

  await server.start();
  return server;
}