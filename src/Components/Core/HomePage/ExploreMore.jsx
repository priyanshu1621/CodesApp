import React, { useState } from 'react'
import { HomePageExplore } from "../../../data/homepage-explore"
import HighLightText from './HighLightText';


const tabsName = [
    "Free",
    "New to Coding",
    "Most Popular",
    "Skills paths",
    "Career paths",
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);


    const setMyCard = (value) => {
        setCurrentCard(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (

        <div >

            <div className='text-4xl font-semibold  text-center'>
                Unlock the
                <HighLightText text={"Power of code"} />
            </div>

            <div className='text-center text-richblack-300  text-md  text-[16px] mt-3'>
                Learn to build anything you can imagine
            </div>

            <div className=' mt-5 flex flex-row rounded-full bg-richblack-800 mb-5 border-richblack-100 px-1 py-1'>
                {
                    tabsName.map((element, index) => {
                        return (
                            <div
                                className={`flex flex-row text-[16px] items-center gap-2
                                ${currentTab === element
                                        ? "bg-richblack-900 text-richblack-5 font-medium "
                                        : "text-richblack-200 "} rounded-full transition-all duration-200 cursor-Pointer 
                                    hover:bg-richblack-900 hover: text-richblack-5 px-7 py-2 `
                                }
                                key={index}
                                onClick={() => setMyCard(element)}
                            >
                                
                                {element}

                            </div>
                        )
                    })
                }
            </div>


            {/* <div className='lg: h-[150px] '> </div>

            <div className='absolute '>
                {

                    courses.map((element, index) => {
                        return (
                            <CourseCard
                                key={index}
                                cardData={currentCard}
                                setCurrentCard = {setCurrentCard}
                            />
                        )
                    })
                }
            </div> */}
        </div >
    )
}

export default ExploreMore