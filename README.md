# AssessmentRepo
assessment


# Department Management API

## Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Create `.env` file using `.env.example`
4. Run migrations: `npm run migration:run`
5. Start server: `npm run dev`

## Example Queries
```graphql
mutation Login {
  login(username: "admin", password: "admin") {
    token
  }
}

mutation CreateDepartment {
  createDepartment(input: {
    name: "Finance",
    subDepartments: [{ name: "Accounts" }]
  }) {
    id
    name
    subDepartments { id name }
  }
}