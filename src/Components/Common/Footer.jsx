import React from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { Link } from 'react-router-dom';

import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa';

const Resourses = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code Challenge",
  "Docs",
  "Project",
  "Videos",
  "Workspace",
];

const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className='bg-richblack-800'>

      <div className='flex lg:flex-row gap-8 justify-between items-center text-richblack-400 w-11/12 max-w-maxContent mx-auto relative py-14'>

        <div className='w-[100%] flex flex-col lg:flex-row pb-5 '>
          {/* Section -1 */}
          <div className=' lg:w-[50%] flex flex-row flex-wrap justify-between gap-3'>
            <div className='w-[30%]  flex flex-col lg:w[30%] lg: pl-0 gap-3'>
              <img src={logo} className='object-contain' />

              <h1 className='font-semibold text-[16px] text-richblack-50'>Company</h1>

              <div className='flex flex-col gap-2'>

                {["About", "Careers", "Affiliates"].map((Element, i) => {
                  return (
                    <div>
                      <Link to={Element.toLowerCase()}>{Element}</Link>
                    </div>
                  );
                })}

              </div>


              <div className=' flex gap-3 text-lg'>
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            <div className='mb-7 w-[48%] lg:w-[30%] lg:pl-0 '>
              <h1 className='font-semibold text-[16px] text-richblack-50 '
              >Resources</h1>

              <div className='flex flex-col gap-2 mt-2'>
                {
                  Resourses.map((ele, ind) => {
                    return (
                      <div
                        key={ind}
                        className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                      >
                        <Link to={ele.split(" ").join("-").toLowerCase()}>
                          {ele}
                        </Link>
                      </div>
                    );
                  })
                }
              </div>

              <h1 className='font-semibold text-[16px] text-richblack-50  gap-2 mt-8'>
                Support
              </h1>

              <div className=" gap-2 mt-2 text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
              >
                <Link to={"/help-center"}> Help Center</Link>
              </div>


            </div>


            <div className='mb-7 w-[48%] lg:w-[30%] lg:pl-0 '  >

              <h1 className='font-semibold text-[16px] text-richblack-50 '
              >Plan</h1>

              <div className='flex flex-col gap-2 mt-2'>
                {
                  Plans.map((ele, ind) => {
                    return (
                      <div
                        key={ind}
                        className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                      >
                        <Link to={ele.split(" ").join("-").toLowerCase()}>
                          {ele}
                        </Link>
                      </div>
                    );
                  })
                }
              </div>

              <h1 className='font-semibold text-[16px] text-richblack-50 gap-2 mt-8 '>
                Community
              </h1>

              <div className='flex flex-col gap-2 mt-2' >
                {
                  Community.map((ele, ind) => {
                    return (
                      <div
                        key={ind}
                        className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                      >
                        <Link to={ele.split(" ").join("-").toLowerCase()}>
                          {ele}
                        </Link>
                      </div>
                    );
                  })
                }
              </div>


            </div>


          </div>




        </div>



      </div>







      {/* lower portion */}
      <div>

      </div>


    </div >
  )
}

export default Footer