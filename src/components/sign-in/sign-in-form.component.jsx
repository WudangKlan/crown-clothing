import {useState,/*  useContext */} from 'react'
import { createUserDocumentFromAuth, signInWithGooglePopup,signInAuthEmailandPassword} from '../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss'
import Button from '../button/button.component';
//import { UserContext } from '../../context/user.context';

const defaultFormField = {

    email :'',
    password :'',

}



const SignInForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormField)
    const {email, password} = formFields;
    
    
    //console.log(formFields)

    const resetFormField = () =>{
        setFormFields(defaultFormField)
    }

    const signInWithGoogle = async() =>{
       // const {user} = await signInWithGooglePopup();
       await signInWithGooglePopup();
       // await createUserDocumentFromAuth(user)
       // setCurrentUser(user)
       // console.log(response)
    }

    //const {setCurrentUser}= useContext(UserContext);
   

    const handleSubmit = async(event) =>{
        event.preventDefault();
       

        try {
            // const response = await singInAuthEmailandPassword(email,password)
            // console.log(response)
            //const {user} = await signInAuthEmailandPassword(email,password);
            await signInAuthEmailandPassword(email,password);
           // setCurrentUser(user)
            
            resetFormField();

        }catch(error){
            
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('User is not Found');
                    break;

                case 'auth/wrong-password':
                    alert('User wrong Password');
                    break;

                default :
                console.log(error)
            }

        }

    }

    const handleChange = (event)=>{
        const {name, value} = event.target;
        setFormFields({...formFields,[name]:value});
        
    }

    return(

        <div className='sign-up-container'>
            <h2>Already have an Account</h2>
            <span>Sign In with Your Email and Password</span>
            <form onSubmit={handleSubmit}>
                         
                <FormInput 
                    label='Email'
                    required type='email' 
                    onChange={handleChange} 
                    name='email' 
                    value={email}
                />

                <FormInput 
                    label='Password'
                    required type='password' 
                    onChange={handleChange} 
                    name='password' 
                    value={password}
                />
                <div className='buttons-container'>
                    <Button type="submit" children='Sign In' />
                    <Button onClick={signInWithGoogle} children='Google Sign In' buttonType='google'/>
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;