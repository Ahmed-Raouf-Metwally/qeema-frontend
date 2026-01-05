# 🎨 Qeema Tech - Student & Admin Portal

Welcome to the frontend repository for the **Qeema Tech Educational Platform**. This modern, responsive web application provides a seamless learning experience for students and a powerful management interface for administrators.

Designed with a **strict "No-Icon" aesthetic**, the UI relies purely on typography, spacing, color theory, and micro-interactions to create a clean, premium, and distraction-free environment. Built with **React** and **Tailwind CSS**, it ensures high performance and maintainability.

## ✨ Key Features

### 🎓 Student Portal
-   **Browse Lessons**: A visually engaging grid layout to explore educational content.
-   **Smart Search**: Real-time filtering to find lessons instantly.
-   **Favorites Manager**: Bookmark lessons for quick access later.
-   **Profile Management**: Easy-to-use interface for updating personal details and profile images.

### �️ Admin Dashboard
-   **Insightful Stats**: At-a-glance overview of platform metrics (Students, Lessons, Favorites).
-   **Content Management**: Full control to Create, Update, and Delete lessons with live previews.
-   **Student Database**: Efficient table view to manage registered students.
-   **School Branding**: Tools to customize the school's identity.

## 🛠️ Technology Stack

-   **Core**: React 18, Vite
-   **Styling**: Tailwind CSS (v4)
-   **Routing**: React Router DOM (v6/v7)
-   **HTTP Client**: Axios
-   **State Management**: React Context API

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Run the Application
Start the development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

## 🎨 Design Philosophy
This project follows a unique design constraint: **No Icons Allowed**.
-   **Visual Hierarchy**: Achieved through font weights, sizes, and colors (Slate/Blue palette).
-   **Actions**: "Edit", "Delete", "Add" are textual buttons with distinct visual states (Ghost, Danger, Primary).
-   **Feedback**: Form errors and status updates use color-coded alerts and borders.

## � Project Structure

-   `src/components`: Reusable, atomic UI components (Button, Input, Card).
-   `src/pages`: Feature-specific pages organized by role (Auth, Student, Admin).
-   `src/context`: Centralized Authentication logic.
-   `src/api`: API configuration and interceptors.
