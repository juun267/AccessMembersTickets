# Event Ticketing System - Backend

A NestJS-based backend service for an event ticketing system that allows users to browse events and purchase tickets.

## Features

- GraphQL API for event and ticket management
- PostgreSQL database with TypeORM integration
- Real-time ticket availability tracking
- Order management system
- Automated test suite

## Tech Stack

- NestJS
- TypeORM
- PostgreSQL
- GraphQL (Apollo Server)
- TypeScript
- Jest (Testing)

## Project Structure

```
backend/
├── src/
│   ├── events/                 # Events module
│   │   ├── entities/          # Event entity definitions
│   │   ├── events.module.ts   # Events module configuration
│   │   ├── events.resolver.ts # GraphQL resolvers for events
│   │   ├── events.service.ts  # Business logic for events
│   │   └── events.service.spec.ts # Unit tests for events
│   ├── orders/                # Orders module
│   │   ├── entities/         # Order entity definitions
│   │   ├── orders.module.ts  # Orders module configuration
│   │   ├── orders.resolver.ts# GraphQL resolvers for orders
│   │   ├── orders.service.ts # Business logic for orders
│   │   └── orders.service.spec.ts # Unit tests for orders
│   ├── app.module.ts         # Main application module
│   └── main.ts              # Application entry point
├── test/                    # E2E tests
├── database/               # Database scripts
│   └── schema.sql         # Database schema and seed data
└── .env                   # Environment configuration
```

## Prerequisites

- Node.js (v18 or later)
- PostgreSQL (v14 or later)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=event_ticketing

# Server
PORT=3000
NODE_ENV=development
```

4. Set up the database:
```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE event_ticketing;
\q

# Run the schema
psql -U postgres -d event_ticketing -f database/schema.sql
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The server will be running at http://localhost:3000 with the GraphQL playground available at http://localhost:3000/graphql

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Generate test coverage report
npm run test:cov
```

## GraphQL API

### Queries

```graphql
# Get all events
query {
  events {
    id
    name
    description
    date
    totalTickets
    availableTickets
    price
    isSoldOut
  }
}

# Get single event
query {
  event(id: "event-id") {
    id
    name
    availableTickets
  }
}
```

### Mutations

```graphql
# Purchase tickets
mutation {
  purchaseTickets(
    eventId: "event-id"
    quantity: 2
  ) {
    id
    orderNumber
    quantity
    totalAmount
    status
  }
}
```

## Database Schema

### Events Table
- `id`: UUID (Primary Key)
- `name`: VARCHAR(255)
- `description`: TEXT
- `date`: TIMESTAMP
- `total_tickets`: INTEGER
- `available_tickets`: INTEGER
- `price`: DECIMAL(10,2)
- `is_sold_out`: BOOLEAN

### Orders Table
- `id`: UUID (Primary Key)
- `order_number`: VARCHAR(255)
- `event_id`: UUID (Foreign Key)
- `quantity`: INTEGER
- `total_amount`: DECIMAL(10,2)
- `status`: VARCHAR(50)

## Error Handling

The application includes comprehensive error handling for:
- Invalid input validation
- Database constraints
- Business logic violations (e.g., insufficient tickets)
- Network and system errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
