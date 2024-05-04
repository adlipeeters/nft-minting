import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

import 'swiper/css';
import 'react-toastify/dist/ReactToastify.css';
import { Web3ModalProvider } from "./services/blockchain";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Web3ModalProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Web3ModalProvider>
);
