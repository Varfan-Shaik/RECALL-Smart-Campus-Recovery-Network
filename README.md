# RECALL — Smart Campus Recovery Network

RECALL is a React-based smart campus lost-and-found recovery platform designed to connect lost and found reports, identify possible recovery matches, verify ownership signals, and track recovery cases.

## Project Objective

The objective of RECALL is to provide a structured digital recovery network for campus communities. Users can report lost or found items, browse recovery cases, inspect item details, save favorites, track recently viewed records, and manage recovery preferences.

## Features

- User registration and login
- Protected dashboard routes
- Lost and found item reporting
- Dynamic Recovery ID generation
- Dynamic recovery reports
- Search, filter and sort functionality
- Dynamic report details pages
- Smart recovery match engine
- Ownership verification workflow
- Campus hotspot insights
- Favorites using Local Storage
- Recently viewed recovery cases
- User profile management
- Recovery preference settings
- Campus recovery safety protocol
- Live campus condition API signal
- Loading and API error states
- Custom 404 page
- Responsive RECALL interface

## React Concepts Implemented

- React Functional Components
- JSX
- Props
- Reusable Components
- useState
- useEffect
- Controlled Components
- Event Handling
- Form Validation
- Conditional Rendering
- Ternary Operator
- Logical AND Rendering
- Dynamic Lists using map()
- Unique key Props
- React Router DOM
- BrowserRouter
- Routes and Route
- Link and NavLink
- useNavigate
- useParams
- Dynamic Routing
- Route Parameters
- Nested Routes
- Layout Routes
- Protected Routes
- Wildcard Route
- Local Storage
- Fetch API
- Loading State Management
- Error Handling

## Data Fetching

RECALL fetches recovery guidance from a local JSON data source using the JavaScript Fetch API.

The data is retrieved inside the React useEffect hook and displayed dynamically using map().

The dashboard also demonstrates loading state management and graceful fetch error handling.

## Local Storage

RECALL uses browser Local Storage to persist application data after page refresh.

Stored data includes:

- Registered users
- Current logged-in user
- Recovery reports
- Favorite reports
- Recently viewed reports
- Recovery settings
- Ownership claim signals

## Dynamic Routing

Each recovery report has a dedicated dynamic details page.

Example:

`/items/RCL-2026-0017`

The recovery ID is passed through the URL and retrieved using `useParams()`.

## Project Structure

```text
src/
├── components/
├── data/
├── layouts/
├── pages/
├── utils/
├── App.jsx
├── index.css
└── main.jsx