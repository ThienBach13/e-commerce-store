import { useFormik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAllProductsAsync,
  deleteProductAsync,
} from "../../redux/slices/productSlice";
import { RootState, useAppDispatch } from "../../redux/store";

const DeleteProduct = () => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string | undefined }>();
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);
  const [openModal, setOpenModal] = useState(false);

  // Formik form setup
  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      try {
        navigate("/productManage");
        await dispatch(deleteProductAsync(id as string));
        await dispatch(fetchAllProductsAsync());
      } catch (error) {
        return error;
      }
    },
  });

  // Function to handle modal open
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Function to handle modal close
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
        color="primary"
        variant="contained"
        sx={{ padding: 1, color: "white" }}
        onClick={handleOpenModal}
      >
        Delete
      </Button>
      {/* Modal for deleting product */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Are you sure?
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
            {/* Delete confirmation button */}
            <Button
              color="primary"
              type="submit"
              variant="contained"
              sx={{ marginTop: 2, color: "white" }}
            >
              Confirm
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  );
};

export default DeleteProduct;
