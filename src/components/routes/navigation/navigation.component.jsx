import { Outlet, Link} from "react-router-dom"
import { Fragment , useContext} from "react";
import {ReactComponent as CrwnLogo} from '../../../assets/crown.svg'
import './navigation.styles.scss'
import { UserContext } from "../../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../cart-icon/cart-icon.component";
import CardDropdown from "../../cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../../context/cart.context"

const Navigation = () =>{

    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    //console.log('hit1', currentUser)

    // const signOutHandler = async()=>{
    //   await signOutUser()
    //  // console.log('hit2',currentUser)
    //   setCurrentUser(null)
    // }
    
    return(
      <Fragment>
        <div className='navigation'>
            
            
            <Link className="logo-container" to='/'>
            <CrwnLogo className="logo"/>
            </Link>        
            

            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                  SHOP    
                </Link>
                {
                  currentUser ? (
                    
                    <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                  )
                    :(
                      <Link className='nav-link' to='/auth'>
                      SIGN-IN    
                      </Link>
                    )
                }  
                <CartIcon/>
            </div>
            {isCartOpen && <CardDropdown/>}
        </div>
        <Outlet/>
      </Fragment>
    )
  }

export default Navigation;