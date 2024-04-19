import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import WebSocketProvider from "./modules/websocket_provider.tsx";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WebSocketProvider>
      <BrowserRouter>
        <div className="text-2xl font-reenie text-center mt-5">
          Shitake by Han
        </div>
        <App />
      </BrowserRouter>
    </WebSocketProvider>
  </React.StrictMode>
);
