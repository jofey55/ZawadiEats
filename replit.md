# Zawadi Restaurant - Project Documentation

## Overview

Zawadi Restaurant is a full-stack website designed for online food ordering, focusing on pickup and integrated with third-party delivery services like Uber Eats and DoorDash. Built with React, Express, TypeScript, and PostgreSQL, the platform aims to provide a seamless online ordering experience, enhance customer engagement, and streamline restaurant operations through Toast POS integration. The project's vision is to increase direct online orders, reduce reliance on third-party commissions, and offer a comprehensive digital presence for the restaurant.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with **React 18** and **TypeScript**, using **Vite** for fast development and builds. **Wouter** handles client-side routing, while **Tailwind CSS** and **shadcn/ui** provide a consistent and responsive design, following a mobile-first approach. **TanStack Query** manages server state. Key features include a persistent shopping cart, form validation with **React Hook Form** and **Zod**, real-time price calculations, lazy loading for images, and **Google Analytics** integration. 

**Design Philosophy**: The UI/UX follows a clean, minimal Apple-inspired aesthetic with mostly white backgrounds, subtle red and green accents, and no heavy gradients or blur effects. Design characteristics include:
- **Color Palette**: Primarily white and light gray (gray-50) backgrounds with minimal use of red-500 and green-600 for accents
- **Typography**: Simplified, clean fonts with medium/light weights (text-4xl/5xl for hero, text-3xl for sections)
- **Cards**: Clean white cards with subtle gray borders, no heavy shadows
- **Buttons**: Solid colors with rounded-full corners, no gradients
- **Menu Items**: Small 80px thumbnail images for a lightweight, card-based layout
- **Spacing**: Generous white space throughout for a clean, uncluttered appearance
- **Hero Section**: Slideshow carousel with minimalist overlay, simplified typography, and clean CTAs

### Backend Architecture

The backend uses **Express.js** with **TypeScript** to provide a comprehensive REST API. It includes an integration layer for the **Toast POS API**, ready for menu synchronization and order submission. **PostgreSQL** serves as the database, managed with **Drizzle ORM** for type-safe queries and automatic UUID generation. The system uses an in-memory storage fallback with a database backup strategy. Data flow involves frontend submissions via TanStack Query, Zod validation on the backend, and persistence through the storage layer, with optional Toast API integration.

### Core Features

-   **Online Ordering System**: Full shopping cart functionality, real-time subtotal/tax calculations, checkout flow, pickup time selection, special instructions, and order confirmation.
-   **Toast POS Integration**: Infrastructure for menu sync, pricing, and order submission.
-   **Comprehensive Database Schema**: Tables for orders, reviews, catering inquiries, job applications, contact messages, and feedback.
-   **Dynamic Content Pages**: Fully functional pages for Catering, Feedback, Jobs, and Contact with forms and data storage.
-   **Homepage Enhancements**: Special offers banner, prominent "Order Online" CTA, customer reviews section, FAQ accordion, and social media integration.
-   **SEO Optimization**: Meta tags, Open Graph tags, structured data (JSON-LD), unique page titles, and descriptions.
-   **API Routes**: Dedicated endpoints for submitting orders, reviews, catering inquiries, feedback, job applications, and contact messages.

## External Dependencies

-   **Runtime**: Node.js 20.x
-   **Database**: PostgreSQL
-   **Frontend Libraries**: React, React-DOM, Wouter, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod, Embla Carousel.
-   **Backend Libraries**: Express.js, Drizzle ORM, Zod, Express-Session, Connect-PG-Simple.
-   **Third-Party Services**:
    -   **Toast POS**: For restaurant management and order processing.
    -   **Uber Eats & DoorDash**: Integrated for menu synchronization and external delivery services.
    -   **Google Analytics**: For website traffic and user behavior tracking.
    -   **Google Maps Embed**: On the contact page.
-   **Development Tools**: Vite, Drizzle-Kit, TSX.