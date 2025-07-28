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
  Link,
  Divider,
  Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { TOP_LISTS } from "../../../constants";
import { MOVIES_LISTS } from "../../../constants";
import { iconComponents } from "../../../constants";
import Search from "../Search/Search";
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
                  {TOP_LISTS.map((item) => {
                    const Icon = iconComponents[item.icon]; // ← получаем компонент по строке

                    return (
                      <ListItem
                        disablePadding
                        component={RouterLink}
                        to={item.url}
                        key={item.title}
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <Icon />
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
                <Divider />
                <List>
                  {MOVIES_LISTS.map((item) => {
                    const Icon = iconComponents[item.icon]; // ← получаем компонент по строке
                    return (
                      <ListItem
                        disablePadding
                        component={RouterLink}
                        to={item.url}
                        key={item.title}
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <Icon />
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Drawer>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography
                sx={{ color: "white", textDecoration: "none" }}
                component={RouterLink}
                to="/"
              >
                GalaxyCinema
              </Typography>
              <Search />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}
