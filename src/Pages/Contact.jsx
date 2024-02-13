// import React from 'react'

// import ContactUsForm from '../components/ContactPages/ContactUsForm'

// const ContactUs = () => {
//   return (
//     <div className='flex lg:flex-row mx-auto w-11/12 max-w-maxContent mt-[120px] gap-10'>

//       <div className='flex flex-col bg-richblack-600 w-[40%] gap-8 h-[400px]'>

//         <div className='flex flex-col'>
//           <img alt='mesg' />
//           <h2>Chat on Us</h2>
//           <p>Our friendly team is here to help</p>
//           <p>info@gmail.com</p>
//         </div>

//         <div>
//           <img alt='world' />
//           <h2>Visit Us</h2>
//           <p>Our friendly team is here to help</p>
//           <p>info@gmail.com</p>
//         </div>

//         <div>
//           <img alt='call us' />
//           <h2>Visit Us</h2>
//           <p>Our friendly team is here to help</p>
//           <p>info@gmail.com</p>
//         </div>

//       </div>


//       <div className='flex flex-col items-center text-white border-collapse rounded-lg border py-8  w-[600px] '>

//         <div>
//           <h1 className="text-xl">Got Idea? we've got the skills.</h1>
//           <h1 className="text-xl">Let's team up</h1>

//           <p className='text-sm  text-richblack-200'>Talk more about yourself and what your're got in mind</p>
//         </div>


//         {/* Form page */}


//         <div className='mt-7'>

//           <ContactUsForm />

//         </div>



//       </div>



//     </div>
//   )
// }

// export default ContactUs



import React from 'react'
import ContactDetails from '../components/ContactPages/ContactDetails'
import ContactForm from '../components/ContactPages/ContactForm'
import Footer from '../components/common/Footer';

const Contact = () => {
  return (
    <div>

      <div className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row '>
        <div className='lg:w-[40%]' >
          <ContactDetails />
        </div>

        {/* contactForm */}

        <div className='lg:w-[60%]' >
          <ContactForm />
        </div>
      </div>

      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
      </div>
      <Footer/>

    </div>
  )
}

export default Contact