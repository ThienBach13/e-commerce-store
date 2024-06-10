import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { Sort } from "../misc/types";
import { fetchAllProductsAsync } from "../redux/slices/productSlice";
import { fetchAllCategoriesAsync } from "../redux/slices/categorySlice"; // Add this import
import { authenticateUserAsync } from "../redux/slices/userSlice";
import { sortByHighest, sortByLowest } from "../utils/sort";
import CreateProduct from "../components/product/productCreate";

const ProductManage = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSort, setSelectedSort] = useState<Sort>("Default");
  const open = Boolean(anchorEl);
  //   const theme = useTheme();
  //   const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  //   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  //   const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const allProducts = useAppSelector((state) => state.products.allProducts);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const categories = useAppSelector((state) => state.categories.categories);
  const user = useAppSelector((state: RootState) => state.users.user);
  const dispatch = useAppDispatch();
  const productsPerPage = 12;
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
    dispatch(fetchAllCategoriesAsync()); // Fetch all categories
  }, [dispatch]);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken && !user) {
      dispatch(authenticateUserAsync(accessToken));
    }
  }, [dispatch, user]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sortProducts =
    selectedSort === "Default"
      ? allProducts
      : selectedSort === "Highest Price"
      ? sortByHighest(allProducts, "price")
      : sortByLowest(allProducts, "price");

  useEffect(() => {
    const maxPage = Math.ceil(sortProducts.length / productsPerPage);
    if (page < 1 && maxPage > 0) {
      setPage(1);
    } else if (page > maxPage) {
      setPage(maxPage);
    }
  }, [page, sortProducts.length, productsPerPage]);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Manage Products
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            minWidth: "unset",
            padding: 1,
            color: "inherit",
            fontWeight: "500",
            border: "1px solid black",
          }}
        >
          Sort by: {selectedSort}
        </Button>
        {user && user.role === "Admin" && <CreateProduct />}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ "aria-labelledby": "basic-button" }}
        >
          <MenuItem
            onClick={() => {
              setSelectedSort("Default");
              handleClose();
            }}
          >
            Default
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelectedSort("Highest Price");
              handleClose();
            }}
          >
            Highest Price
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelectedSort("Lowest Price");
              handleClose();
            }}
          >
            Lowest Price
          </MenuItem>
        </Menu>
      </Box>
      <Box sx={{ display: "table", width: "100%" }}>
        <Box
          sx={{
            display: "table-row",
            fontWeight: "bold",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Box sx={{ display: "table-cell", padding: "8px" }}>Product Name</Box>
          <Box sx={{ display: "table-cell", padding: "8px" }}>Actions</Box>
        </Box>
        {sortProducts
          .slice((page - 1) * productsPerPage, page * productsPerPage)
          .map((product) => (
            <Box key={product.id} sx={{ display: "table-row" }}>
              <Box sx={{ display: "table-cell", padding: "8px" }}>
                {product.name}
              </Box>
              <Box sx={{ display: "table-cell", padding: "8px" }}>
                <Button
                  size="small"
                  variant="contained"
                  component={RouterLink}
                  to={`/products/${product.id}`}
                  sx={{ marginRight: "10px" }}
                >
                  Details
                </Button>
              </Box>
            </Box>
          ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Pagination
          count={Math.ceil(sortProducts.length / productsPerPage)}
          page={page}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default ProductManage;
