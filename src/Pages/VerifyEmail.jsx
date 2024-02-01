import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import OTPInput from 'react-otp-input'

import signupData from '../slices/authSlice';
import { sendOtp, signUp } from "../services/operations/authAPI";


const VerifyEmail = () => {

    const [otp, setOtp] = useState("");
    const { signupData, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, [])



    const handleVerifyAndSignup = (e) => {
        e.preventDefault();
        const {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        } = signupData;
    
        dispatch(
          signUp(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
          )
        );
      };

    return (
        <div className='text-white items-center justify-center mt-[250px] ml-[350px]'>

            {
                loading
                    ? (<div>
                        Loading
                    </div>)
                    : (
                        <div>
                            <h1>Verify Email</h1>

                            <p>
                                A verification code has been sent to you Enter the code below
                            </p>

                            <form onSubmit={handleVerifyAndSignup}>
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props}  className='bg-richblack-600'/>}
                                />
                                <button type='submit'>
                                    Verify Email
                                </button>
                            </form>


                            <div>

                                <div>
                                    <Link to='/login'>
                                        Back to login
                                    </Link>
                                </div>

                                <button
                                    onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                                >
                                    Resend it
                                </button>
                            </div>

                        </div>
                    )
            }


        </div>
    )
}

export default VerifyEmail