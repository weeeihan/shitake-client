import React from "react";
import ReactDOM from "react-dom/client";
import WebSocketProvider from "./modules/websocket_provider.tsx";
import GamestateProvider from "./modules/gamestate_provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="flex text-2xl font-reenie mt-5 justify-center w-screen">
      <div>Shitake by Han and Kelly</div>
    </div>
    <QueryClientProvider client={queryClient}>
      <GamestateProvider>
        <WebSocketProvider>
          <App />
        </WebSocketProvider>
      </GamestateProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
