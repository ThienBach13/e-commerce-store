import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchAllCategoriesAsync } from "../../redux/slices/categorySlice";

const CategoriesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.allCategories);
  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);
  return (
    <>
      {categories.map((category) => (
        <section>
          {category.name} {category.id}
        </section>
      ))}
    </>
  );
};
export default CategoriesList;
