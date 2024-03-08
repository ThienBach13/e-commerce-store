import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import {
  setSelectedCategory,
  fetchAllCategoriesAsync,
} from "../../redux/slices/categorySlice";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

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

  const handleCategory = (category: number) => {
    categoryDispatch(setSelectedCategory(category));
    handleCategoryChange(category); // Call the handleCategoryChange prop with the selected category
  };

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

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
