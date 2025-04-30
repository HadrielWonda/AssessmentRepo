import { gql } from '@apollo/client';

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    getDepartments {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
`;

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($input: CreateDepartmentInput!) {
    createDepartment(input: $input) {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
`;