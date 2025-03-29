import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

// Use environment variable - React style
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN as string;
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
const AUTH0_AUDIENCE = "https://dev-t0s067pnrpcdsto8.us.auth0.com/api/v2/";

if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID) {
  throw new Error("Auth0 credentials not found in environment variables");
}

export const Auth0ProviderWithNavigate = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || '/');
  };

  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: AUTH0_AUDIENCE,
        display: 'popup'
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}; 