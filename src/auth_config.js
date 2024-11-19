

const authConfig = {
  domain: import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID,
  audience: import.meta.env.VITE_REACT_APP_AUTH0_AUDIENCE,
};

export default authConfig;