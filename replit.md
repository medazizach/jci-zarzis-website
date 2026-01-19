# JCI Zarzis Website

## Overview

This is a modern multi-page French website for JCI Zarzis (Junior Chamber International, Zarzis Tunisia Chapter). The project is a full-stack web application featuring a React frontend with a contemporary design including glassmorphism effects, dynamic gradients, and smooth animations following JCI 2025/2026 brand guidelines, and an Express backend with in-memory storage.

The website is entirely in French and features five main pages:
- **Accueil (/)** - Homepage with hero section, values, featured projects, and CTA
- **À propos (/a-propos)** - About page with mission, values, timeline, and global network stats
- **Projets (/projets)** - Projects page with category filtering
- **Événements (/evenements)** - Events page with featured and upcoming events
- **Contact (/contact)** - Contact page with form and organization info

## Recent Changes

**January 2026**: 
- Converted from single-page landing to multi-page site with French content
- Modern glassmorphism design, enhanced animations, and active navigation states
- Modern floating navbar with centered navigation pill, rounded corners and blur effects
- Admin dashboard at `/jci-gestion-2026` with password authentication (ADMIN_PASSWORD env)
- Events and projects now fetch from API (admin-created content appears on public pages)
- Updated footer with real contact info: jeunechambrezarzis@gmail.com, Immeuble Majed address
- Social links: Facebook, Instagram, LinkedIn with real URLs

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, built using Vite
- **Routing**: Wouter (lightweight React router) with 5 pages
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom JCI brand colors (Primary: #0097D7, Dark: #130F2D)
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for section fade-ins, hero animations, and transitions
- **Typography**: Montserrat and Plus Jakarta Sans fonts (Google Fonts)
- **Design Features**: Glassmorphism cards, dynamic gradient backgrounds, animated hero section

### Page Structure
- `client/src/pages/Home.tsx` - Homepage with hero, values, featured projects
- `client/src/pages/About.tsx` - About page with mission, values grid, timeline
- `client/src/pages/Projects.tsx` - Projects with category filter from API
- `client/src/pages/Events.tsx` - Events with featured and upcoming sections
- `client/src/pages/Contact.tsx` - Contact form with react-hook-form validation

### Layout Components
- `client/src/components/Layout.tsx` - Shared layout wrapper
- `client/src/components/Header.tsx` - Fixed header with navigation and active states
- `client/src/components/Footer.tsx` - Footer with links and contact info

### Backend Architecture
- **Framework**: Express.js (v5) with TypeScript
- **Server**: HTTP server with development HMR support via Vite middleware
- **API Pattern**: RESTful endpoints under `/api/*` prefix
- **Build Process**: esbuild for server bundling, Vite for client bundling

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Tables**: users, projects, contact_submissions
- **Current Mode**: In-memory storage (`MemStorage`) with seeded sample projects

### API Endpoints
- `GET /api/projects` - Returns list of projects
- `POST /api/contact` - Submits contact form (name, email, message)

### Form Validation (French)
Contact form uses react-hook-form with zod validation:
- name: min 2 characters ("Le nom doit contenir au moins 2 caractères")
- email: valid email ("Veuillez entrer une adresse email valide")
- message: min 10 characters ("Le message doit contenir au moins 10 caractères")

### Translation Strategy
- Category translations stored in objects (e.g., "Education" → "Éducation")
- Status translations for projects ("completed" → "Terminé", "ongoing" → "En cours")
- All UI text in French

## External Dependencies

### Frontend Libraries
- **@tanstack/react-query**: Data fetching and caching
- **framer-motion**: Animation library
- **lucide-react**: Icon library
- **react-hook-form**: Form state management
- **wouter**: Client-side routing

### UI Framework
- **shadcn/ui**: Component library (new-york style variant)
- **Radix UI**: Accessible component primitives
- **class-variance-authority**: Component variant management
- **tailwind-merge**: Tailwind class merging utility

### Development Tools
- **Vite**: Development server and bundler
- **esbuild**: Production server bundling
- **drizzle-kit**: Database schema management
- **tsx**: TypeScript execution for development
