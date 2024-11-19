import { useState, useEffect, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "./Header.css";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import TextField from '@mui/material/TextField';
import LogoutIcon from "@mui/icons-material/Logout";
import Autocomplete from '@mui/material/Autocomplete';

import axios from 'axios';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(6),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function Header({
  setSearch,
  isAuthenticated,
  loginWithRedirect,
  logoutWithRedirect,
  }) {

  const navigate = useNavigate();

  const [bookTitles, setBookTitles] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const hint = useRef('');

  useEffect(() => {
    if (inputValue.length) {
      axios
        .get(`http://localhost:3000/books?title=${inputValue}&count=5`)
        .then((response) => {
          console.log(response.data);
          let bookTitles = response.data.map((book) => {
            return {label: book.title};
          });
          setBookTitles(bookTitles);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (inputValue.length === 0) {
      setBookTitles([]);
    }
  }, [inputValue]);

  useEffect(() => {
    console.log();
    if (inputValue.length === 1) {
      navigate('/search');
    }
    if (inputValue.length === 0 && window.location.pathname === '/search') {
      navigate('/home');
    }
  }, [inputValue, navigate]);

  useEffect(()=> {
    setSearch(inputValue);
  }, [setSearch, inputValue]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block", mr: 5, ml: 5 } }}
          >
            BookSwap
          </Typography>
          <Search>
            <SearchIconWrapper>
              {/* <SearchIcon /> */}
            </SearchIconWrapper>
            <Autocomplete
              onKeyDown={(event) => {
                if (event.key === 'Tab') {
                  if (hint.current) {
                    setInputValue(hint.current);
                    event.preventDefault();
                  }
                }
              }}
              onClose={() => {
                hint.current = '';
              }}
              onChange={(event, newValue) => {
                setInputValue(newValue && newValue.label ? newValue.label : '');
              }}
              onClick={(e) => console.log(e)}
              disablePortal
              inputValue={inputValue}
              options={bookTitles}
              sx={{ width: 300 }}
              renderInput={(params) => {
                return (
                  <Box sx={{ position: 'relative' }}>
                    <Typography
                      sx={{
                        position: 'absolute',
                        opacity: 0.5,
                        left: 14,
                        top: 16,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        width: 'calc(100% - 75px)', // Adjust based on padding of TextField
                      }}
                    >
                      {hint.current}
                    </Typography>
                    <TextField
                      {...params}
                      onChange={(event) => {
                        const newValue = event.target.value;
                        setInputValue(newValue);
                        const matchingOption = bookTitles.find((option) =>
                          option.label.startsWith(newValue),
                        );

                        if (newValue && matchingOption) {
                          hint.current = matchingOption.label;
                        } else {
                          hint.current = '';
                        }
                      }}
                      label="Search..."
                    />
                  </Box>
                );
              }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" color="inherit">
              <Link className="header-link" to={"/home"}>
                <HomeIcon />
              </Link>
            </IconButton>

            {!isAuthenticated && (
              <IconButton size="large" color="inherit">
                <Link
                  className="header-link"
                  onClick={() => loginWithRedirect()}
                >
                  <LoginIcon />
                </Link>
              </IconButton>
            )}

            {isAuthenticated && (
              <IconButton size="large" color="inherit">
                <Link
                  className="header-link"
                  onClick={() => logoutWithRedirect()}
                >
                  <LogoutIcon />
                </Link>
              </IconButton>
            )}

            {isAuthenticated && (
              <IconButton size="large" edge="end" color="inherit">
                <Link className="header-link" to={"/profile"}>
                  <AccountCircle />
                </Link>
              </IconButton>
            )}

            {!isAuthenticated && (
              <IconButton size="large" color="inherit">
              <Link
                className="header-link"
                onClick={() => loginWithRedirect()}
              >
                <AccountCircle />
              </Link>
            </IconButton>
            )}

          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

Header.propTypes = {
  search: propTypes.string.isRequired,
  setSearch: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool.isRequired,
  loginWithRedirect: propTypes.func.isRequired,
  logoutWithRedirect: propTypes.func.isRequired,
};
