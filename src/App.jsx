import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "reactstrap";

// import Loading from "./components/Loading";
// import Footer from "./components/Footer";
import Home from "./components/views/home";
import Profile from "./components/views/profile";
import Header from "./components/common/header/Header.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

import "./App.css";

const App = () => {
  // const { isLoading } = useAuth0();

  // if (isLoading) {
  //   return <Loading />;
  // }

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

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
          user={user}
          isAuthenticated={isAuthenticated}
          loginWithRedirect={loginWithRedirect}
          logoutWithRedirect={logoutWithRedirect}
        />
        <Container className="flex-grow-1 mt-5">
          <Routes>
            <Route path="/home"  element={<Home />} />
            <Route
              path="/"
              element={<Navigate to="/home" replace />}
            />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
