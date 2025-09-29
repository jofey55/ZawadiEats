# Zawadi Restaurant - Project Documentation

## Overview

Zawadi Restaurant is a full-stack web application built with React, Express, and PostgreSQL. The project features a modern restaurant website with a clean, component-based architecture using TypeScript throughout. It implements a monorepo structure with shared code between client and server, utilizing shadcn/ui components for a polished user interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack React Query for server state management and data fetching

**UI Component System**
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for styling with CSS variables for theming
- Component structure follows the "New York" style variant
- Custom design tokens defined in CSS variables for colors, spacing, and shadows
- Comprehensive UI component library including forms, dialogs, navigation, and data display components

**State Management Strategy**
- React Query for server state with custom query client configuration
- Local component state using React hooks
- Toast notifications for user feedback
- Custom hooks for mobile responsiveness detection

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- TypeScript for type safety across the backend
- ESM module system for modern JavaScript features
- Development mode using tsx for hot reloading

**Database Layer**
- Drizzle ORM for type-safe database operations
- PostgreSQL as the primary database (configured for Neon serverless)
- Schema-first approach with TypeScript type inference
- Database migrations managed through Drizzle Kit

**Data Models**
- User entity with username/password authentication fields
- UUID-based primary keys generated at database level
- Zod schemas for runtime validation derived from Drizzle schemas

**Storage Abstraction**
- Interface-based storage layer (IStorage) for data operations
- In-memory storage implementation (MemStorage) for development/testing
- Designed for easy swapping to database-backed implementation
- CRUD methods for user management

**API Architecture**
- RESTful API design with `/api` prefix convention
- Middleware for request logging with response time tracking
- JSON request/response handling with body parsing
- Raw body preservation for webhook/signature verification scenarios

### External Dependencies

**Core Runtime & Database**
- Node.js runtime environment
- PostgreSQL database (Neon serverless provider recommended)
- Environment variable `DATABASE_URL` required for database connection

**Development Tools**
- Vite development server with HMR
- Replit-specific plugins for development (cartographer, dev banner, runtime error overlay)
- TypeScript compiler for type checking
- ESBuild for production server bundling

**Frontend Libraries**
- React ecosystem: react, react-dom, react-router (wouter)
- TanStack React Query for data fetching
- Radix UI primitives for accessible components
- Tailwind CSS for styling utilities
- Class variance authority for component variant management
- Date-fns for date manipulation
- Lucide React for icons

**Backend Libraries**
- Express.js web framework
- Drizzle ORM with Neon serverless adapter
- Connect-pg-simple for PostgreSQL session storage
- Zod for schema validation
- Drizzle-zod for schema derivation

**UI Component Dependencies**
- Complete shadcn/ui component set including: accordion, alert, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command palette, context menu, dialog, drawer, dropdown menu, form, hover card, input (including OTP), label, menubar, navigation menu, pagination, popover, progress, radio group, resizable panels, scroll area, select, separator, sheet, sidebar, skeleton, slider, switch, table, tabs, textarea, toast, toggle, tooltip

**Build & Development**
- Vite plugins for React and development tooling
- PostCSS with Tailwind CSS and Autoprefixer
- TypeScript for type checking across the stack