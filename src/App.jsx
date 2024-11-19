import { BrowserRouter as Router, Routes, Route,useNavigate } from "react-router-dom";
import { Container } from "reactstrap";

import Home from "./components/views/home";
import Profile from "./components/views/profile";
import Header from "./components/common/header/Header.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";

function Reroute() {
  const navigate = useNavigate();
  navigate("/home", { relative: "path" });
}

const App = () => {
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
            <Route path="/profile" element={<Profile user={user} />} />
            <Route
              path="/"
              element={<Reroute/>}
            />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;

