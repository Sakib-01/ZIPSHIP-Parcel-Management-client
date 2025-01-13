import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./route/Routes.jsx";
import Theme from "./providers/theme/Theme.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";

import "aos/dist/aos.css"; // Import AOS styles
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </Theme>
  </StrictMode>
);
