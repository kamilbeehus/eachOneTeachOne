const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email-address", 
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    }
]

const signupFields=[
    {
        labelText:"First Name",
        labelFor:"firstName", // Must match the backend field from the User schema
        id:"firstName", // Must match the backend field from the User schema
        name:"firstName", // Must match the backend field from the User schema
        type:"text",
        autoComplete:"firstname",
        isRequired:true,
        placeholder:"First Name" 
    },
    {
        labelText:"Last Name",
        labelFor:"lastName",
        id:"lastName",
        name:"lastName", 
        type:"text",
        autoComplete:"lastname",
        isRequired:true,
        placeholder:"Last Name"   
    },
    {
        labelText:"Email address",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"passwordHash", // TODO: We'll need to hash this before sending it to the database
        id:"passwordHash", 
        name:"passwordHash",
        type:"password",
        autoComplete:"new-password",
        isRequired:true,
        placeholder:"Password"   
    },
    {
        labelText:"Confirm Password",
        labelFor:"confirm-password", // Used for validation only
        id:"confirm-password", // Not sent to the backend
        name:"confirm-password", // Not sent to the backend
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        placeholder:"Confirm Password"   
    }
]

export {loginFields,signupFields} //signupFields to be added to the array