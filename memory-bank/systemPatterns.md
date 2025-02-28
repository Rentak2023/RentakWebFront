# System Patterns

## Architecture

- Next.js application with App Router
- TypeScript for type safety
- Component-based UI architecture
- Internationalization support through locale-based routing

## Key Technical Decisions

1. Using Next.js for server-side rendering and static generation
2. TypeScript for improved developer experience and code quality
3. Modular component structure for maintainability
4. Separation of concerns with dedicated directories for:
   - Components
   - Services
   - Queries
   - Schemas
5. Integration with Sentry for error tracking

## Component Relationships

- App layout handles global structure and routing
- Pages are organized by locale and user roles
- UI components are reusable across different pages
- Services handle API communication
- Queries manage data fetching logic
