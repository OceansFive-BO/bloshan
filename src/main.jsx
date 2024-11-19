import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./themes/theme.js";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import authConfig from "./auth_config";
import App from "./App";

const onRedirectCallback = (appState) => {
  window.location.replace(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const providerConfig = {
  domain: authConfig.domain,
  clientId: authConfig.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(authConfig.audience ? { audience: authConfig.audience } : null),
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
