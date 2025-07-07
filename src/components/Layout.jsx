import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "./ui/NavBar";
import Footer from "./ui/Footer";

export default function Layout() {
  return (
    <Container fixed>
      <Box sx={{ p: 4 }} />
      <NavBar />
      <Outlet />
      <Footer />
    </Container>
  );
}
