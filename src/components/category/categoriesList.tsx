import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import {
  setSelectedCategory,
  fetchAllCategoriesAsync,
} from "../../redux/slices/categorySlice";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface CategoriesListProps {
  handleCategoryChange: (categoryId: number) => void;
}

const CategoriesList: React.FC<CategoriesListProps> = ({
  handleCategoryChange,
}) => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const dispatch = useAppDispatch();
  const categoryDispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCategory = (category: number) => {
    categoryDispatch(setSelectedCategory(category));
    handleCategoryChange(category); // Call the handleCategoryChange prop with the selected category
  };

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  if (isSmallScreen) {
    return (
      <FormControl
        sx={{
          minWidth: "200px",
          marginLeft: "10px",
          position: "absolute",
          top: "48px",
          right: "10px",
        }}
      >
        <Select
          labelId="category-select-label"
          id="category-select"
          onChange={(e) => handleCategory(Number(e.target.value))}
          defaultValue={0}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <List sx={{ minWidth: "200px", marginLeft: "10px" }}>
      {categories.map((category) => (
        <ListItem
          key={category.id}
          disablePadding
          onClick={() => handleCategory(category.id)}
        >
          <ListItemButton>
            <ListItemText primary={category.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default CategoriesList;
