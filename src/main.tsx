import React from "react";

import "@styles/index.css";
import ReactDOM from "react-dom/client";

import App from "@/App";

const rootElement = document.getElementById("root");

if (rootElement === null) {
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

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
