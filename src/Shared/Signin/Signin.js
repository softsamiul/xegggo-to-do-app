import React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import useFirebase from '../../Hooks/useFirebase';
import signinBanner from '../../images/signin-banner.jpg'
import { useForm } from "react-hook-form";
import './Signin.scss'

const Signin = () => {
    const {signInUsingGoogle, loginUser} = useFirebase();
    const nevigate=useNavigate();
    const location = useLocation();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const { email, password } = data;
        loginUser(email, password, location, nevigate)
    };

    const handleGoogle = () => {
        signInUsingGoogle()
        .then(result => {
            nevigate('/')
        }).catch(error=>{

        })
        //.finally(() => setIsloading(false))
    }

    return (
        <div className='home-wrapper'>
            {/* Top Section */}
            <div className='home-top-section'>
                {/* Signin title */}
                <h2 className='site-title'>SIGN IN</h2>
            </div>
            {/* Signin Banner */}
            <div>
                <img className='banner-img' src={signinBanner} alt="Banner" />
            </div>

            {/* Signin form */}
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}

                    <div className="field-wrapper-outer" style={{marginTop:'8px', marginBottom:'8px'}}>
                        <div className="field-wrapper-inner">
                            <i className="fas fa-envelope-open"></i>
                            <input className='inp' type='email' placeholder='Email' {...register("email")} />
                        </div>
                    </div>
                    {/* <div>
                        <i className="fas fa-envelope-open"></i>
                        <input type='email' placeholder='Email' {...register("email")} />
                    </div> */}
                    
                    {/* include validation with required or other standard HTML validation rules */}
                    <div className='field-wrapper-outer'>
                        <div className='field-wrapper-inner'>
                            <i className="fas fa-unlock"></i>
                            <input className='inp' type='password' placeholder='Password' {...register("password", { required: true })} />
                        </div>
                    </div>
                    <button className='logout-btn' type="submit" >Signin </button>
                    
                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && <span>This field is required</span>}
                    
                    
                </form>
            </div>

            {/* Dividier */}
            <div className='divider'></div>
            
            <div>

                <button className='logout-btn' onClick={handleGoogle}>Google SignIn</button>
                {/* <button onClick={handleGoogle}>Google SignIn</button> */}
            </div>

            <p className='naviagte-user'>New user? <Link to='/signup'><span>Click here</span></Link></p>
            
        </div>



        
    );
};

export default Signin;