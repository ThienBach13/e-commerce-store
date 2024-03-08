import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import banner from "../../assets/images/banner.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const Banner = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#ffffff",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to the store
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        You name it, we have got it.
      </Typography>
      <Link to="/products" style={{ textDecoration: "none", color: "inherit" }}>
        <ArrowForwardIcon sx={{ fontSize: 40 }} />
      </Link>
    </Box>
  );
};

export default Banner;
