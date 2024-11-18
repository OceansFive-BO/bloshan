import Box from '@mui/material/Box';

import Header from '../common/header/Header.jsx';
import Footer from '../common/footer/footer.jsx';
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


export default function Root () {

  // const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  // const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
    logout({
        logoutParams: {
          returnTo: window.location.origin,
        }
    });


  return (
    <Box>
      <Header user={user} isAuthenticated={isAuthenticated} loginWithRedirect={loginWithRedirect} logoutWithRedirect={logoutWithRedirect} />
      <Outlet />
      <Footer />
    </Box>
  );
};
