import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const navigate = useNavigate();

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit= async (e)=>{
    e.preventDefault();
    
    // Validate if passwords match when registering
    if (signupState.passwordHash !== signupState['confirm-password']) {
      console.error('Passwords do not match');
      return;
    }

    const payload = {
      firstName: signupState.firstName,
      lastName: signupState.lastName,
      email: signupState.email,
      passwordHash: signupState.passwordHash
    };

    console.log(signupState)
    createAccount(payload);
  }
  
  //handle Signup API Integration here
  const createAccount = async (payload) => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/signup', payload);
      console.log('User created successfully :', response.data);
      // Redirect to login page after successful signup
      setTimeout(() => navigate('/'), 2000); // TODO: Redirect to the `/login` endpoint
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
      // Handle signup failure here
    }
  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Sign Up" />
        </div>
      </form>
    )
}