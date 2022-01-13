import React from 'react';
import signinBanner from '../../images/signin-banner.jpg'
import { useForm } from "react-hook-form";
import useFirebase from '../../Hooks/useFirebase';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Signup = () => {
    const nevigate=useNavigate();
    const location = useLocation();
    const {signInUsingGoogle, registerUser} = useFirebase();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const { email, name, password ,password2} = data;
        if(password!==password2){
             Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password is not matched!',
                  
                  })
        }
        else{

        registerUser(email, password, name, nevigate,location);
        }
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
                <h2 className='site-title'>SIGN UP</h2>
            </div>
            {/* Signin Banner */}
            <div>
                <img className='banner-img' src={signinBanner} alt="Banner" />
            </div>

            {/* Signup form */}
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                   {/* Name */}
                    <div className='field-wrapper-outer margin-b' style={{marginTop:'15px'}}>
                        <div className='field-wrapper-inner'>
                            <i className="fas fa-user"></i>
                            <input className='inp' type='text' placeholder='Name' {...register("name")} />
                        </div>
                    </div>
                    {/* Email */}
                    <div className='field-wrapper-outer margin-b'>
                        <div className='field-wrapper-inner'>
                            <i className="fas fa-envelope-open"></i>
                            <input className='inp' type='email' placeholder='Email' {...register("email")} />
                        </div>
                    </div>
                    {/* Password */}
                    <div className='field-wrapper-outer margin-b'>
                        <div className='field-wrapper-inner'>
                            <i className="fas fa-unlock"></i>
                            <input className='inp' type='password' placeholder='Password' {...register("password", { required: true })} />
                        </div>
                    </div>
                    {/* confirm Password */}
                    <div className='field-wrapper-outer margin-b'>
                        <div className='field-wrapper-inner'>
                            <i className="fas fa-unlock"></i>
                            <input className='inp' type='password' placeholder='Confirm Password' {...register("password2", { required: true })} />
                        </div>
                    </div>
                   
                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && <span>This field is required</span>}
                    {/* Signup */}
                    <button className='logout-btn' type="submit"> Signup </button>
                </form>
            </div>

            {/* Dividier */}
            <div className='divider'></div>
            
            {/* Text */}
            <p className='naviagte-user'>Already have an account? <Link to='/signin'><span>Click here</span></Link></p>
            
        </div>
    );
};

export default Signup;