# Clean Code and Clean Architecture Course.

This documentation will be updated as the course and project progresses.

## What is this?

This is the repository for the course [Clean Code and Clean Architecture](http://app.branas.io).
Here, I will register my steps and progress in the course.

In this course, the instructor let the students free to use any language and framework they want. So expect to see some differences between some patterns and implementations from teacher's code, but always following Clean Code, Clean Architecture and TDD principles.

### Content:

In this project, the following topics will be covered:

- SOLID Principles;
- Separation of Concerns;
- Test Driven Development (TDD);
- YAGNI (You aren't gonna need it);
- DRY (Don't repeat yourself);
- Strongly Typed Code (Typescript);
- DDD (Domain Driven Design);
- Hexagonal Architecture;
- Microservices;
- REST API;
- Queueing;
- Message Broker;

### Technologies:

- NodeJS (16.x);
- Typescript;
- Postgres;
- Prisma;
- Vitest;
- Axios;
- Docker;
- GraphQL;
- Apollo Server;
- AMQPLib;
- RabbitMQ;
- Express;
- Supertest;

### TO DO:

You can see the TO DO list in [this file](./docs/to-do.md).

### How to run:

As you can see, we have some microservices in this project. So, to run the project, you will need to run each service separately. Each service has its own database, so you will need to run each database too.

You only need to have NodeJS, Docker and Docker Compose installed in your machine. Then, just run the following commands:

### Checkout Service:

The `Checkout` is the service responsible to handle the checkout process. It has all the `Order` logic.

- Run development database:

```bash
yarn db:dev:up
```

- Run development GraphQL server:

```bash
yarn dev:server
```

Your termal will show the GraphQL playground URL. Open it in your browser and start playing with the API. :smile:

### Catalog Service:

The `Catalog` is the service responsible to handle the products. It has all the `Item` logic.

- Run development database:

```bash
yarn db:dev:up
```

- Run development express server:

```bash
yarn dev:server
```

### Freight Service:

The `Freight` is the service responsible to handle the freight calculation. It has all the `Freight` logic.

- Run development database:

```bash
yarn db:dev:up
```

- Run development express server:

```bash
yarn dev:server
```

### Stock Service:

The `Stock` is the service responsible to handle the stock. It has all the `StockEntry` logic.

- Run development database:

```bash
yarn db:dev:up
```

- Run development express server:

```bash
yarn dev:server
```

---

Made with :heart: and hard work :hammer: by: João Pedro Araújo

[LinkedIn](https://www.linkedin.com/in/joaopedroasz/)

---

References:

- Teacher: Rodrigo Branas:

[WebSite](https://app.branas.io)
