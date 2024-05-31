import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { fetchSingleProductAsync } from "../../redux/slices/productSlice";
import { useAppDispatch, useAppSelector, RootState } from "../../redux/store";
import { authenticateUserAsync } from "../../redux/slices/userSlice";
import { ProductType } from "../../misc/types";
import { saveToCart } from "../../redux/slices/cartSlice";
import UpdateProduct from "./productUpdate";
import DeleteProduct from "./productDelete";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartDispatch = useDispatch();
  const product = useAppSelector((state: RootState) => state.products.product);
  const categories = useAppSelector(
    (state: RootState) => state.categories.categories
  );
  const user = useAppSelector((state: RootState) => state.users.user);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchSingleProductAsync(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken && !user) {
      dispatch(authenticateUserAsync(accessToken));
    }
  }, [dispatch, navigate, user]);

  const handleAddToCart = (product: ProductType) => {
    cartDispatch(saveToCart(product));
  };

  const categoryName =
    categories.find((category) => category.id === product?.categoryId)?.name ||
    "Unknown";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {product ? (
        <Box
          sx={{
            display: "flex",
            maxWidth: 800,
            width: "100%",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ flex: 1, marginBottom: { xs: 2, md: 0 } }}>
            {product.images &&
              product.images[0] && ( // Check if images exist
                <img
                  src={product.images[0]}
                  alt="Product Images"
                  style={{ maxWidth: "100%", borderRadius: "8px" }}
                />
              )}
            {user && user.role === "Admin" && (
              <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
              >
                <Box sx={{ marginRight: 1 }}>
                  <UpdateProduct />
                </Box>
                <Box>
                  <DeleteProduct />
                </Box>
              </Box>
            )}
          </Box>
          <Box sx={{ flex: 1, marginLeft: { xs: 0, md: 2 } }}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              <Typography component="span" sx={{ fontWeight: "normal" }}>
                {product.name}
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Price:{" "}
              <Typography component="span" sx={{ fontWeight: "normal" }}>
                €{product.price}
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Category:{" "}
              <Typography component="span" sx={{ fontWeight: "normal" }}>
                {categoryName}
              </Typography>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: "bold", color: "#333", marginTop: 1 }}
            >
              Description:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "normal" }}>
              {product.description}
            </Typography>

            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                component={RouterLink}
                to="/products"
                variant="outlined"
                color="primary"
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>Product not found</Box>
      )}
    </Box>
  );
};

export default ProductDetail;
