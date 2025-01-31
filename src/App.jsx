import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { Container } from 'reactstrap';

import Home from './components/views/home';
import Profile from './components/views/profile';
import Header from './components/common/header/Header.jsx';
import Footer from './components/common/footer/footer';
import SearchView from './components/views/search';
import TermsOfService from './components/views/tos';
import Contact from './components/views/contact';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

function Reroute() {
  const navigate = useNavigate();
  navigate('/home', { relative: 'path' });
}

const App = () => {
  const [search, setSearch] = useState('');
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:3000/users/email/${user?.email}`
        );
        const newUser = { email: user?.email, ...userResponse?.data };
        if (newUser.photo_url === 'undefined' || newUser.photo_url === '') {
          newUser.photo_url = user.picture;
        }
        setUserData(newUser);
      } catch (error) {
        console.log('error: ', error);
      }
    };
    if (user) {
      getUserId();
    }
  }, [user]);

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });

  return (
    <Router>
      <div id="app" className="d-flex flex-column h-100">
        <Header
          setSearch={setSearch}
          isAuthenticated={isAuthenticated}
          loginWithRedirect={loginWithRedirect}
          logoutWithRedirect={logoutWithRedirect}
        />
        <Container className="flex-grow-1 mt-5 body-container">
          <Routes>
            <Route
              path="/home"
              element={
                <Home isAuthenticated={isAuthenticated} user={userData} />
              }
            />
            <Route path="/profile" element={<Profile user={userData} />} />
            <Route path="/tos" element={<TermsOfService />} />
            <Route
              path="/search"
              element={
                <SearchView
                  isAuthenticated={isAuthenticated}
                  searchString={search}
                  user={userData}
                />
              }
            />
            <Route
              path="/contact"
              element={
                <Contact user={userData} isAuthenticated={isAuthenticated} />
              }
            />
            <Route path="/" element={<Reroute />} />
          </Routes>
        </Container>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
