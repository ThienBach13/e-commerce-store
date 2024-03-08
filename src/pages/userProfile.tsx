import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState, useAppDispatch } from "../redux/store";
import { logout, authenticateUserAsync } from "../redux/slices/userSlice";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Profile = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const userDispatch = useDispatch();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    userDispatch(logout());
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken && !user) {
      dispatch(authenticateUserAsync(accessToken));
    } else if (!accessToken) {
      navigate("/login");
    }
  }, [dispatch, navigate, user]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {user && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            maxWidth: 900,
            padding: 3,
            boxShadow: 1,
            borderRadius: 4,
            backgroundColor: "background.paper",
            transform: "scale(1.2)",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              textAlign: "center",
              marginBottom: { xs: 2, md: 0 },
            }}
          >
            <img
              src={user.avatar}
              alt="Avatar"
              style={{ width: "150px", height: "150px", marginRight: "40px" }}
            />
          </Box>
          <Box
            sx={{ flex: 1, textAlign: "left", marginLeft: { xs: 0, md: 4 } }}
          >
            <Typography variant="h5" component="h1" gutterBottom>
              Name: {user.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Email: {user.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Role: {user.role}
            </Typography>
            <Typography variant="body1">ID: {user.id}</Typography>
            <Button onClick={handleLogout} variant="contained" color="primary">
              Log Out
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
