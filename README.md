## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Testing flow
```
1. localhost:3000/users/new
{
  "email": "eric.kwong@gmail.com",
  "name": "Eric",
  "password": "12345678",
}

2. call same api again localhost:3000/users/new it should show error
{
  "email": "eric.kwong@gmail.com",
  "name": "Eric",
  "password": "12345678",
}

3. call localhost:3000/auth/logout
{
  "email": "eric.kwong@gmail.com",
  "name": "Eric",
  "password": "12345678",
}

4. call localhost:3000/users/new
{
  "email": "eric1234463@gmail.com",
  "name": "Eric",
  "password": "12345678",
  "role": "staff"
}

5. call localhost:3000/bank-account/me should show your bank account

6. localhost:3000/bank-account/:bankId/transactions/new - deposits money

{
    "from": null",
    "to": "bankId",
    "amount": 200
}

7. localhost:3000/bank-account/:bankId/transactions/new - withdraw money

{
    "from": "bankId",
    "to": null,
    "amount": 200
}

8. localhost:3000/bank-account/:bankId/transactions/new - transfer money to other account

{
    "from": "bankId",
    "to": "bankId",
    "amount": 200
}

9. localhost:3000/bank-account/:bankId/transactions/:id - update transactions

{
    "amount": 200
}

10. localhost:3000/bank-account/:bankId/transactions - view transactions -- with staff user

11. localhost:3000/bank-account/:bankId/transactions - view transactions -- with own user

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## API Docs
http://localhost:3000/api-documents/

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
