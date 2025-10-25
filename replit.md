# Zawadi Restaurant - Project Documentation

## Overview

Zawadi Restaurant is a full-stack website designed for online food ordering, focusing on pickup and integrated with third-party delivery services like Uber Eats and DoorDash. Built with React, Express, TypeScript, and PostgreSQL, the platform aims to provide a seamless online ordering experience, enhance customer engagement, and streamline restaurant operations through Toast POS integration. The project's vision is to increase direct online orders, reduce reliance on third-party commissions, and offer a comprehensive digital presence for the restaurant.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with **React 18** and **TypeScript**, using **Vite** for fast development and builds. **Wouter** handles client-side routing, while **Tailwind CSS** and **shadcn/ui** provide a consistent and responsive design, following a mobile-first approach. **TanStack Query** manages server state. Key features include a persistent shopping cart, form validation with **React Hook Form** and **Zod**, real-time price calculations, lazy loading for images, and **Google Analytics** integration. 

**Design Philosophy**: The UI/UX follows a hybrid design approach that combines a clean, minimal hero section with vibrant pastel menu cards. Design characteristics include:

**Hero Section (Minimal Design)**:
- Full-screen slideshow carousel with dark overlay
- Clean, simplified typography (text-4xl/5xl)
- Red "Order for Pickup" CTA and semi-transparent "View Menu" button
- White background with subtle gray borders for offer banner

**Menu Section (Pastel Card Design)**:
- **Color Palette**: Alternating pastel backgrounds (pink #FFE8F0, peach #FFF4E0, blue #E0F4FF)
- **Images**: Large circular food photos (160px diameter) with white backgrounds and shadows
- **Cards**: Rounded-3xl pastel cards with hover effects (scale 1.05 + shadow)
- **Interactive Elements**: Heart icon for favorites, green circular add-to-cart buttons (#6BBF59)
- **Discount Badges**: Random 10% or 15% off badges on select items
- **Typography**: Clean fonts with centered layout, 2-line description limit
- **Grid Layout**: Responsive 3-column grid (1 on mobile, 2 on tablet, 3 on desktop)

**Key Features**:
- Green primary color (#6BBF59) for CTAs and buttons
- Green border (#6BBF59) appears on menu cards on hover and click for visual feedback
- Smooth hover transitions with scale and shadow effects
- Each menu item maintains unique customization toppings functionality
- Mobile-first responsive design throughout
- **Pricing Update (October 2025)**: All menu prices reduced by 20%

### Backend Architecture

The backend uses **Express.js** with **TypeScript** to provide a comprehensive REST API. It includes an integration layer for the **Toast POS API**, ready for menu synchronization and order submission. **PostgreSQL** serves as the database, managed with **Drizzle ORM** for type-safe queries and automatic UUID generation. The system uses an in-memory storage fallback with a database backup strategy. Data flow involves frontend submissions via TanStack Query, Zod validation on the backend, and persistence through the storage layer, with optional Toast API integration.

### Core Features

-   **Online Ordering System**: Full shopping cart functionality, real-time subtotal/tax calculations, checkout flow, pickup time selection, special instructions, and order confirmation.
-   **Universal Item Ordering**: ALL menu items are clickable and orderable on BOTH homepage AND order page:
    -   **Simple items** (fries, plantains, sambusa, drinks): Click → Auto-add to cart → Merge by quantity when same item clicked multiple times
    -   **Customizable items** (bowls, quesadillas, loaded fries): Click → Open BowlCustomizer modal → Select toppings → Add to cart with unique ID → Never merge (each customization is unique)
    -   **Consistency**: Same functionality works identically on homepage and order page menu sections
    -   **Cart persistence**: Uses sessionStorage to transfer items from homepage to order page
    -   **Data integrity**: Customized items maintain unique identities with auto-generated IDs (timestamp + random string) to prevent merging
    -   **Menu Items**: Includes Grilled Chicken Bowl, Skirt Steak Bowl, Veggie Bowl, Fruit Bowl, all Quesadillas, Loaded Fries, and all simple items
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