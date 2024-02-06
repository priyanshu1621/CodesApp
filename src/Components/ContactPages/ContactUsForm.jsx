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
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = { status: "ok" };
            console.log("Logging response", response);
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
        <form onSubmit={handleSubmit(submitContactForm)}>

            <div className='flex flex-col gap-14 '>

                <div className='flex  gap-5'>


                    {/* FirstName */}
                    <div className='flex flex-col'>
                        <label htmlFor='firstname'>First Name</label>
                        <input
                            type='text'
                            name='firstname'
                            id='firstname'
                            placeholder='Enter your First Name'

                            //   Register & required field
                            {...register("firstname", { required: true })}
                            className='text-black'
                        />
                        {/* If error occured */}
                        {

                            errors.firstname && (
                                <span>
                                    Please enter your name
                                </span>
                            )
                        }

                    </div>

                    {/* Last Name */}
                    <div className='flex flex-col '>
                        <label htmlFor='lastname'>First Name</label>
                        <input
                            type='text'
                            name='lastname'
                            id='lastname'
                            placeholder='Enter your last Name'

                            //   Register & required field
                            {...register("lastname", { required: true })}
                            className='text-black'
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
                <div className='flex flex-col'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter your Email Address'
                        {...register("email", { required: true })}
                        className='text-black'
                    />
                    {
                        errors.email && (
                            <span>
                                Please enter your Email Address
                            </span>
                        )
                    }
                </div>

                {/* Phone no */}
                <div className='flex flex-col '>
                    <label htmlFor='phonenumber'>Phone number</label>

                    <div className='flex flex-row gap-1 '>
                        {/* dropdown */}

                        <select
                            name='dropdown'
                            id='dropdown'
                            className='bg-yellow-50 w-[80px]'
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


                        {/* phonenumber */}

                        <input
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            // placeholder='12345 64789'
                            className='text-black w-[80%]'
                            {...register("phonenumber",
                                {
                                    required: { value: true, message: "Please enter Phone Number" },
                                    maxLength: { value: 10, message: "Invalid Phone Number" },
                                    minLength: { value: 8, message: "Invalid Phone number" }
                                })}
                        />
                    </div>

                    {
                        errors.phonenumber && (
                            <span>
                                {errors.phonenumber.message}
                            </span>
                        )
                    }
                </div>


                {/* Message Box */}

                <div className='flex flex-col'>
                    <label htmlFor='message'>Message</label>
                    <textarea
                        name='message'
                        id='message'
                        cols="30"
                        rows="7"
                        placeholder='Enter your message here'
                        {...register("message", { required: true })}
                        className='text-black'
                    />
                    {
                        errors.message && (
                            <span>
                                Please enter your message.
                            </span>
                        )
                    }
                </div>


                <button type='sumbit' className='rounded-md bg-yellow-50 text-center 
                 px-6 text-[16px] font-bold text-black'>
                    Send Message
                </button>


            </div>


        </form>
    )
}

export default ContactUsForm