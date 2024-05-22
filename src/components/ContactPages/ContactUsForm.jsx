import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import CountryCode from '../../data/countrycode.json'

//****************/ React-Hook-Form /**************************** */

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("Logging Data", data)
        try {
            setLoading(true);
            const res = await apiConnector(
                "POST",
                contactusEndpoint.CONTACT_US_API,
                data
            )
            // const response = { status: "ok" };
            // console.log("Logging response", response);
            setLoading(false);
        } catch (error) {
            console.log("Error", error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset, isSubmitSuccessful])


    return (
        <form className="flex flex-col gap-7"
            onSubmit={handleSubmit(submitContactForm)}>

            <div className='flex flex-col gap-5 lg:flex-row '>

                <div className='flex flex-col gap-2 lg:w-[48%]'>


                    {/* FirstName */}

                    <label htmlFor='firstname' className='lable-style'>First Name</label>
                    <input
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter your First Name'
                        className="form-style"
                        //   Register & required field
                        {...register("firstname", { required: true })}

                    />
                    {/* If error occured */}
                    {

                        errors.firstname && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your name
                            </span>
                        )
                    }
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor='lastname' className="lable-style">Last Name</label>
                    <input
                        type='text'
                        name='lastname'
                        id='lastname'
                        className="form-style"
                        placeholder='Enter your last Name'

                        //   Register & required field
                        {...register("lastname", { required: true })}

                    />
                    {/* If error occured */}
                    {

                        errors.lastname && (
                            <span>
                                Please enter your lastname
                            </span>
                        )
                    }

                </div>

            </div>

            {/* email */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='email'>Email Address</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter your Email Address'
                    {...register("email", { required: true })}
                    // className='text-black''
                    className="form-style"
                />
                {
                    errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your Email Address
                        </span>
                    )
                }
            </div>

            {/* Phone no */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='phonenumber'>Phone number</label>

                <div className='flex  gap-5 '>
                    {/* dropdown */}
                    <div className="flex w-[81px] flex-col gap-2">
                        <select
                            name='dropdown'
                            id='dropdown'
                            // className='bg-yellow-50 w-[80px]'
                            className="form-style"
                            {...register("countrycode", { required: true })}
                        >
                            {
                                CountryCode.map((element, index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} - {element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>

                    </div>
                    {/* phonenumber */}

                    <div>
                        <input
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            className="form-style"
                            placeholder='12345 64789'
                            // className='text-black w-[80%]'
                            {...register("phonenumber",
                                {
                                    required: { value: true, message: "Please enter Phone Number" },
                                    maxLength: { value: 10, message: "Invalid Phone Number" },
                                    minLength: { value: 8, message: "Invalid Phone number" }
                                })}
                        />
                    </div>
                </div>

                {
                    errors.phonenumber && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            {errors.phonenumber.message}
                        </span>
                    )
                }
            </div>


            {/* Message Box */}

            <div className='flex flex-col gap-2'>
                <label htmlFor='message'>Message</label>
                <textarea
                    name='message'
                    id='message'
                    cols="30"
                    rows="7"
                    className="form-style"
                    placeholder='Enter your message here'
                    {...register("message", { required: true })}
                // className='text-black'
                />
                {
                    errors.message && (
                        <span>
                            Please enter your message.
                        </span>
                    )
                }
            </div>


            <button type='sumbit' className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                     ${!loading &&
                "transition-all duration-200 hover:scale-95 hover:shadow-none"
                }  disabled:bg-richblack-500 sm:text-[16px] `}
            >
                Send Message
            </button>





        </form>
    )
}

export default ContactUsForm