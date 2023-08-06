import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";
import { CartProvider } from "./context/cart";
import "antd/dist/reset.css";
import { ChakraProvider } from '@chakra-ui/react'
import { SelectedOrderProvider } from "./context/selectedOrder";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <SelectedOrderProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SelectedOrderProvider>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>

  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
