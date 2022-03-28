import {useState} from 'react'
import { createAuthEmailandPassword , createUserDocumentFromAuth} from '../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import Button from '../button/button.component';
//import { UserContext } from '../../context/user.context';

const defaultFormField = {
    displayName :'',
    email :'',
    password :'',
    confirmPassword :''
}



const SignUpForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormField)
    const {displayName, email, password, confirmPassword} = formFields;
    
    
   // console.log(formFields)
    //console.log('hit')
   //  const {setCurrentUser} = useContext(UserContext);
    //console.log('hi1' ,currentUser)

    const resetFormField = () =>{
        setFormFields(defaultFormField)
    }

    const handleSubmit = async(event) =>{
        event.preventDefault();
        if (password !== confirmPassword){
            alert('Password do not Match');
            return;
        }

        try {
            // const response = await createAuthEmailandPassword(email,password);
            // console.log(response);
            
            const {user} = await createAuthEmailandPassword(email,password);
           // console.log('hi2' ,currentUser)
            await createUserDocumentFromAuth(user,{displayName})
            //setCurrentUser(user)
            resetFormField();
            

        }catch(error){
            if (error.code === 'auth/email-already-in-use'){
                alert ('Cannot Create user, email already in use');
            } else {
                console.log('user creation encounter an error',error)
            }
            
        }

    }

    const handleChange = (event)=>{
        const {name, value} = event.target;
        setFormFields({...formFields,[name]:value});
        
    }

    return(

        <div className='sign-up-container'>
            <h2>Don't have an Account?</h2>
            <span>Sign Up with Your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name' 
                    required type='text' 
                    onChange={handleChange} 
                    name='displayName' 
                    value={displayName}
                />                    
               
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

                <FormInput   
                    label='Confirm Password'    
                    required type='password' 
                    onChange={handleChange} 
                    name='confirmPassword' 
                    value={confirmPassword}
                />

                <Button type="submit" children='Sign Up' />
            </form>
        </div>
    )
}

export default SignUpForm;