import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighLightText from "../Components/Core/HomePage/HighLightText";
import CTAButton from "../Components/Core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../Components/Core/HomePage/CodeBlocks";
import TimelinesSection from "../Components/Core/HomePage/TimelinesSection";
import LearningLanguageSection from "../Components/Core/HomePage/LearningLanguageSection";
import InstructorSecton from "../Components/Core/HomePage/InstructorSecton";
import ExploreMore from "../Components/Core/HomePage/ExploreMore";
import Footer from "../Components/Common/Footer";
// import blob from '../assets/Images/blob.svg';


// import { TypeAnimation } from "react-type-animation";


const Home = () => {
    return (
        <div>
            {/* Section 1 */}

            <div className="relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between">
                <Link to={"/signup"}>
                    <div className="group mx-auto rounded-full bg-richblack-800 text-richblack-200 transition-all duration-200 hover:scale-95 w-fit mt-16">
                        <div
                            className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all 
                        duration-200 group-hover:bg-richblack-900"
                        >
                            <p>Become an Instructor </p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                {/* Heading */}
                <div className="text-center text-4xl font-semibold mt-7">
                    Enpower your Future with
                    <HighLightText text={" Coding Skills"} />
                </div>
                <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblue-300">
                    With our online coding courses, you can learn at your own pace, from
                    anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized
                    feedback from instructors.
                </div>

                <div className="flex flex-row gap-7 mt-8">
                    {/* call to action btn */}
                    <CTAButton active={true} linkto={"/signup"}>
                        learn more
                    </CTAButton>

                    <CTAButton active={false} linkto={"/login"}>
                        Book a demo
                    </CTAButton>
                </div>

                {/* HomePage video  */}
                <div className="mx-3 my-12 shadow-blue-200 border_img    ">
                    <video muted loop autoPlay >
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                {/* code Section 1 */}

                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock your
                                <HighLightText text={"coding potential"} />
                                with our online courses
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabutton1={{
                            btnText: "Try it yourself",
                            linkto: "/signup",
                            active: true,
                        }}
                        ctabutton2={{
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }}
                        
                         
                        

                        codeblocks={`<!DOCTYPE html>\n<head>\n<title>\n Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n <body> \n < h1><ahref="/">Header</a>\n</h1> \n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a> \n</nav>`}

                        codeColor={"text-yellow-25"}
                    />
                </div>

                {/* code Section 2 */}

                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock your
                                <HighLightText text={"coding potential"} />
                                with our online courses
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabutton1={{
                            btnText: "Try it yourself",
                            linkto: "/signup",
                            active: true,
                        }}
                        ctabutton2={{
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }}
                        codeblocks={`<!DOCTYPE html>\n<head>\n<title>\n Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n <body> \n < h1><ahref="/">Header</a>\n</h1> \n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a> \n</nav>`}

                        codeColor={"text-yellow-25"}
                    />
                </div>

                
                <ExploreMore />
                
            </div>

            {/* Section 2 */}
            {/* Here we added the image in the bg and use the CTAbutton components and also create d the div to accupity te space  */}

            <div className="bg-pure-greys-5 text-richblack-700" >
                <div className='homepage_bg h-[310px]'>

                    <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
                        <div className="h-[150px]"></div>
                        <div className="flex flex-row gap-7 text-white">
                            <CTAButton active={true} linkto={"/signup"}>

                                <div className="flex items-center gap-3">
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>

                            </CTAButton>
                            <CTAButton active={false} linkto={"/signup"}>

                                <div >
                                    Learn More
                                </div>

                            </CTAButton>
                        </div>

                    </div>
                </div>


                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">

                    <div className="flex flex-row gap-5 mb-10 mt-[95px]">
                        <div className="text-4xl font-semibold w-[45%]">
                            Get The skills you need for a
                            <HighLightText text={"Job that is in demanded."} />
                        </div>

                        <div className="flex flex-col gap-10 w-[40%] items-start">
                            <div className="text-[16px]">
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more
                                than professional skills.
                            </div>

                            <CTAButton active={true} linkto={"/signup"}>

                                <div className="flex items-center gap-3">
                                    Learn More
                                    <FaArrowRight />
                                </div>

                            </CTAButton>


                        </div>
                    </div>



                    <TimelinesSection />

                    <LearningLanguageSection />

                </div>

            
            
            </div>

            {/* Section 3 */}

            <div className="w-11/12 mx-auto max-w-maxContent flex flex-col  items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
                        
                
                <InstructorSecton />
            
                <h2 className="text-center text-4xl font-semibold mt-10 ">Review From Others Learners</h2>
                
                {/*HW:  Review Sliders Here */}

            </div>

            {/*Footer */}
            <Footer/>


        </div >

    );
};

export default Home;
