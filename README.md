![screenshot project]()

# Hotel Management App

A small React + Vite hotel management project for room browsing, booking, and admin reservation management.

## What this app does

- Shows a list of hotel rooms with images, price, availability, and type.
- Allows guests to select a room and book it using a reservation form.
- Provides a simple staff login page for admin access.
- Displays all reservations in an admin-only view.
- Uses `json-server` as a fake backend API for rooms and reservations.

## Main features

- Room list page with filter and sort controls
- Room booking flow with guest name, email, and dates
- Admin login page using hard-coded credentials (`admin` / `admin123`)
- Protected admin route for reservation management
- Reservation cancellation support

## Tech stack

- React 19
- Vite
- Redux Toolkit
- React Router DOM v7
- React Bootstrap
- JSON Server for local API

## Setup instructions

1. Install dependencies:

```bash
npm install
```

2. Start the fake backend server:

```bash
npm run server
```

This runs `json-server` and serves data from `db.json` on `http://localhost:5000`.

If the server does not start, make sure dependencies are installed and that `json-server` is available in `node_modules`.

3. Start the React app:

```bash
npm run dev
```

4. Open the app in your browser at the Vite URL shown in the terminal (usually `http://localhost:5173`).

## Admin login

To access the admin reservation list, use:

- Username: `admin`
- Password: `admin123`

After login, the app redirects to `/admin/reservations`.

## File structure overview

- `src/App.jsx` — main routing and page setup
- `src/main.jsx` — app entry point with router and Redux store
- `src/store/` — Redux slices and store configuration
- `src/components/` — UI components like `RoomList`, `ReservationForm`, and `PrivateRoute`
- `db.json` — local JSON data for rooms and reservations

## Important notes

- The image URLs in `db.json` should be stable. If an external image link is blocked or broken, replace it with another image or a local asset.
- The backend is fake and stored in `db.json`; reservation updates happen only in this local file while the server is running.

## Build for production

```bash
npm run build
```

This creates a production-ready build in the `dist/` folder.

## Troubleshooting

- If rooms appear disabled unexpectedly, check the `status` values in `db.json`.
- If the app cannot fetch data, make sure `npm run server` is running on `http://localhost:5000`.
- If `npm run server` fails to start, verify dependencies with `npm install` and confirm the `json-server` package is installed in `node_modules`.
