import './App.css';

import Header from './components/common/header/Header.jsx';
import Footer from './components/common/footer/footer.jsx';
import NotFound from './components/common/notfound/NotFound.jsx';
import HomeView from './components/views/home';
import ProfileView from './components/views/profile';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Tos from './components/views/tos/tos.jsx';
import ContactForm from './components/views/contactForm/index.jsx';

export default function App () {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeView />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
