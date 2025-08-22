import React from "react";
import ReactDOM from "react-dom/client"; // Import ReactDOM from react-dom/client
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./assets/contexts/userContext"; // Corrected path
import { CarritoContextProvider } from "./assets/contexts/carritoContext"; // Corrected path
import "./index.css";
import App from "./App";

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <CarritoContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CarritoContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);