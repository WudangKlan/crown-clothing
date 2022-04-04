import { Outlet, Link} from "react-router-dom"
import { Fragment , useContext} from "react";
import {ReactComponent as CrwnLogo} from '../../../assets/crown.svg'
//import './navigation.styles.jsx'
import { UserContext } from "../../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../cart-icon/cart-icon.component";
import CardDropdown from "../../cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../../context/cart.context"
import { NavigationContainer, LogoContainer, NavLinkContainer, NavLink } from "./navigation.styles.jsx";

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
        <NavigationContainer>
            
            
            <LogoContainer to='/'>
            <CrwnLogo className="logo"/>
            </LogoContainer>        
            

            <NavLinkContainer>
                <NavLink to='/shop'>
                  SHOP    
                </NavLink>
                {
                  currentUser ? (
                    
                    <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                  )
                    :(
                      <NavLink to='/auth'>
                      SIGN-IN    
                      </NavLink>
                    )
                }  
                <CartIcon/>
            </NavLinkContainer>
            {isCartOpen && <CardDropdown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  }

export default Navigation;