# HomeBase - Affordable Housing & Relocation Platform

## Overview
A query-based web application similar to apartments.com for finding affordable housing and relocation resources. Users can search listings filtered by location, price, housing type, and amenities, with emphasis on affordable/HUD-supported/Section 8 housing. Includes a dedicated resources subpage for shelters, food banks, clothing, transportation, healthcare, and employment services.

## Current State
- Frontend prototype with React components: Header, Hero, SearchWidget, ListingCard, ResourceCard, ReviewCard, SimpleMap, ThemeToggle, EmailCaptureDialog
- Resources page at /resources with category filtering (shelter, food, clothing, transportation, healthcare, employment) and search
- Authentication fully wired with Replit Auth (OIDC) supporting Google, GitHub, X, Apple, email
- Login dialog is dismissible — users can browse without signing in
- PostgreSQL database with users and sessions tables

## Architecture

### Backend (Express)
- `server/index.ts` - Express app setup
- `server/routes.ts` - Route registration with auth setup
- `server/db.ts` - Database connection (Neon PostgreSQL)
- `server/storage.ts` - Re-exports auth storage
- `server/replit_integrations/auth/` - Replit Auth OIDC integration (DO NOT MODIFY)

### Frontend (React + Vite)
- `client/src/App.tsx` - Root app with routing (/, /resources)
- `client/src/pages/Home.tsx` - Main landing page with listings, resources preview, reviews, map
- `client/src/pages/Resources.tsx` - Dedicated resources page with category filters and search
- `client/src/components/` - UI components
- `client/src/hooks/use-auth.ts` - Auth state hook
- `client/src/lib/auth-utils.ts` - Auth error handling utilities

### Shared
- `shared/schema.ts` - Re-exports auth models
- `shared/models/auth.ts` - Drizzle schema for users/sessions tables

## Auth Flow
- Unauthenticated users see a dismissible login dialog over blurred content
- All login buttons redirect to `/api/login` (Replit OIDC)
- After auth, user is redirected back and dialog disappears
- Header shows user avatar, name, and logout button when authenticated
- Session stored in PostgreSQL via connect-pg-simple

## Design System
- Primary: Purple (280 65% 55%)
- Secondary: Teal
- Accent: Pink
- Font: Plus Jakarta Sans (headings)
- Dark mode support via ThemeToggle

## Resource Categories
- Shelter (emergency shelters, transitional housing)
- Food (food banks, meal programs, WIC)
- Clothing (donation centers, professional attire)
- Transportation (transit hubs, reduced fare programs)
- Healthcare (community clinics, free clinics, mental health)
- Employment (job centers, training programs)

## User Preferences
- Affordable housing focus (apartments.com-style for HUD/Section 8)
- Login modal hovers over blurred landing page (glassmorphism), dismissible
- Social login buttons (Google, GitHub, X, Apple, Email)
