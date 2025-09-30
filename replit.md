# Zawadi Restaurant - Project Documentation

## Overview

Zawadi Restaurant is a mobile-first one-page funnel website designed to direct visitors to third-party delivery services (Uber Eats and DoorDash). Built with React, Express, and TypeScript, the site features fast loading, optimized images, and thumb-friendly buttons for mobile users. The project emphasizes simplicity and conversion optimization over comprehensive features.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (September 30, 2025)

**Major Pivot: Comprehensive Site → Mobile-First Funnel**
- Removed internal online ordering system and database infrastructure
- Replaced comprehensive multi-section site with simple one-page funnel
- Integrated real restaurant photos replacing stock images
- Added delivery platform CTAs (Uber Eats/DoorDash) throughout the site
- Created stub pages for Contact, Jobs, Feedback, and Catering

## Project Structure

### Pages
- **Home (`/`)**: One-page funnel with hero, best sellers, menu, contact/catering sections
- **Contact (`/contact`)**: Contact information and map
- **Jobs (`/jobs`)**: Careers and employment information
- **Feedback (`/feedback`)**: Customer feedback form
- **Catering (`/catering`)**: Catering services and event space information

### Key Files
- `client/src/menu.json`: Static menu data with categories and items
- `public/images/`: Real restaurant photos (hero.jpg, gallery-1.jpg through gallery-5.jpg)
- `client/src/pages/home.tsx`: Main funnel page
- `client/src/App.tsx`: Route configuration

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- Tailwind CSS for styling

**Content Strategy**
- Static JSON menu data (`menu.json`) instead of database-driven content
- Real restaurant photos optimized for web
- Mobile-first responsive design
- Conversion-focused layout with delivery CTAs

**Key Features**
- Dynamic timezone-aware hours display (America/Chicago)
- Click-to-call phone links: (612) 284-0880
- Click-to-email links: info@zawadirestaurant.com
- Embedded Google Maps
- Uber Eats and DoorDash integration with UTM tracking

### Backend Architecture

**Server Framework**
- Express.js for HTTP server
- TypeScript for type safety
- Minimal API surface (health check endpoint only)
- Static file serving via Vite

**Database**
- PostgreSQL connection available but not actively used
- Minimal schema (users table only for future auth if needed)
- No ordering/menu database infrastructure

### Contact Information

**Restaurant Details**
- Address: 1701 American Blvd E, Suite 15, Bloomington, MN 55425
- Phone: (612) 284-0880
- Email: info@zawadirestaurant.com

**Hours of Operation**
- Monday - Saturday: 11:00 AM – 9:00 PM
- Sunday: 12:00 PM – 7:00 PM

### External Links
- Uber Eats: https://ubereats.com/store/zawadi-restaurant-bloomington?utm_source=site
- DoorDash: https://www.doordash.com/store/zawadi-restaurant-bloomington?utm_source=site

### External Dependencies

**Core Runtime**
- Node.js runtime environment
- TypeScript for type checking across the stack

**Frontend Libraries**
- React ecosystem: react, react-dom, wouter
- Tailwind CSS for styling utilities
- Date-fns for date manipulation (timezone handling)

**Backend Libraries**
- Express.js web framework
- Drizzle ORM (minimal usage)
- Zod for schema validation

**Build & Development**
- Vite development server with HMR
- Replit-specific plugins for development
- ESBuild for production server bundling