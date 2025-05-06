import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/reducers/user"; // Ensure logout reducer is defined

const Navbar = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const page = useLocation().pathname;

  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  let menuLinks = [
    { label: "Movies", path: "/" },
    { label: "Actors", path: "/actors" },
    { label: "Producers", path: "/producers" },
  ];
  if (["/login", "/create-account"].includes(page)) {
    menuLinks = [];
  }

  const handleOpenUserMenu = (event) => setUserMenuAnchor(event.currentTarget);
  const handleCloseUserMenu = () => setUserMenuAnchor(null);

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", color: "black", boxShadow: 1,height: 60,padding : 0 }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Link to="/">
          <img
            src="https://img.icons8.com/color/500/imdb.png"
            alt="IMDb Logo"
            style={{ width: 80, height: 80 }}
          />
        </Link>

        {/* Menu Links (Desktop) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {menuLinks.map(({ label, path }) => (
            <Button
              key={path}
              component={NavLink}
              to={path}
              variant="text"
              sx={{
                color: "black",
                textTransform: "none",
                fontSize: 15,
                borderBottom: "2px solid transparent",
                "&.active": {
                  borderBottom: "2px solid #FFC107",
                  fontWeight: "bold",
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        {/* Right Side */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {user ? (
            <>
              {/* Desktop Avatar */}
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Tooltip title="Account settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar alt={user.name || "User"} src={user.avatar || ""} />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                backgroundColor: "#FFC107",
                color: "black",
                fontWeight: "bold",
                textTransform: "none",
                display: { xs: "none", md: "inline-flex" },
              }}
            >
              Log in
            </Button>
          )}

          {/* Mobile Avatar (Drawer Toggle) */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <Avatar alt={user?.name || "Guest"} src={user?.avatar || ""} />
          </IconButton>
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <List sx={{ width: 250 }}>
            {menuLinks.map(({ label, path }) => (
              <ListItem
                button
                key={path}
                component={NavLink}
                to={path}
                onClick={() => setIsDrawerOpen(false)}
              >
                <ListItemText primary={label} />
              </ListItem>
            ))}

            {!user ? (
              <ListItem
                button
                component={NavLink}
                to="/login"
                onClick={() => setIsDrawerOpen(false)}
              >
                <ListItemText primary="Log in" />
              </ListItem>
            ) : (
              <>
                <ListItem
                  button
                  component={NavLink}
                  to="/my-profile"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <ListItemText primary="My Profile" />
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
