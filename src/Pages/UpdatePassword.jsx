import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { loading } = useSelector((state) => state.auth);

    const { password, confirmPassword } = formData;


    const handelOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value,
            })
        )
    }


    const handelOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    }

    return (
        <div className='text-white'>
            {
                loading ? (
                    <div>
                        Loading...
                    </div>
                ) : (

                    <div>
                        <h1>Choose new Password</h1>
                        <p>Almost done. Enter your new password and you're all set</p>

                        <form onSubmit={handelOnSubmit}>

                            <label>
                                <p>New Password</p>
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    value={password}
                                    onChange={handelOnChange}
                                    placeholder=' Password'
                                    className='w-full p-6 bg-richblack-600 text-richblack-5'
                                />

                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {
                                        showPassword
                                            ? <FaRegEyeSlash fonstSize={24} />
                                            : <FaRegEye fonstSize={24} />
                                    }
                                </span>
                            </label>


                            <label>
                                <p>ConfirmNew Password</p>
                                <input
                                    required
                                    type={showConfirmPassword ? "text" : "password"}
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={handelOnChange}
                                    placeholder='Confirm Password'
                                    className='w-full p-6 bg-richblack-600 text-richblack-5'
                                />

                                <span
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                >
                                    {
                                        showConfirmPassword
                                            ? <FaRegEyeSlash fonstSize={24} />
                                            : <FaRegEye fonstSize={24} />
                                    }
                                </span>
                            </label>


                            <button type='submit'>

                                ResetPassword

                            </button>

                            <div>
                                <Link to="/login">
                                    <p>Back to Login</p>
                                </Link>
                            </div>

                        </form>

                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword