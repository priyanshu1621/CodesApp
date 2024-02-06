import React from 'react'
import ContactUsForm from '../../ContactPages/ContactUsForm'


const ContactFormSection = () => {
  return (
      <div className='mx-auto'>

          <h1>Get In Touch</h1>
          
          <p>
              We'd love to here for you, please fill out this form.
          </p>

          <div className='mx-auto flex flex-col items-center justify-between gap-5 mb-[14px]'>
              <ContactUsForm/>
          </div>
      </div>
  )
}

export default ContactFormSection
