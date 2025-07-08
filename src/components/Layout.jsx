import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "./ui/NavBar";
import Footer from "./ui/Footer";

export default function Layout() {
  return (
    <Container
      fixed
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Box sx={{ p: 4 }} />
      <NavBar />
      <Outlet />
      <Footer />
    </Container>
  );
}
