// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ProductProvider } from "./context/ProductContext";
import "./index.css"; // Ensure Tailwind CSS is imported
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
