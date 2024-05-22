import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import bannerImage1 from '../assets/Images/aboutus1.webp'
import bannerImage2 from '../assets/Images/aboutus2.webp'
import bannerImage3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/AboutPage/Quote';
import FoundingStory from '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/core/AboutPage/Stats';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import ContactFormSection from '../components/core/AboutPage/ContactFormSection';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider'

const About = () => {
    return (
        <div >

            {/* /Section 1 */}
            <section className="bg-richblack-700">
                <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
                    <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
                        Driving Innovation in Online Education for a
                        <HighlightText text={"Brighter Future"} />
                        <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
                            CodeApp is at the forefront of driving innovation in online education . we're passionate about creating a brighter future by offering cutting-edge course,
                            passionate about creating a brighter future by offering cutting-edge course,
                            leveraging emerging techmologiest, and nurturing a vibrant learing commonly
                        </p>
                    </header>
                    <div className="sm:h-[70px] lg:h-[150px]"></div>

                    <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
                        <img src={bannerImage1} alt='banner1' />
                        <img src={bannerImage2} alt='banner2' />
                        <img src={bannerImage3} alt='banner3' />
                    </div>
                </div>
            </section>

            {/* section2 */}

            <section className="border-b border-richblack-700">
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
                    <div className="h-[100px] "></div>
                    <Quote />
                </div>
            </section>


            {/* <Section 3 */}
            <section >
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">

                    {/*Founding story div  */}
                    <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">

                        {/* Founding Story Left box */}

                        <div className="my-24 flex lg:w-[50%] flex-col gap-10">
                            <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                                Qur Founding Story</h1>

                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            </p>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                            </p>
                        </div>

                        <div>
                            <img src={FoundingStory}
                                className="shadow-[0_0_20px_0] shadow-[#FC6767]" />

                        </div>
                    </div>

                    {/*  vision and mission wala parent div*/}
                    <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
                        <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                                Our Vision
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                        </div>

                        {/* RightBox */}
                        <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                                Our Mission
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* <section 4 */}
            <StatsComponent />


            {/* Section 5 */}
            <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
                <LearningGrid />
                <ContactFormSection />
            </section>

            {/* section 6 */}
            <section className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                <div>
                    <h1 className="text-center text-4xl font-semibold mt-8">
                        Reviews from other learners
                    </h1>
                    {/* <ReviewSlider/> */}
                    <ReviewSlider/>
                </div>
            </section>

            {/* section -7 */}

            <section>
                <Footer />
            </section>


        </div>
    )
}

export default About