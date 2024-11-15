import Box from '@mui/material/Box';

import Header from '../common/header/Header.jsx';
import Footer from '../common/footer/footer.jsx';
import { Outlet } from "react-router-dom";

export default function Root () {

  return (
    <Box>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};
