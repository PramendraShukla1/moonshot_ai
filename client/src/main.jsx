import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppContextProvider from "./context/AppContext.jsx";
import { ThemeProvider } from "@material-tailwind/react";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AppContextProvider>
  </BrowserRouter>
);
