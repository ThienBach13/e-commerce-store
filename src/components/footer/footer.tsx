import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    // <footer style={styles.footer}>
    //   <p>&copy; 2024 Cloth</p>
    // </footer>
    <Box
      sx={{
        padding: "20px",
        textAlign: "center",
        borderTop: "1px solid #ddd",
        bottom: "0",
        width: "100%",
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        &copy; 2024 Cloth store
      </Typography>
    </Box>
  );
};

const styles = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "1rem",
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
  } as React.CSSProperties,
};

export default Footer;
