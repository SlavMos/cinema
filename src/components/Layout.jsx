import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "./ui/NavBar";
import Footer from "./ui/Footer";

export default function Layout() {
  return (
    <Container fixed>
      <NavBar />
      <Outlet />
      <Footer />
    </Container>
  );
}
