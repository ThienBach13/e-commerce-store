import React, { useEffect, useState } from "react";
import { fetchAllProductsAsync } from "../../redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { authenticateUserAsync } from "../../redux/slices/userSlice";
import { Link as RouterLink } from "react-router-dom";
import CreateProduct from "./productCreate";
import CategoriesList from "../category/categoriesList";
import { Sort, ProductType } from "../../misc/types";
import { RootState } from "../../redux/store";
import { sortByHighest, sortByLowest } from "../../utils/sort";
import { saveToCart } from "../../redux/slices/cartSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Pagination from "@mui/material/Pagination";
import Link from "@mui/material/Link";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const ProductList = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSort, setSelectedSort] = useState<Sort>("Default");
  const [selectedCategory, setSelectedCategory] = useState<number>(0); // Initially set to show all products
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const allProducts = useAppSelector((state) => state.products.allProducts);
  const user = useAppSelector((state: RootState) => state.users.user);
  const dispatch = useAppDispatch();
  const cartDispatch = useAppDispatch();
  const productsPerPage = 12; // 4 columns * 3 rows
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken && !user) {
      dispatch(authenticateUserAsync(accessToken));
    }
  }, [dispatch, user]);

  const handleAddToCart = (product: ProductType) => {
    cartDispatch(saveToCart(product));
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  let filteredProducts =
    selectedCategory === 0
      ? allProducts
      : allProducts.filter(
          (product) => product.category.id === selectedCategory
        );

  let sortProducts =
    selectedSort === "Default"
      ? filteredProducts
      : selectedSort === "Highest Price"
      ? sortByHighest(filteredProducts, "price")
      : sortByLowest(filteredProducts, "price");

  useEffect(() => {
    // Ensure that the current page is within valid bounds
    if (page < 1) {
      setPage(1);
    } else if (page > Math.ceil(filteredProducts.length / productsPerPage)) {
      setPage(Math.ceil(filteredProducts.length / productsPerPage));
    }
  }, [page, filteredProducts.length, productsPerPage]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getGridTemplateColumns = () => {
    if (isExtraSmallScreen) return "repeat(1, 1fr)";
    if (isSmallScreen) return "repeat(2, 1fr)";
    if (isMediumScreen) return "repeat(3, 1fr)";
    return "repeat(4, 1fr)";
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CategoriesList
        handleCategoryChange={(categoryId: number) =>
          setSelectedCategory(categoryId)
        }
      />
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ margin: "10px 0 0 10px", display: "flex" }}>
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
          {user && user.role === "admin" && <CreateProduct />}
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
              }}
            >
              Default
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSelectedSort("Highest Price");
              }}
            >
              Highest Price
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSelectedSort("Lowest Price");
              }}
            >
              Lowest Price
            </MenuItem>
          </Menu>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: getGridTemplateColumns(),
            gap: 2,
            margin: "10px",
          }}
        >
          {sortProducts
            .slice((page - 1) * productsPerPage, page * productsPerPage)
            .map((product) => (
              <Card
                key={product.id}
                sx={{ border: "1px solid black", padding: 2 }}
              >
                <CardMedia
                  component="img"
                  alt="Product Images"
                  image={product.images[1]}
                  sx={{ width: "100%", height: "auto", display: "block" }} // Maintain aspect ratio
                />
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="body1">€{product.price}</Typography>
                <CardActions>
                  <Link component={RouterLink} to={`/products/${product.id}`}>
                    <Button size="small">More details</Button>
                  </Link>
                  <Button
                    size="small"
                    onClick={() => {
                      handleAddToCart(product);
                    }}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
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
            count={Math.ceil(filteredProducts.length / productsPerPage)}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductList;
