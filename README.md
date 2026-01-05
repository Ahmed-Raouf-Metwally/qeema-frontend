# Qeema Frontend Client

The web client for the Qeema Tech Educational Platform, built with React and Vite.

## 🛠 Tech Stack
-   **React 18**: UI Library.
-   **Vite**: Build tool.
-   **Tailwind CSS**: Styling (No Icons policy).
-   **Axios**: API Client.
-   **React Router**: Navigation.

## 🚀 Setup & Installation

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The app will open at `http://localhost:5173`.

## 🏗 Project Structure
-   `src/api`: Axios setup and API calls.
-   `src/components`: Reusable UI components (Button, Input, Card, Table).
-   `src/context`: Global state (AuthContext).
-   `src/pages`: Page components (Auth, Student, Admin).
-   `src/routes`: Route definitions (not strictly used if defined in App.jsx).

## 🎨 Design System
This project adheres to a strict **"No Icons"** policy.
-   **Buttons**: Text-based with color variants (Primary, Secondary, Ghost).
-   **Status**: Indicated by colors (Green for active, Red for danger).
-   **Layout**: Clean whitespace with simple borders and shadows.

## 🔑 Features
-   **Student Portal**: View lessons, manage favorites, update profile.
-   **Admin Dashboard**: Manage lessons, students, and school profile.
