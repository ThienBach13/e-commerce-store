import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

import {
  createProductsAsync,
  fetchAllProductsAsync,
} from "../../redux/slices/productSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { CreateProductType } from "../../misc/types";

const CreateProduct = () => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const categoryId = categories.length > 0 ? categories[1].id : "1";
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      name: "",
      price: null,
      description: "",
      categoryId: categoryId,
      images: [""],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      price: Yup.number()
        .positive("Price must be a positive number")
        .required("Required"),
      description: Yup.string().required("Required"),
      categoryId: Yup.string().required("Required"),
      images: Yup.string().required("Required"),
    }),
    onSubmit: async (data: CreateProductType, { resetForm }) => {
      const imagesArray =
        typeof data.images === "string" ? [data.images] : data.images;
      const modifiedData = { ...data, images: imagesArray };

      try {
        // Dispatch async action to create new product and fetch all products
        await dispatch(createProductsAsync(modifiedData));
        await dispatch(fetchAllProductsAsync());
      } catch (error) {
        return error;
      }
      resetForm(); // Reset form after successful submission
    },
  });

  // Function to handle opening the modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Function to handle closing the modal and resetting form
  const handleCloseModal = () => {
    setOpenModal(false);
    formik.resetForm();
  };

  return (
    <Box sx={{ margin: "10px 0 0 10px" }}>
      {/* Button to open the modal */}
      <Button
        variant="outlined"
        sx={{ padding: 1, color: "#fff", backgroundColor: "#1976D2" }} // Styling for the button
        onClick={handleOpenModal}
      >
        Create Product
      </Button>
      {/* Modal for creating new product */}
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
          {/* Title for the modal */}
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            New Product
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
            {/* Form fields for creating a new product */}
            <TextField
              id="name"
              name="name"
              label="Name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Product name"
              variant="outlined"
              margin="normal"
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ marginBottom: 1, width: "300px" }}
            />

            <TextField
              id="price"
              name="price"
              label="Price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              placeholder="Product price"
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
              placeholder="Product description"
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

            {/* Dropdown for selecting category */}
            <Select
              id="category"
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              variant="outlined"
              error={
                formik.touched.categoryId && Boolean(formik.errors.categoryId)
              }
              sx={{ marginBottom: 1, width: "300px" }}
            >
              {/* Menu items for category selection */}
              {categories.slice(1).map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {/* Error message for category selection */}
            {formik.touched.categoryId && formik.errors.categoryId && (
              <FormHelperText error>{formik.errors.categoryId}</FormHelperText>
            )}

            {/* Input field for entering image URL */}
            <TextField
              id="images"
              name="images"
              label="The Product URL"
              type="text"
              value={formik.values.images}
              onChange={formik.handleChange}
              placeholder="Photo url"
              variant="outlined"
              margin="normal"
              error={formik.touched.images && Boolean(formik.errors.images)}
              helperText={formik.touched.images && formik.errors.images}
              sx={{ marginBottom: 1, width: "300px" }}
            />

            {/* Button to submit the form */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "300px",
                marginTop: 2,
                color: "#fff",
                backgroundColor: "#1976D2",
              }}
            >
              Create
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateProduct;
