import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import theme from "./themes/theme.js";
import NotFound from "./components/common/notfound/NotFound.jsx";
import Test from "./components/views/test/test.jsx";
import HomeView from "./components/views/home";
import ProfileView from "./components/views/profile";
import Root from "./components/views/Root.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { getConfig } from "./config";
import App from "./App";

const onRedirectCallback = (appState) => {
  window.location.replace(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    // redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
  },
};

const root = createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider {...providerConfig}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Auth0Provider>
);
