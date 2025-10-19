# Zawadi Restaurant - Project Documentation

## Overview

Zawadi Restaurant is a comprehensive full-stack restaurant website with online ordering capabilities, Toast POS integration, and conversion-optimized features. Built with React, Express, TypeScript, and PostgreSQL, the platform enables direct online ordering for pickup while maintaining integration with third-party delivery services (Uber Eats and DoorDash).

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (October 19, 2025)

**Major Platform Upgrade - Full Online Ordering System**

Transformed from a simple mobile-first funnel to a complete online ordering platform:

### Toast POS Integration
- Built complete Toast API integration infrastructure (`server/toast-api.ts`)
- Ready for Toast credentials (Client ID, Client Secret, Restaurant GUID from https://dev.toasttab.com/)
- Menu sync, pricing, and order submission capabilities
- Placeholder mode active until credentials are added via environment variables:
  - `TOAST_CLIENT_ID`
  - `TOAST_CLIENT_SECRET`
  - `TOAST_RESTAURANT_GUID`

### Online Ordering System
- Full shopping cart functionality with add/remove items
- Real-time subtotal, tax (7.875%), and total calculations
- Checkout flow with customer information capture
- Pickup time selection
- Special instructions field
- Order confirmation with unique order numbers
- Backend order storage and management

### Database Schema (PostgreSQL)
Created comprehensive schema for full platform functionality:
- `orders` - Customer orders with Toast integration
- `reviews` - Customer reviews and testimonials
- `catering_inquiries` - Catering booking requests
- `job_applications` - Employment applications
- `contact_messages` - Customer contact form submissions
- `feedback` - Customer feedback and ratings

All tables use `varchar` IDs with `gen_random_uuid()` for consistency.

### Homepage Enhancements
- **Special Offers Banner**: Prominent promo code display (First Order 10% Off - FIRST10)
- **Order Online Button**: Green gradient CTA in hero section
- **Customer Reviews Section**: Displays approved reviews with star ratings
- **FAQ Accordion**: 5 frequently asked questions with expandable answers
- **Social Media Integration**: Facebook and Instagram links in footer
- **SEO Optimization**: 
  - Meta tags and Open Graph tags for social sharing
  - Structured data (JSON-LD) for restaurant schema
  - Unique page titles and descriptions
- **Google Analytics**: Tracking script integrated (placeholder ID: G-XXXXXXXXXX)
- **Image Optimization**: Lazy loading for menu images, eager loading for hero

### Fully Functional Pages
All previously stubbed pages now have complete functionality:

**Catering Page (`/catering`)**
- Detailed catering services information
- Event space details
- Booking inquiry form with database storage
- Package pricing and menu options

**Feedback Page (`/feedback`)**
- Customer satisfaction survey
- 1-5 star rating system
- Detailed feedback form
- Database storage for feedback analysis

**Jobs Page (`/jobs`)**
- Open positions listing
- Position descriptions and requirements
- Online application form
- Resume/experience submission

**Contact Page (`/contact`)**
- Contact form with subject selection
- Interactive Google Maps embed
- Business hours display
- Phone, email, and address information

### Backend API Routes
- `POST /api/orders` - Submit pickup orders
- `GET /api/reviews` - Fetch approved reviews
- `POST /api/reviews` - Submit new review
- `POST /api/catering` - Submit catering inquiry
- `POST /api/feedback` - Submit feedback
- `POST /api/jobs` - Submit job application
- `POST /api/contact` - Submit contact message

### Storage Architecture
- Using in-memory storage (MemStorage) as primary with database backup
- All storage interfaces defined in `server/storage.ts`
- Type-safe CRUD operations using Drizzle schemas

## Previous Changes (October 5, 2025)

**Menu and Hours Updates**
- Updated operating hours: Mon-Thu 11:00 AM – 9:30 PM, Fri-Sun 11:00 AM – 11:00 PM
- Completely redesigned menu with photos next to each item
- Updated all menu prices to match physical store menu
- Added new menu categories: Favorites, Sides, Desserts, Beverages
- Enhanced menu visual design with gradient headers and hover effects

**Menu Pricing**
- Build-a-Bowl: Veggie Bowl $12.00, Chicken Bowl $13.00, Steak Bowl $15.75
- Quesadillas: Cheese $11.00, Chicken $12.25, Steak $15.00
- Favorites: Plantain Chips + Guac $6.95, Classic Sambusa (Beef) $2.55
- Sides: Seasoned Fries $6.00, Sweet Potato Fries $6.00, Plantains $6.25, Buffalo Cauliflower $7.25, Lentil Soup $8.00
- Desserts: Somali Donuts (5-piece) $7.25, Fruit Bowl $6.95, Monster Cookies $3.15-$7.47
- Beverages: House-made Drinks $3.95, Fountain Soda $1.75

## Project Structure

### Pages
- **Home (`/`)**: Full-featured homepage with hero, special offers, best sellers, menu, reviews, FAQ, location, social links
- **Order (`/order`)**: Complete online ordering system with cart and checkout
- **Contact (`/contact`)**: Contact form, map, hours, and business information
- **Jobs (`/jobs`)**: Career opportunities and application system
- **Feedback (`/feedback`)**: Customer feedback and rating system
- **Catering (`/catering`)**: Catering services and booking system

### Key Files
- `shared/schema.ts`: Database schema and Zod validation types
- `server/storage.ts`: Storage interface and implementations (MemStorage, DbStorage)
- `server/toast-api.ts`: Toast POS API integration
- `server/routes.ts`: API routes for all functionality
- `client/src/menu.json`: Static menu data with categories and items
- `client/src/pages/home.tsx`: Enhanced homepage with all features
- `client/src/pages/order.tsx`: Online ordering interface
- `client/public/images/`: Real restaurant photos

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- Tailwind CSS + shadcn/ui components for consistent design
- TanStack Query for server state management

**Key Features**
- Shopping cart with persistent state
- Form validation with React Hook Form + Zod
- Real-time price calculations
- Responsive mobile-first design
- Lazy loading images for performance
- Google Analytics event tracking
- SEO-optimized metadata

### Backend Architecture

**Server Framework**
- Express.js for HTTP server
- TypeScript for type safety
- Comprehensive REST API
- Toast POS integration layer
- Session management ready for future auth

**Database**
- PostgreSQL with Drizzle ORM
- Type-safe database queries
- Automatic UUID generation
- In-memory storage with database backup strategy

**Data Flow**
1. Frontend submits orders/forms via TanStack Query mutations
2. Backend validates with Zod schemas
3. Storage layer persists to memory + database
4. Toast API integration (when credentials configured)

### Contact Information

**Restaurant Details**
- Name: Zawadi Restaurant
- Address: 1701 American Blvd E, Suite 15, Bloomington, MN 55425
- Phone: (612) 284-0880
- Email: info@zawadirestaurant.com

**Hours of Operation**
- Monday - Thursday: 11:00 AM – 9:30 PM
- Friday - Sunday: 11:00 AM – 11:00 PM

### External Links
- Website: https://zawadirestaurant.com
- Facebook: https://www.facebook.com/zawadirestaurant
- Instagram: https://www.instagram.com/zawadirestaurant
- Uber Eats: https://ubereats.com/store/zawadi-restaurant-bloomington?utm_source=site
- DoorDash: https://www.doordash.com/store/zawadi-restaurant-bloomington?utm_source=site

## Configuration Setup

### Toast POS Credentials (Required for Production)
Add these environment variables in Replit Secrets:
```
TOAST_CLIENT_ID=your_client_id_here
TOAST_CLIENT_SECRET=your_client_secret_here
TOAST_RESTAURANT_GUID=your_restaurant_guid_here
```

Get credentials from: https://dev.toasttab.com/

### Google Analytics (Required for Production)
Replace placeholder in `client/index.html`:
- Change `G-XXXXXXXXXX` to your actual Google Analytics Measurement ID

### Database Migrations
Run schema changes with:
```bash
npm run db:push --force
```

## External Dependencies

**Core Runtime**
- Node.js 20.x runtime environment
- TypeScript for type checking across the stack

**Frontend Libraries**
- React ecosystem: react, react-dom, wouter
- UI: @radix-ui components, shadcn/ui, lucide-react, react-icons
- Forms: react-hook-form, @hookform/resolvers
- State: @tanstack/react-query
- Styling: Tailwind CSS, class-variance-authority, tailwind-merge
- Meta: react-helmet

**Backend Libraries**
- Express.js web framework
- Drizzle ORM with PostgreSQL
- Zod for schema validation
- Session: express-session, connect-pg-simple
- WebSocket: ws

**Build & Development**
- Vite with React plugin
- Replit-specific plugins for development
- drizzle-kit for database management
- tsx for TypeScript execution

## Development Workflow

**Local Development**
```bash
npm run dev  # Starts Express + Vite on port 5000
```

**Database Management**
```bash
npm run db:push --force  # Push schema changes to database
```

**Project is running at**: http://localhost:5000 or your Replit URL

## Next Steps for Production

1. **Add Toast POS Credentials**: Configure Toast API keys in Replit Secrets
2. **Configure Google Analytics**: Replace placeholder GA measurement ID
3. **Test Order Flow**: Submit test orders to verify Toast integration
4. **Review Management**: Set up process to approve/reject customer reviews
5. **Content Updates**: Add real customer testimonials to reviews table
6. **Social Media**: Verify Facebook and Instagram URLs are correct
7. **Testing**: Run comprehensive e2e tests on all features
8. **Performance**: Monitor and optimize image loading and API response times

## Notes

- Application uses in-memory storage by default for development
- Database is configured and ready for production use
- Toast integration works in placeholder mode until credentials are added
- All forms include proper validation and error handling
- Mobile-first responsive design throughout
- SEO-optimized with structured data and meta tags
- All interactive elements include proper ARIA labels and test IDs
