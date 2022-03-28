//import SHOP_DATA from '../../../shop-data.json'
import { useContext } from "react";
import { ProductContext } from "../../../context/product.context";
import ProductCard from "../../product-cart/product-cart.component";
import './shop.styles.scss'

const Shop = () =>{
    const {products} = useContext(ProductContext)

    return(
        <div className="products-container">
          {/* products.map(({id,name})=>(
              <div key={id}>
                <h1>{name}</h1>
              </div>
          )) */}
          
            {products.map((product)=>(
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )

}
export default Shop;