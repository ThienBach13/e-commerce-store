import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, useAppSelector } from "../../redux/store";
import { logout } from "../../redux/slices/userSlice";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { LocalOffer, ShoppingCart } from "@mui/icons-material";
import { Link } from "@mui/material";
import Badge from "@mui/material/Badge";

const Header = () => {
  // Select cart items and authentication status from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const authenticate = useSelector(
    (state: RootState) => state.users.isAuthenticated
  );
  const user = useAppSelector((state: RootState) => state.users.user);
  const dispatch = useDispatch();

  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce(
    (total, currentItem) => total + currentItem.quantity,
    0
  );
  const navigate = useNavigate();

  // State for menu anchor elements
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // Handlers for opening and closing navigation and user menus
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Handle user logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <LocalOffer sx={{ display: { xs: "none", md: "flex" } }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CLOTH
          </Typography>

          {/* Navigation Menu (for small devices) */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* Navigation links */}
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  href="/products"
                  color="inherit"
                  underline="none"
                  sx={{ textAlign: "center", width: "100%" }}
                >
                  Products
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  href="#"
                  color="inherit"
                  underline="none"
                  sx={{ textAlign: "center", width: "100%" }}
                >
                  About
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  href="#"
                  color="inherit"
                  underline="none"
                  sx={{ textAlign: "center", width: "100%" }}
                >
                  Contact
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          {/* Logo (for medium devices) */}
          <LocalOffer sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CLOTH
          </Typography>

          {/* Navigation Links (for medium devices) */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              component={Link}
              href="/products"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Products
            </Button>
            <Button
              component={Link}
              href="#"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About
            </Button>
            <Button
              component={Link}
              href="#"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Contact
            </Button>
          </Box>

          {/* User Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "25px" }}>
            {/* Shopping Cart */}
            <Tooltip title="Cart">
              <Badge badgeContent={totalItems} color="primary">
                <Link
                  component={RouterLink}
                  to="/cart"
                  sx={{
                    display: "flex",
                    verticalAlign: "middle",
                    color: "inherit",
                  }}
                >
                  <ShoppingCart sx={{ fontSize: "30px", cursor: "pointer" }} />
                </Link>
              </Badge>
            </Tooltip>

            {/* User Profile */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* User menu options
              {authenticate ? (
                // If user is authenticated
                <div>
                  <Link
                    component={RouterLink}
                    to="/profile"
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </div>
              ) : (
                // If user is not authenticated
                <div>
                  <Link
                    component={RouterLink}
                    to="/login"
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    <MenuItem>Log In</MenuItem>
                  </Link>
                  <Link
                    component={RouterLink}
                    to="/register"
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    <MenuItem>Register</MenuItem>
                  </Link>
                </div>
              )} */}
              {/* User menu options */}
              {authenticate ? (
                // If user is authenticated
                <div>
                  {/* Check if user is admin */}
                  {user && user.role === "Admin" ? (
                    <div>
                      <Link
                        component={RouterLink}
                        to="/profile"
                        sx={{ textDecoration: "none", color: "inherit" }}
                      >
                        <MenuItem>Profile admin</MenuItem>
                      </Link>
                      <Link
                        component={RouterLink}
                        to="/adminOrder"
                        sx={{ textDecoration: "none", color: "inherit" }}
                      >
                        <MenuItem>Manage Orders</MenuItem>
                      </Link>
                      <Link
                        component={RouterLink}
                        to="/productManage"
                        sx={{ textDecoration: "none", color: "inherit" }}
                      >
                        <MenuItem>Manage Products</MenuItem>
                      </Link>
                      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                    </div>
                  ) : (
                    // If user is not admin
                    <div>
                      <Link
                        component={RouterLink}
                        to="/profile"
                        sx={{ textDecoration: "none", color: "inherit" }}
                      >
                        <MenuItem>Profile User</MenuItem>
                      </Link>
                      <Link
                        component={RouterLink}
                        to="/userOrder"
                        sx={{ textDecoration: "none", color: "inherit" }}
                      >
                        <MenuItem>My order</MenuItem>
                      </Link>
                      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                    </div>
                  )}
                </div>
              ) : (
                // If user is not authenticated
                <div>
                  <Link
                    component={RouterLink}
                    to="/login"
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    <MenuItem>Log In</MenuItem>
                  </Link>
                  <Link
                    component={RouterLink}
                    to="/register"
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    <MenuItem>Register</MenuItem>
                  </Link>
                </div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
