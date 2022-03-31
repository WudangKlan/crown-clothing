import './cart-dropdown.styles.scss'
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';


import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { useNavigate } from 'react-router-dom';

const CardDropdown = () => {

    const {cartItems, isCartOpen, setIsCartOpen} = useContext(CartContext);
    //console.log(cartItems)

    const navigate = useNavigate();


    const goToCheckoutHandler = () => {
        navigate('/checkout');
        setIsCartOpen(!isCartOpen)
    }

    return(
        
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {/* [].map(item =><CartItem CartItem={item}/>) */}
                {cartItems.map((item) =>(
                    <CartItem cartItem={item} key={item.id}/>
                ))}
            </div>
            <Button onClick={goToCheckoutHandler}>Go to Checkout</Button>
        </div>
    )
}

export default CardDropdown;