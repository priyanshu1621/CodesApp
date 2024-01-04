import React from 'react'
import { Link, matchPath } from 'react-router-dom';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsCart } from "react-icons/bs";
import Button from '../Core/HomePage/Button';
import ProfileDropDown from '../Core/HomePage/Auth/ProfileDropDown';


const Navbar = () => {

    // to fetch the all states of redux
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);


    // Function by which links color changes
    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }


    return (

        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>

            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

                {/* Imaage logo */}
                <Link to="/">
                    <img src={logo} width={160} height={42} loading='lazy' />
                </Link>

                {/* NavLink links  */}

                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>

                        {/* Listing tha data in the from NavbarLinks to Nav */}
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? (<div></div>) : (
                                            <Link to={link?.path}>

                                                {/* Created a function which handel the color of cliking path and the default color of links */}

                                                <p className={`${matchRoute(link?.path) ? "text-yellow-25" :
                                                    "text-richblack-25"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            )
                            )
                        }
                    </ul>

                </nav>


                {/* Login / SignUp / Dashboard */}
                {/* here we link the back-end with front-end > as we want the data of user here like login ,signup .
                this can be done using slices reducers by using redux-tool kit */}

                <div className='flex gap-x-4 items-center '>

                    {
                        user && user?.accountType != "Instructor" && (
                            // !HW  -> Add styling to this cart --------------------------------------------------------------------------------------------------------------------------
                            < Link to="/dashboard/cart" className='relative'>
                                <BsCart />
                                {/* Count ->cart items */}
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }

                                {/* If token null then Show login and signUp button */}
                                {
                                    token === null && (
                                        <Link to="/login" >
                                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] 
                                            text-richblack-100 rounded-md'>
                                                Log in
                                            </button>
                                        </Link>
                                    )
                                }

                                {
                                    token === null && (
                                        <Link to="/signup">
                                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] 
                                            text-richblack-100 rounded-md'>
                                                Sign Up
                                            </button>
                                        </Link>
                                    )
                                }

                                {
                                    token !== null && <ProfileDropDown/>
                                }

                            
                        )
                    

                </div>



            </div>

        </div >
    )
}

export default Navbar