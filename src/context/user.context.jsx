import { signOut } from 'firebase/auth';
import {createContext, useState, useEffect} from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser } from '../components/utils/firebase/firebase.utils';

// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: ()=>null,
});

export const UserProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};
    // signOutUser()

    useEffect(()=>{
       const unSubcribe = onAuthStateChangedListener((user)=>{
        console.log(user);
        if(user){
            createUserDocumentFromAuth(user)
        }
        setCurrentUser(user);
        })
        return unSubcribe
        
    },[])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};