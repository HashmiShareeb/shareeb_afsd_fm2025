# Facilities Management System

A full-stack application built with NestJS (API) and Vue.js (PWA) for managing building facilities, energy readings, maintenance reports, and cleaning rounds.

## Architecture

- **API**: NestJS with TypeScript, GraphQL, MongoDB/TypeORM
- **PWA**: Vue 3 with TypeScript, Vite, Apollo Client
- **Database**: MongoDB
- **Authentication**: Firebase Auth

## Development

### Prerequisites

- Node.js 18+
- npm 8+

### Installation

```bash
# Install root dependencies
npm install

# Install workspace dependencies (automatically installed)
# npm install --workspaces
```

### Development Scripts

```bash
# Start development servers
npm run -w api start:dev    # API server
npm run -w pwa dev          # PWA development server

# Build for production
npm run -w api build        # Build API
npm run -w pwa build        # Build PWA

# Testing
npm run -w api test         # Run API tests
npm run -w api test:e2e     # Run API E2E tests

# Linting and formatting
npm run -w api lint         # Lint API code
npm run -w pwa lint         # Lint PWA code
npm run format              # Format all code
```

## Code Standards

### Best Practices Implemented

1. **Error Handling**: Uses proper NestJS exceptions (`NotFoundException`, `BadRequestException`, etc.) instead of generic `Error`
2. **Code Quality**: ESLint + Prettier for consistent formatting
3. **Type Safety**: Full TypeScript usage with strict configuration
4. **GraphQL Organization**: Separate files for queries (`*.entity.ts`) and mutations (`*.mutations.ts`)
5. **No Console Logs**: Removed debug statements from production code
6. **Async Handling**: Proper handling of promises and async operations

### Project Structure

```
packages/
├── api/                    # NestJS API
│   ├── src/
│   │   ├── authentication/ # Firebase auth
│   │   ├── building/       # Building management
│   │   ├── energy-reading/ # Energy consumption tracking
│   │   ├── rounds/         # Cleaning rounds management
│   │   ├── user/           # User management
│   │   └── ...
│   └── test/               # E2E tests
├── pwa/                    # Vue.js PWA
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── composables/    # Vue composables
│   │   ├── graphql/        # GraphQL queries/mutations
│   │   ├── interfaces/     # TypeScript interfaces
│   │   └── views/          # Page components
│   └── ...
```

### GraphQL Conventions

- **Queries**: Defined in `*.entity.ts` files
- **Mutations**: Defined in `*.mutations.ts` files
- **Interfaces**: Defined in `interfaces/` directory with TypeScript types

### Testing

- **API**: Jest with proper mocking of repositories
- **PWA**: Vue Test Utils (setup available)

## Security

- Firebase Authentication integration
- Role-based access control (USER, MANAGER, ADMIN)
- Input validation using class-validator
- Security vulnerabilities automatically fixed

## Environment Setup

### PWA Environment Variables (.env.local)

```bash
VITE_FIREBASE_apiKey=your_api_key
VITE_FIREBASE_authDomain=your_auth_domain
VITE_FIREBASE_projectId=your_project_id
VITE_FIREBASE_storageBucket=your_storage_bucket
VITE_FIREBASE_messagingSenderId=your_messaging_sender_id
VITE_FIREBASE_appId=your_app_id
VITE_BACKEND_URL=http://localhost:3000
```

### API Environment Variables (.env)

```bash
GOOGLE_APPLICATION_CREDENTIALS=path/to/firebase-service-account-key.json
URL_FRONTEND=http://localhost:5173
DB_HOST=localhost
DB_PORT=27017
DB_NAME=facilities_management
```

## Test Accounts

| Role    | Email                 | Password    | Notes                            |
| ------- | --------------------- | ----------- | -------------------------------- |
| Admin   | docent@howest.be      | P@ssword123 | Full access                      |
| Manager | concierge@howest.be   | Conc123     | Can plan rounds & read meters    |
| User    | docent.user@gmail.com | docentUser  | Can report issues & see own data |

## Contributing

1. Follow the established code patterns
2. Write tests for new features
3. Use proper error handling with NestJS exceptions
4. Keep console.log statements out of production code
5. Maintain TypeScript strict mode compliance
6. Run linting before commits (handled by Husky)