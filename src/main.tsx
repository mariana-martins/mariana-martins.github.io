import React from "react";

import "@styles/index.css";
import ReactDOM from "react-dom/client";

import App from "@/App";
import {
  applyTheme,
  getInitialTheme,
  ThemeProvider,
} from "@/contexts/ThemeContext";

/**
 * Initializes the theme before React renders to prevent flash of unstyled content.
 * This ensures the correct theme class is applied immediately.
 */
function initializeTheme(): void {
  const theme = getInitialTheme();
  applyTheme(theme);
}

/**
 * Displays an error message if the root element is not found.
 */
function showRootElementError(): never {
  const errorMessage = document.createElement("div");
  errorMessage.className =
    "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-red-50 border-2 border-red-600 rounded-lg shadow-xl max-w-md text-center";
  errorMessage.innerHTML = `
    <h1 class="text-2xl font-bold text-red-600 mb-4">Application Error</h1>
    <p class="text-gray-700 mb-2">Root element not found.</p>
    <p class="text-sm text-gray-600">Please ensure your HTML contains an element with <code class="bg-gray-100 px-1 rounded">id="root"</code>.</p>
  `;
  document.body.appendChild(errorMessage);
  throw new Error(
    'Failed to find root element. Please ensure your HTML contains <div id="root"></div>',
  );
}

// Initialize theme early to prevent flash
initializeTheme();

// Get root element and validate it exists
const rootElement = document.getElementById("root");

if (!rootElement) {
  showRootElementError();
}

// Render the application
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
