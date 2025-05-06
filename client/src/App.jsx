import { useSelector } from "react-redux";
import LoginForm from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import HomePage from "./pages/Home";
import { Box } from "@mui/material";

function App() {
  const { token, user } = useSelector((state) => state.userReducer);
  return (
    <BrowserRouter>
      <Box sx={{
        maxWidth: "1500px",
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4 }
      }} >
        <ToastContainer position="bottom-center" autoClose={5000} transition={Zoom} theme="colored" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm type={'login'} />} />
          <Route path="create-account" element={<LoginForm type={'create-account'} />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App;
