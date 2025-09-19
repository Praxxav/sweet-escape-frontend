# Sweet Escape - Frontend

This is the frontend for the "Sweet Escape" application, a modern, interactive web app for browsing and managing a sweet shop's inventory. It's built with React, TypeScript, and Vite, and styled with Tailwind CSS and shadcn/ui.

## ✨ Features

-   **Stunning Landing Page**: A beautiful, animated landing page to welcome users.
-   **Robust Authentication**: Separate, clean forms for user Sign Up and Sign In.
-   **Interactive User Dashboard**:
    -   Displays a grid of all available sweets fetched dynamically from the backend.
    -   Users can specify a quantity and purchase items.
    -   Real-time inventory updates after a purchase.
    -   Search and filter functionality to easily find sweets.
-   **Powerful Admin Dashboard**:
    -   A secure, separate dashboard for shop administrators.
    -   Full **CRUD (Create, Read, Update, Delete)** functionality for managing the sweet inventory.
    -   An intuitive table view of all sweets.
    -   A modal-based form for adding and editing sweet details.
    -   **Purchase History**: A log that shows which user purchased which sweet, in what quantity, and when.
-   **Client-Side Routing**: Seamless navigation powered by `react-router-dom`.
-   **Admin-Specific Login**: A convenient toggle on the login form to auto-fill admin credentials for easy access during development and testing.

## 🛠️ Tech Stack

-   **Framework**: React
-   **Build Tool**: Vite
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS & shadcn/ui
-   **Routing**: React Router
-   **HTTP Client**: Axios

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd sweet_shop/frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Backend URL:**
    Make sure the `BACKEND_URL` in `src/config.ts` points to your running backend server (e.g., `http://localhost:3000`).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

---

This project was built to demonstrate a full-stack application with clear separation of concerns between user and admin roles, dynamic data fetching, and a modern, responsive user interface.
