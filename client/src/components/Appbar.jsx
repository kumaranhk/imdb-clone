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
  import { Link, NavLink } from "react-router-dom";
//   import { assets } from "../assets/assets.js";
  import { useState } from "react";
import { useSelector } from "react-redux";
//   import { useAuth } from "../context/AuthContext.jsx";
  
  const Navbar = () => {
    // const { user, logout } = useAuth();
    const {user} = useSelector((state) => state.userReducer);
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
    let menu = ['/','/actors','/producers'];
  
    const handleOpenUserMenu = (event) => {
      setUserMenuAnchor(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setUserMenuAnchor(null);
    };
    const handleLogout = () => {
      handleCloseUserMenu();
    //   logout();
    };
  
    return (
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black", boxShadow: 1 }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Left - Logo */}
          <Link to="/">
            <img src='https://img.icons8.com/color/500/imdb.png' alt="Logo" style={{ width: "100px" }} />
          </Link>
  
          {/* Center - Navigation Links will hide on small screens */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {menu.map((path, index) => (
              <Button
                key={index}
                component={NavLink}
                to={path}
                variant="text"
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontSize: "15px",
                  padding: 0,
                  borderRadius: 0,
                  borderBottom: "2px solid transparent",
                  "&.active": {
                    borderBottom: "2px solid #5f6FFF",
                    fontWeight: "bold",
                  },
                }}
              >
                {/* {user.role === 'patient' ? path === "/" ? "HOME" : path.slice(1).toUpperCase() : path.split('/')[2].toUpperCase()} */}
                {path.split('/')[2]?.toUpperCase()}
              </Button>
            ))}
          </Box>
  
          {/* Right - Profile for pc */}
          {user ? (
            <Box
              sx={{ display: { md: "flex", xs: "none" }, alignItems: "center" }}
            >
              {/* Profile Avatar */}
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar alt="Profile Name" src={''} />
                </IconButton>
              </Tooltip>
  
              {/* Profile Menu */}
              <Menu
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={handleCloseUserMenu}
                sx={{ mt: "45px" }}
              >
                {["/my-profile", "/my-appointments"].map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={handleCloseUserMenu}
                    component={NavLink}
                    to={setting}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting.replace("/", "").replace("-", " ").toUpperCase()}
                    </Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleLogout}>
                  <Typography sx={{ textAlign: "center" }}>LOG OUT</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              component={NavLink}
              to="/login"
              variant="contained"
              sx={{
                backgroundColor: "#5f6FFF",
                borderRadius: 10,
                display: { xs: "none", md: "inline-flex" }, // Hide on small screens
              }}
            >
              Log in
            </Button>
          )}
  
          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <Avatar alt="Profile Name" src={''} />
          </IconButton>
  
          {/* Mobile Drawer */}
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <List sx={{ width: "250px" }}>
              {menu.map((path, index) => (
                <ListItem
                  key={index}
                  component={NavLink}
                  to={path}
                  onClick={() => setIsDrawerOpen(false)}
                  sx={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "grey",
                  }}
                >
                  <ListItemText
                    primary={path.split('/')[2]?.toUpperCase()}
                  />
                </ListItem>
              ))}
              {!user ? (
                <ListItem
                  component={NavLink}
                  to="/login"
                  onClick={() => setIsDrawerOpen(false)}
                  sx={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "gray",
                  }}
                >
                  <ListItemText primary="LOG IN"/>
                </ListItem>
              ) : (
                <>
                  <ListItem
                    component={NavLink}
                    to="/my-profile"
                    onClick={() => setIsDrawerOpen(false)}
                    sx={{
                      cursor: "pointer",
                      textDecoration: "none",
                      color: "gray",
                    }}
                  >
                    <ListItemText primary="MY PROFILE" />
                  </ListItem>
                  <ListItem
                    component={NavLink}
                    to="/my-appointments"
                    onClick={() => setIsDrawerOpen(false)}
                    sx={{
                      cursor: "pointer",
                      textDecoration: "none",
                      color: "gray",
                    }}
                  >
                    <ListItemText primary="MY APPOINTMENTS" />
                  </ListItem>
                  <ListItem
                    onClick={() => console.log("User logged out")}
                    sx={{
                      cursor: "pointer",
                      textDecoration: "none",
                      color: "gray",
                      textTransform: "uppercase",
                    }}
                  >
                    <ListItemText primary="LOG OUT" onClick={handleLogout} />
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