import { useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import FormControl from "@mui/material/FormControl";
import { loginUserAsync } from "../redux/slices/userSlice";
import { RootState, useAppDispatch } from "../redux/store";
import { UserCredential } from "../misc/types";

const Login = () => {
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (userCredential: UserCredential) => {
      dispatch(loginUserAsync(userCredential));
      navigate("/profile");
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 4,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "600" }}>
        Log In
      </Typography>
      <FormControl
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TextField
          variant="outlined"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          sx={{ marginBottom: 2, width: "300px" }}
        />

        <TextField
          variant="outlined"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          sx={{ marginBottom: 2, width: "300px" }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 1 }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Log In"}
        </Button>
        {error && (
          <Typography sx={{ color: "red", marginTop: 1 }}>{error}</Typography>
        )}
      </FormControl>
      <Link component={RouterLink} to="/register" sx={{ marginTop: 2 }}>
        Create account?
      </Link>
    </Box>
  );
};

export default Login;
