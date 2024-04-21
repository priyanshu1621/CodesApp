import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

export default function EditCourse() {

    const dispatch = useDispatch();

    //* Here we need the courseId to navigate the my course edit button to
    // edit course part 
    // and we got the course id form the parameter of url which we are sending in the My-course part
    // onClick() components in the Instuctor course inside the CourseTable
    const { courseId } = useParams();
    const { course } = useSelector((state) => state.course);
    const  [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);


    // function to insert the data in first render 
    useEffect(() => {
        const populateCourseDetails = async () => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId, token);
            if (result?.courseDetails) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        }

        // function calling
        populateCourseDetails();
    },[])


    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (

        <div className='text-white'>
            <h1>Edit Course</h1>

            {/* If course data exist then show edit button otherwise not found */}

            <div>
                {
                    course ? (<RenderSteps/>) : (<p>Course Not Found</p>)
                }
            </div>

        </div>

    )
}

