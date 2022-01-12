import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import UseAuth from '../../Hooks/useAuth';
import useFirebase from '../../Hooks/useFirebase';

const Signin = () => {
    const {signInUsingGoogle} = useFirebase();
    const nevigate=useNavigate();

    const handleGoogle = () => {
        signInUsingGoogle()
        .then(result => {
            nevigate('/')
        }).catch(error=>{

        })
        //.finally(() => setIsloading(false))
    }

    return (
        <div>
            <h2>Sign In</h2>

            <button onClick={handleGoogle}>Google SignIn</button>
            {/* <button onClick={handleGoogle}>Google SignIn</button> */}
        </div>
    );
};

export default Signin;