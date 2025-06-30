# Hizawye 3D Portfolio

This is an interactive 3D portfolio built with React, Three.js, and Vite. It showcases projects in a unique and engaging way.

## Technologies Used

-   **React**: A JavaScript library for building user interfaces.
-   **Three.js**: A JavaScript 3D library that makes it easier to display 3D graphics in the browser.
-   **@react-three/fiber**: A React renderer for Three.js.
-   **@react-three/drei**: A collection of useful helpers and abstractions for `@react-three/fiber`.
-   **Vite**: A fast build tool that provides a lightning-fast development experience.
-   **Framer Motion**: A production-ready motion library for React.
-   **@react-spring/three**: A spring-physics based animation library for Three.js.
-   **Tailwind CSS**: A utility-first CSS framework.

## Setup

### Prerequisites

-   Node.js (LTS version recommended)
-   npm (Node Package Manager)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd hizawye-portfolio
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables (Optional for local development, but recommended for full functionality):**

    If your project uses any API keys (e.g., for Gemini API), create a `.env.local` file in the root directory and add your keys:

    ```
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```

## Running the Project

To start the development server:

```bash
npm run dev
```

This will open the application in your browser, usually at `http://localhost:5173`.

## Build for Production

To build the project for production:

```bash
npm run build
```

This will create a `dist` directory with the optimized production build.
