import React from "react";
import Typography from "@mui/material/Typography";

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

export default Footer;
