# Traver Pakistan - Premium Tour & Travel Booking Platform

A full-stack, production-minded travel agency web application built for tour operations in Pakistan. Inspired by modern travel UX, featuring warm sunset orange accents, rich northern Pakistan itineraries, authentic PKR pricing, Cloud Firestore data persistence, Google & Email Authentication, and WhatsApp-based booking automation.

## Features

### 1. Visual Identity & Landing Page
- Designed to mirror modern high-converting travel platforms with warm orange accents (`#ea580c`), deep navy, rounded pill inputs, and floating stat badges.
- **Hero Section**: Tagline, headline, responsive pill-style tour search form (Location, Party Size, Date), and multi-photo collage with trust badges.
- **Monthly Recommendations & About**: Stats overview (2,000+ Explorers, 100+ Destinations, 12+ Years Experience).
- **Features Section**: "Lots of Choices", "Best Tour Guide", "Easy Booking", and "24/7 WhatsApp Desk".
- **Top Destinations & Tour Cards**: Pakistan's premier circuits (Hunza, Skardu, Fairy Meadows, Swat, Naran, Neelum Valley, Lahore).

### 2. WhatsApp Tour Booking System
- Integrates with the official international `wa.me` standard.
- Formats structured booking enquiries containing:
  - Tour Title & Destination
  - Departure Date
  - Number of Travellers
  - Price per Person & Total PKR Quoted
  - Tour URL
  - Unique Booking Reference ID (`#ENQ-...`)
- Simultaneously logs the booking enquiry in Firestore with status `Pending` for agency tracking.

### 3. Dynamic Tour Listings & Filters (`/tours`)
- Real-time search by keyword, destination, and region.
- Duration filters (1-4 Days, 5-7 Days, 8+ Days).
- Real-time PKR budget slider.
- Sorting by featured, price (low/high), and duration.

### 4. Interactive Tour Details (`/tours/[slug]`)
- Multi-photo gallery preview.
- Quick specs (Duration, Difficulty, 4x4 Transport, Meeting Point).
- Day-by-day interactive itinerary with meals and accommodations.
- Included vs Excluded service checklists.
- Cancellation and road safety policies.
- Available departure dates with seat capacity indicators.
- Sticky WhatsApp booking card with live total calculation.

### 5. Authentication & Traveler Dashboard (`/dashboard`)
- Google Sign-In with Firebase Auth popup + Email/Password authentication.
- Traveler profile management (name, phone number).
- Real-time tracking of all submitted booking enquiries (`Pending`, `Contacted`, `Confirmed`, `Cancelled`).
- Direct WhatsApp link to resume agent conversation.

### 6. Role-Based Admin Dashboard (`/admin`)
- Accessible to authorized administrator (`dawoodahmed0175@gmail.com`) or users with admin role.
- Includes a reviewer demo toggle to inspect admin operations seamlessly.
- **Overview Metrics**: Total enquiries, pending inquiries, confirmed bookings, and total pipeline value in PKR.
- **Enquiry Management**: Change status (`Pending` -> `Contacted` -> `Confirmed` -> `Cancelled`), save internal notes, and open one-click WhatsApp message to the traveler.
- **Tour Management**: Create new tours, edit itineraries, toggle published status, delete tours, and re-seed sample Pakistani tours.
- **Contact Messages**: Review incoming inquiries from the contact form.
- **Agency Settings**: Configure the central WhatsApp business phone number.

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide Icons, Plus Jakarta Sans & Outfit fonts
- **Backend & Database**: Firebase Cloud Firestore
- **Authentication**: Firebase Authentication (Google Auth + Email/Password)
- **Deployment**: AI Studio / Cloud Run container on Port 3000

## Security Rules (`firestore.rules`)
- Attribute-Based Access Control (ABAC) and role verification.
- Default-deny catch-all with validation helpers.
- Unauthenticated travelers can submit enquiries and contact messages with strict input type and size bounds.
- Private enquiry and profile data is isolated to the owning traveler or verified administrator.
