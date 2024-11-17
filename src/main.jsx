import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import theme from './themes/theme.js';
import NotFound from './components/common/notFound/NotFound.jsx';
import Test from './components/views/test/test.jsx';
import HomeView from './components/views/home';
import ProfileView from './components/views/profile';
import ContactView from './components/views/contact';
import Tos from './components/views/tos';
import Root from './components/views/Root.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" replace />,
      },
      {
        path: '/home',
        element: <HomeView />,
      },
      {
        path: '/profile',
        element: <ProfileView />,
      },
      {
        path: '/contact',
        element: <ContactView />,
      },
      {
        path: 'tos',
        element: <Tos />,
      },
      {
        path: '/test',
        element: <Test />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
     <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
