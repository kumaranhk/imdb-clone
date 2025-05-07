import { Outlet } from "react-router-dom";
import Navbar from "../components/Appbar";
import MoviesPage from "./Movies";
import { Box } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ maxWidth: "1500px", mx: "auto", px : "auto" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default HomePage;
