import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MovieIcon from "@mui/icons-material/Movie";
import {
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };
  const trigger = useScrollTrigger({
    target: typeof window !== "undefined" ? window : undefined,
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              open={isOpen}
              onClose={handleDrawerToggle}
            >
              <Box sx={{ width: 200 }} onClick={handleDrawerToggle}>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <MovieIcon />
                      </ListItemIcon>
                      <ListItemText primary="Фильмы" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
            <Typography
              sx={{ color: "white", textDecoration: "none" }}
              component={Link}
              to="/"
            >
              MosFlix
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}
