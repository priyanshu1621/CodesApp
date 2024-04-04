import React from 'react';
import { useSelector } from 'react-redux';
import { FaCheck } from 'react-icons/fa';
import CourseInformationForm from './CourseInformation/CourseInformationForm.jsx';
import CourseBuilderForm from './courseBuilder/courseBuilderForm.jsx';


const RenderSteps = () => {
    const { step } = useSelector((state) => state.course);

    const steps = [
        {
            id: 1,
            title: 'Course Information',
        },
        {
            id: 2,
            title: 'Course Builder',
        },
        {
            id: 3,
            title: 'Publish',
        },
    ];

    return (
        <>
            <div>
                {steps.map((item) => (
                    <div key={item.id}>
                        <div
                            className={`${
                                step === item.id
                                    ? 'bg-yellow-900 border-yellow-800 text-yellow-50'
                                    : 'border-richblack-700 bg-richblack-800 text-richblack-300'
                            }`}
                        >
                            {step > item.id ? <FaCheck /> : item.id}
                        </div>
                    </div>
                ))}
            </div>

            <div>
                {steps.map((item) => (
                    <div key={item.id}>
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>

            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm />}
             {/* {step === 3 && <PublishCourse />  */}
        </>
    );
};

export default RenderSteps;
