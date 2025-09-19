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

## Images
Ladnding page
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0dfc98b8-7220-4615-bf2e-25ee523d289e" />
signin
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/75148f4b-cf5f-4d5c-b131-f064f376e5f3" />
signup
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9b64170f-e2e4-431e-a364-c8169a1a1210" />
Admin dashboard
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d5b4c75e-875f-4f5a-bfdf-8cec874be2ea" />
User dashboard
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/925c3bb6-af39-4b64-a46c-0b9671ee73a8" />

## My AI Usage

## AI-Assisted Development

This project was built with significant assistance from AI tools that acted as a pair programmer and productivity booster throughout the development process.

### Tools Used
- **Gemini Code Assist** – for generating boilerplate, scaffolding components, and improving TypeScript usage.
- **ChatGPT** – for troubleshooting errors, configuring tools (like ESLint, Jest, and Vercel/Render deploy scripts), and suggesting best practices.
- **GitHub Copilot** – (if enabled in editor) for inline code completions and quick utility snippets.

### How I Used Them
- **Boilerplate & Components:** I used Gemini to scaffold React components (`tsx`) with proper TypeScript typings, state hooks, and props setup.  
- **Forms:** Gemini generated login and signup forms (`LoginForm.tsx`, `SignUpForm.tsx`) with field state management, validation via Zod, and submit handlers.  
- **Dashboards:** I leveraged Gemini to scaffold dashboards (`Dashboard.tsx`, `AdminDashboard.tsx`) including layouts, grid structures, and modal form implementations.  
- **Error Troubleshooting:** I used ChatGPT to debug configuration issues (e.g., Jest ES module errors, missing `test` script, Vercel/Render deployment fixes, CloudFront + S3 permissions).  
- **DevOps & Config:** ChatGPT helped write `netlify.toml`, deployment scripts, ESLint configs, and guided me through Git/GitHub workflows.  
- **Unit Testing:** I asked AI tools to generate starter test examples and explain test report setups (Jest/Vitest).  

### Reflection on AI’s Impact
Using AI tools significantly accelerated my development process:
- I spent less time on repetitive boilerplate and more time on business logic.  
- Debugging was faster since I could get step-by-step explanations and solutions without searching multiple forums.  
- I gained confidence in TypeScript and deployment workflows by learning from AI-generated examples.  
- However, I still needed to carefully review AI-generated code to ensure correctness, security, and maintainability.  

In summary, AI acted as a **collaborative coding assistant**, improving code quality, reducing development time, and helping me learn new tools more efficiently.


### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Praxxav/sweet-escape-frontend.git
    cd sweet-escape-frontend
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
