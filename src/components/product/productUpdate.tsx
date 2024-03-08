import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {
  fetchSingleProductAsync,
  updateProductAsync,
} from "../../redux/slices/productSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { UpdateProductType } from "../../misc/types";

const UpdateProduct = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams(); // Getting the product ID from the URL params
  const loading = useSelector((state: RootState) => state.products.loading); // Fetching loading state from Redux store
  const error = useSelector((state: RootState) => state.products.error); // Fetching error state from Redux store
  const product = useSelector((state: RootState) => state.products.product); // Fetching product data from Redux store
  const [openModal, setOpenModal] = useState(false); // State to manage modal open/close

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      title: product?.title,
      price: product?.price,
      description: product?.description,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      price: Yup.number()
        .positive("Price must be a positive number")
        .required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: async (data: UpdateProductType, { resetForm }) => {
      const modifiedData = {
        updateProduct: data,
        productId: Number(id),
      };
      try {
        // Dispatching async actions to update product and fetch updated product data
        await dispatch(updateProductAsync(modifiedData));
        await dispatch(fetchSingleProductAsync(Number(id)));
      } catch (error) {
        return error; // Returning error if any
      }
      resetForm(); // Resetting form after successful submission
      setOpenModal(false); // Close the modal after updating
    },
  });

  // Function to handle modal open
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Function to handle modal close and reset form
  const handleCloseModal = () => {
    setOpenModal(false);
    formik.resetForm();
  };

  // Conditional rendering based on loading and error states
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Box>Error: {error}</Box>;
  }

  // Render the main component
  return (
    <Box sx={{ margin: "10px 0 0 10px" }}>
      <Button
        color="primary" // Set the button color to blue
        variant="contained" // Use contained variant for a solid button
        sx={{ padding: 1, color: "white" }} // Set custom styles for the button
        onClick={handleOpenModal} // Open modal on button click
      >
        Update
      </Button>
      {/* Modal for updating product */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "background.default",
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Update Product
          </Typography>
          <FormControl
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Form fields for updating product */}
            <TextField
              id="id"
              name="id"
              label="Product ID"
              type="text"
              value={id}
              disabled
              variant="outlined"
              margin="normal"
              sx={{ marginBottom: 1, width: "300px" }}
            />
            <TextField
              id="title"
              name="title"
              label="Title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="Enter the product name"
              variant="outlined"
              margin="normal"
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              sx={{ marginBottom: 1, width: "300px" }}
            />
            <TextField
              id="price"
              name="price"
              label="Price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              placeholder="Enter the product price"
              variant="outlined"
              margin="normal"
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              sx={{ marginBottom: 1, width: "300px" }}
            />
            <TextField
              id="description"
              name="description"
              label="Description"
              type="text"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Enter the product description"
              variant="outlined"
              margin="normal"
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              sx={{ marginBottom: 1, width: "300px" }}
            />
            {/* Submit button */}
            <Button
              color="success"
              type="submit"
              variant="contained"
              sx={{ marginTop: 2 }}
            >
              UPDATE
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  );
};

export default UpdateProduct;
