import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import root from "./router/index.jsx";
import { DataProvider } from "./datacontect/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <RouterProvider router={root} />
    </DataProvider>
  </StrictMode>
);
