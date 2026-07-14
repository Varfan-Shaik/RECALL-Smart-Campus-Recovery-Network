# RECALL - Smart Campus Recovery Network

RECALL is a React-based smart campus lost-and-found recovery platform designed to connect lost and found reports, manage recovery records, identify possible matches, verify ownership signals, and track item recovery.

## Project Objective

The objective of RECALL is to provide a structured digital recovery network for campus communities. Users can report lost or found items, browse recovery cases, edit and delete records, inspect item details, save favorites, track recent activity, and manage persistent recovery preferences.

## Features

- User registration and login
- Persistent login using Local Storage
- Protected dashboard routes
- Lost and found item reporting
- Dynamic Recovery ID generation
- Full CRUD operations for recovery reports
- Pre-filled report editing
- Delete confirmation
- Search, filter and sort functionality
- Session-based search and filter persistence
- Undo last deleted report
- Auto Save Draft for report forms
- Dynamic Recent Activity feed
- Persistent Light and Dark themes
- Dynamic report details pages
- Smart recovery match engine
- Ownership verification workflow
- Campus hotspot insights
- Favorites
- Recently viewed recovery cases
- User profile management
- Recovery preference settings
- Recovery Guidance Feed using Fetch API
- Loading and API error states
- Campus recovery safety protocol
- Custom 404 page
- Responsive RECALL interface

## React Concepts Implemented

- React Functional Components
- JSX
- Props
- Reusable Components
- `useState`
- `useEffect`
- Controlled Components
- Event Handling
- Form Validation
- Conditional Rendering
- Dynamic Lists using `map()`
- Unique Key Props
- React Router DOM
- `BrowserRouter`
- `Routes` and `Route`
- `Link` and `NavLink`
- `useNavigate`
- `useParams`
- Dynamic Routing
- Route Parameters
- Nested Routes
- Layout Routes
- Protected Routes
- Wildcard Routes
- Local Storage
- Session Storage
- Fetch API
- Loading State Management
- Error Handling

## CRUD Operations

RECALL implements complete CRUD functionality for recovery reports.

- **Create:** Users can create new lost or found recovery cases.
- **Read:** Recovery reports are displayed dynamically across reports and details pages.
- **Update:** Existing reports can be edited using a pre-filled form.
- **Delete:** Reports can be deleted after user confirmation.

All report changes are automatically synchronized with browser Local Storage.

## Local Storage

RECALL uses browser Local Storage to persist application data across page refreshes and browser sessions.

Stored data includes:

- Registered users
- Current logged-in user
- Recovery reports
- Favorite reports
- Recently viewed reports
- Recovery settings
- Selected interface theme
- Ownership claim signals
- Recent activity history
- Auto-saved report drafts
- Most recently deleted report for Undo Delete

## Session Storage

RECALL uses Session Storage for temporary report browsing preferences.

Stored session data includes:

- Report search keyword
- Active status filter
- Selected sorting option

These values remain available during the current browser tab session.

## Persistent Theme

Users can select a Light or Dark interface theme from the Settings page.

The selected theme is stored in Local Storage and automatically reapplied when RECALL is refreshed or reopened.

## Bonus Challenges Implemented

RECALL implements four storage-focused bonus features:

1. **Search and Filter** - Dynamically search and filter recovery reports.
2. **Undo Delete** - Restore the most recently deleted recovery report.
3. **Recent Activity** - Track recent Login, Added, Edited, Deleted, and Restored actions.
4. **Auto Save Draft** - Automatically preserve unfinished recovery report form data.

## Data Fetching

RECALL fetches safe recovery guidance from a local JSON data source using the JavaScript Fetch API.

The data is retrieved inside the React `useEffect` hook and displayed dynamically using `map()`.

The dashboard also demonstrates loading state management and graceful fetch error handling.

## Dynamic Routing

Each recovery report has a dedicated dynamic details page.

Example:

`/items/RCL-2026-0017`

The Recovery ID is passed through the URL and retrieved using `useParams()`.

Edit routes also use dynamic route parameters.

Example:

`/items/RCL-2026-0017/edit`

## Learning Outcomes

Through this project, I learned how to:

- Build a multi-page React application using React Router.
- Implement persistent browser storage using Local Storage.
- Use Session Storage for temporary UI state.
- Implement complete CRUD operations.
- Create dynamic and pre-filled forms.
- Persist user theme preferences.
- Build protected routes and login persistence.
- Track application activity dynamically.
- Implement Undo Delete functionality.
- Auto-save unfinished form data.
- Fetch and display JSON data using the Fetch API.
- Manage loading, validation, and error states.

## Project Structure

```text
src/
|-- components/
|-- data/
|-- layouts/
|-- pages/
|-- utils/
|-- App.jsx
|-- index.css
`-- main.jsx
```

## Technologies Used

- React
- JavaScript
- React Router DOM
- Vite
- HTML5
- CSS3
- Local Storage
- Session Storage
- Fetch API