import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoBlack from "../assets/LogoBlack.png";
import { getAuth, signOut } from "firebase/auth"; // Import Firebase auth methods

interface Props {
  window?: () => Window;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  navItems: string[];
  isLoggedIn?: boolean;
}

const drawerWidth = 240;

export default function DrawerAppBar(props: Props) {
  const { window, setCurrentPage, navItems, isLoggedIn } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setCurrentPage("login"); // Redirect to login page after logout
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        VXL
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => handleNavigate(item.toLowerCase())}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#FFFFFF" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 3,
              display: { sm: "none" },
              color: "#000000",
              margin: "500vh",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <img
              src={LogoBlack}
              alt="Logo"
              style={{ height: "85px", padding: "8px 0" }}
            />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  position: "relative",
                  color: "#000000",
                  backgroundColor: "#FFFFFF",
                  paddingLeft: "100px",
                  fontSize: "1.2em",
                  "&:hover": {
                    backgroundColor: "#DDDDDD",
                  },
                }}
                onClick={() => handleNavigate(item.toLowerCase())}
              >
                {item}
              </Button>
            ))}
            {isLoggedIn && ( // Render Logout button only if user is logged in
              <Button
                variant="outlined"
                onClick={handleLogout} // Handle logout
                sx={{
                  color: "#000000",
                  borderColor: "#000000",
                  fontSize: "1.2em",
                  marginLeft: "20px",
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
