import React from 'react'
import ContactUsForm from '../components/ContactPages/ContactUsForm'

const ContactUs = () => {
  return (
    <div className='flex lg:flex-row mx-auto w-11/12 max-w-maxContent mt-[120px] gap-10'>

      <div className='flex flex-col bg-richblack-600 w-[40%] gap-8 h-[400px]'>

        <div className='flex flex-col'>
          <img alt='mesg' />
          <h2>Chat on Us</h2>
          <p>Our friendly team is here to help</p>
          <p>info@gmail.com</p>
        </div>

        <div>
          <img alt='world' />
          <h2>Visit Us</h2>
          <p>Our friendly team is here to help</p>
          <p>info@gmail.com</p>
        </div>

        <div>
          <img alt='call us' />
          <h2>Visit Us</h2>
          <p>Our friendly team is here to help</p>
          <p>info@gmail.com</p>
        </div>

      </div>


      <div className='flex flex-col items-center text-white border-collapse rounded-lg border py-8  w-[600px] '>

        <div>
          <h1 className="text-xl">Got Idea? we've got the skills.</h1>
          <h1 className="text-xl">Let's team up</h1>

          <p className='text-sm  text-richblack-200'>Talk more about yourself and what your're got in mind</p>
        </div>


        {/* Form page */}


        <div className='mt-7'>

          <ContactUsForm />

        </div>



      </div>



    </div>
  )
}

export default ContactUs