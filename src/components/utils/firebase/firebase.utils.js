// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword
 } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRsqD4vZlskXroLwlbcbJgKHYXSeFQBoE",
  authDomain: "crwn-clothing-db-cbcb9.firebaseapp.com",
  projectId: "crwn-clothing-db-cbcb9",
  storageBucket: "crwn-clothing-db-cbcb9.appspot.com",
  messagingSenderId: "124609394534",
  appId: "1:124609394534:web:110891cb00896ff43f7aa7",
  measurementId: "G-X83C04KP1X"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);



const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'    
  });

export const auth = getAuth()
export const signInWithGooglePopup = ()=>signInWithPopup(auth, provider);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInformation={}) => {
    if (!userAuth) return;

    const userDocRef = doc(db,'users', userAuth.uid);
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists())

    if (!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{displayName,email,createdAt, ...additionalInformation});
        }catch (error){
            console.log('error creating the user', error.message);
        }
    }

}

export const createAuthEmailandPassword = async(email,password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password);

};
