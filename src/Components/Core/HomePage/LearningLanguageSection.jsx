import React from 'react';
import HighLightText from './HighLightText';

import Compare_with_others from '../../../assets/Images/Compare_with_others.png'
import knowYoyrProgress from '../../../assets/Images/Know_your_progress.png'
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'

import CTAButton from "./Button";



const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-36'>
      <div className='flex flex-col gap-5  items-center'>

        <div className='text-4xl font-semibold text-center'>
          Your Swiss Knife For
          <HighLightText text={"learning any language"} />
        </div>

        <div className='text-center text-richblue-600 mx-auto text-base mt-3 font-medium w-[70%]'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-row items-center justify-center mt-5'>

          <img src={knowYoyrProgress}
            alt='know your progress'
            className='object-contain -mr-32'
          />

          <img src={Compare_with_others}
            alt='know your progress'
            className='object-contain '
          />

          <img src={Plan_your_lessons}
            alt='know your progress'
            className='object-contain -ml-36'
          />

        </div>


        <div className='w-fit'>
          <CTAButton active={true} linkto={"/signup"}>
            
            <div>
              Learn More
             </div>

            </CTAButton >
        </div>

        

      </div>
    </div>
  )
}

export default LearningLanguageSection