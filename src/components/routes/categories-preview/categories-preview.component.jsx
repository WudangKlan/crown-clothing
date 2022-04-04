//import SHOP_DATA from '../../../shop-data.json'
import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../../context/categories.context";
import CategoryPreview from "../../category-preview/category-preview.component";
import "./categories-preview.styles.scss";


const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
 // console.log(categoriesMap);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {

        const products = categoriesMap[title];
        
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};
export default CategoriesPreview;
