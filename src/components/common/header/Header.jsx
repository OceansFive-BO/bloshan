import * as React from "react";
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
import "./header.css";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import LogoutIcon from "@mui/icons-material/Logout";

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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header({
  user,
  isAuthenticated,
  loginWithRedirect,
  logoutWithRedirect,
})
  {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', mr: 5, ml: 5 } }}
          >
            BookSwap
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit" />
            <Link className="header-link" to={'/home'} />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit">
              <Link className="header-link" to={'/home'}>
                <HomeIcon />
              </Link>
            </IconButton>

            {!isAuthenticated && (
              <IconButton
                size="large"
                color="inherit"
                onClick={() => loginWithRedirect()}
              >
                <Link className="header-link">
                  <LoginIcon />
                </Link>
              </IconButton>
            )}

            {isAuthenticated && (
              <IconButton
                size="large"
                color="inherit"
                onClick={() => logoutWithRedirect()}
              >
                <Link className="header-link">
                  <LogoutIcon />
                </Link>
              </IconButton>
            )}

            {isAuthenticated && (
              <IconButton size="large" edge="end" color="inherit">
                <Link className="header-link" to={'/profile'}>
                  <AccountCircle />
                </Link>
              </IconButton>
            )}

            {!isAuthenticated && (
              <IconButton
                size="large"
                color="inherit"
                onClick={() => loginWithRedirect()}
              >
                <Link className="header-link">
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
  user: propTypes.object,
  isAuthenticated: propTypes.bool.isRequired,
  loginWithRedirect: propTypes.func.isRequired,
  logoutWithRedirect: propTypes.func.isRequired,
};
