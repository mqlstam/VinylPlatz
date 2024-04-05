# VinylPlatz

VinylPlatz is a full-stack web application built with Angular and NestJS, serving as an online marketplace for buying, selling, and reviewing vinyl records. The project is structured as a Nx Monorepo Workspace, allowing for efficient development and code organization.

## Features

- User authentication and registration
- Listing and browsing available vinyl records
- Detailed view of record information, including artist, genre, release date, and cover image
- Adding, editing, and deleting vinyl records (for authenticated users)
- Purchasing and selling vinyl records through transactions
- Rating and reviewing purchased vinyl records
- Filtering and sorting vinyl records based on various criteria
- Transaction history for users

## Technologies Used

- **Frontend**: Angular
- **Backend**: NestJS
- **Database**: MongoDB (with Mongoose ORM)
- **Authentication**: JSON Web Tokens (JWT)
- **Additional Libraries**: RxJS, Passport.js, Bcrypt, Class-Validator, Class-Transformer

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/mqlstam/vinylplatz/vinylplatz.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (e.g., JWT secret, database connection string).

4. Build the project:

```bash
nx build vinylplatz
```

5. Start the development servers:

   - To start the Angular development server:
     ```bash
     nx serve vinylplatz
     ```

   - To start the NestJS backend server:
     ```bash
     nx serve data-api
     ```

   Alternatively, you can start both the frontend and backend servers concurrently using:
   ```bash
   nx run-many --target=serve --projects=vinylplatz,data-api
   ```

## Build and Deploy

To build the project for production, run:

```bash
nx build vinylplatz
```

The built artifacts will be available in the `dist/apps/vinylplatz` directory.

## Testing

The project includes unit tests and end-to-end tests. To run the tests, use the following commands:

```bash
# Run unit tests
nx test vinylplatz

# Run e2e tests
nx e2e vinylplatz-e2e
```

## Contributing

Contributions to VinylPlatz are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).