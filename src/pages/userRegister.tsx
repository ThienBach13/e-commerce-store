import { useFormik } from "formik";
import * as Yup from "yup";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { registerUserAsync } from "../redux/slices/userSlice";
import { useAppDispatch } from "../redux/store";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmedPassword: "",
      avatar: "https://picsum.photos/700",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(4, "Must be 4 or more characters"),
      email: Yup.string()
        .required("Required")
        .matches(
          /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
          "Please enter a valid email address"
        ),
      password: Yup.string()
        .required("Required")
        .matches(/^.{6,}$/, "Password must be at least 6 characters"),
      confirmedPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password")], "Password must match"),
      avatar: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const { confirmedPassword, ...data } = values;
      try {
        await dispatch(registerUserAsync(data));
        toast.success("Account created successfully!", {
          position: "bottom-left",
        });
        navigate("/login");
      } catch (error) {
        toast.error("Registration failed. Please try again.", {
          position: "bottom-left",
        });
      }

      // Reset the form after submission
      resetForm();
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
      <Typography variant="h5" sx={{ fontWeight: "600" }}>
        Register
      </Typography>
      <FormControl
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ display: "flex", flexDixrection: "column", alignItems: "center" }}
      >
        <TextField
          id="name"
          name="name"
          label="Your name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Enter your name"
          variant="outlined"
          margin="normal"
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ marginBottom: 1, width: "300px" }}
        />

        <TextField
          id="email"
          name="email"
          label="Email address"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter email"
          variant="outlined"
          margin="normal"
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ marginBottom: 1, width: "300px" }}
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Enter password"
          variant="outlined"
          margin="normal"
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ marginBottom: 1, width: "300px" }}
        />

        <TextField
          id="confirmedPassword"
          name="confirmedPassword"
          label="Confirmed password"
          type="password"
          value={formik.values.confirmedPassword}
          onChange={formik.handleChange}
          placeholder="Confirm password"
          variant="outlined"
          margin="normal"
          error={
            formik.touched.confirmedPassword &&
            Boolean(formik.errors.confirmedPassword)
          }
          helperText={
            formik.touched.confirmedPassword && formik.errors.confirmedPassword
          }
          sx={{ marginBottom: 1, width: "300px" }}
        />

        <TextField
          id="avatar"
          name="avatar"
          label="Your Photo URL"
          type="string"
          value={formik.values.avatar}
          onChange={formik.handleChange}
          placeholder="Photo url"
          variant="outlined"
          margin="normal"
          error={formik.touched.avatar && Boolean(formik.errors.avatar)}
          helperText={formik.touched.avatar && formik.errors.avatar}
          sx={{ marginBottom: 1, width: "300px" }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ width: "300px", marginTop: 1 }}
        >
          Register
        </Button>
      </FormControl>
      <Link
        component={RouterLink}
        to="/login"
        sx={{ marginTop: 1, paddingBottom: 4 }}
      >
        Log in to your account!
      </Link>
    </Box>
  );
};

export default Register;
