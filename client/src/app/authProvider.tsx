import { Authenticator } from '@aws-amplify/ui-react';
import React from 'react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  Auth: {
    Cognito: {
      // Amazon Cognito User Pool ID
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || "",
      // Amazon Cognito Web Client ID
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
    },
  },
});

// added email form field for cognito sign up page in teh follwoing orders: username (required),
// email (required), password (required), confirm password (required).  For each of the above 4 form fields, 
// add the appropriate order, placeholder string, label, and inputProps. Use the follwoing as an example:
//username: {
//    order: 1,
//    placeholder: 'Choose a username',
//    label: 'Username',
//    inputProps: {
//        required: true,
//    },

//}
const formFields = {
    signUp: {
        username: {
            order: 1,
            placeholder: 'Choose a username',
            label: 'Username',
            inputProps: {
                required: true,
            },
        },
        email: {
            order: 2,
            placeholder: 'Enter your email address',
            label: 'Email',
            inputProps: {
                type: 'email',
                required: true,
            },
        },
        password: {
            order: 3,
            placeholder: 'Enter your password',
            label: 'Password',
            inputProps: {
                type: 'password',
                required: true,
            },
        },
        confirm_password: {
            order: 4,
            placeholder: 'Confirm your password',
            label: 'Confirm Password',
            inputProps: {
                type: 'password',
                required: true,
            },
        },
    },
}

const AuthProvider = ( {children}: any ) => {
  return (
    <div className='mt-5'>
        <Authenticator formFields={formFields} >
            { 
                ( {user}: any) => 
                    user ? (
                        <div>
                            {children}
                        </div>
                    ) : (
                        <div>
                            <h1>Please sign in below:</h1>
                        </div>
                    )        
            }
        </Authenticator>
    </div>
  )
}

export default AuthProvider