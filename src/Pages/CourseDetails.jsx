import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import Error from './Error'
import ConfirmationModal from "../components/common/ConfirmationModal"
import RatinngStars from '../components/common/RatingStars'
import { formatDate } from '../services/formatDate'
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';


const CourseDetails = () => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state => state.auth));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { loading } = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course);


    const [courseData, setCourseData] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    useEffect(() => {
        const getCourseFullDetails = async () => {
            try {
                const result = await fetchCourseDetails(courseId);
                console.log("Printing course data", result)
                setCourseData(result);

            } catch (error) {
                console.log("Could not fetch course details")
            }
        }
        getCourseFullDetails()

    }, [courseId])

    const [avgReviewCount, setAverageReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
        setAverageReviewCount(count);
    }, [courseData])


    //  This is the array for which i show the toggle feature in showing the sublecture inside the section 
    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat(id)
                : isActive.filter((e)=> e != id)
        )
    }

    const [totalNoOfLecture, setTotalNoOfLecture] = useState(0);

    useEffect(() => {
        let lectures = 0;
        courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLecture(lectures);
    }, [courseData])


    // To UPDATE
    const handelBuyCourse = () => {

        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch)
            return;
        }
        // Person trying to access page without logining
        setConfirmationModal({
            text1: " you are not Logged in",
            text2: " Please Logging in to purchae the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal("null"),
        })
    }

    if (loading || !courseData) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    // False status
    if (!courseData.success) {
        return (
            <div>
                <Error />
            </div>
        )
    }

    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData.data?.courseDetails



    return (
        <div className='flex flex-col text-white'>
            <div className="relative block max-h-[30rem] lg:hidden">
                <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                <img
                    src={thumbnail}
                    alt="course thumbnail"
                    className="aspect-auto w-full"
                />
            </div>

            <div className='relative flex flex-col justify-start'>
                <p>{courseName}</p>
                <p>{courseDescription}</p>
                <div className='flex gap-x-2'>
                    {!isNaN(avgReviewCount) && (
                        <span><p>{avgReviewCount}</p></span>
                    )}
                    <RatinngStars Review_Count={avgReviewCount} Star_size={24} />
                    <span>{`(${ratingAndReviews.length} reviews) `}</span>
                    <span>{`(${studentsEnrolled.length} students enrolled) `}</span>
                </div>

                <div>
                    <p>Created By {`${instructor.firstName}`}</p>
                </div>

                <div className='flex gap-x-3'>
                    <p>
                        Created At  {formatDate(createdAt)}
                    </p>
                    <p>
                        {" "} English
                    </p>
                </div>

                <div>
                    <CourseDetailsCard
                        course={courseData?.data?.courseDetails}
                        setConfirmationModal={setConfirmationModal}
                        handelBuyCourse={handelBuyCourse}
                    />
                </div>

            </div>

            <div>
                <div>
                    <p>Course Content</p>
                </div>

                <div className='flex flex-col gap-x-4  justify-between'>
                    <div>
                        <spn>{courseContent.length} section(s)</spn>
                        <span>
                            {totalNoOfLecture} lectures 
                        </span>
                        <span>
                            { courseData.data?.totalDuration }   total length
                        </span>
                    </div>

                    <div>
                        {/* Is active array is empty then it will not open the section deatisl if not then open the section */}
                        <button
                            onClick={() => setIsActive([])}
                        >
                            Collapse all Sections
                        </button>
                    </div>

                </div>
            </div>





            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>


    )
}

export default CourseDetails