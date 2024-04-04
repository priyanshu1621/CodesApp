import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { get, useForm } from 'react-hook-form';
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import ChipInput from './Tags';
import RequirementFiled from './RequirementFiled';
import IconBtn from '../../../../common/IconBtn';
import { setStep, setCourse } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';

const CourseInformationForm = () => {


  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },

  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  // Course dropdown fetch data
  const [courseCategories, setCourseCategories] = useState([]);



  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();

      // checking the conditions
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    }


    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirement", course.instructions);
      setValue("courseImage", course.thumbnail);
    }



    getCategories();
  }, [])


  const isFormUpdated = () => {

    const currentValue = getValues();
    // comparing the current and the course name value
    if (currentValue.courseTitle !== course.courseName ||
      currentValue.courseShortDesc !== course.courseDescription ||
      currentValue.coursePrice !== course.price ||
      // currentValue.courseTags.toString() !== course.tag.toString() ||
      currentValue.courseBenefits !== course.whatYouWillLearn ||
      currentValue.courseCategory._id !== course.category._id ||
      // currentValue.courseImage !== course.thumbnail || 
      currentValue.courseRequirement.toString() !== course.instructions.toString())
      return true;
    else {
      return false;
    }

  }

  // handel the next button click
  const onSubmit = async (data) => {

    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseDescription);
        }

        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.courseTitle);
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }


        if (currentValues.courseCategory._id !== course.courseCategory._id) {
          formData.append("courseName", data.courseCategory);
        }

        if (currentValues.courseRequirement.toString() !== course.instructions.toString()) {
          formData.append("courseName", JSON.stringify(data.courseRequirement));
        }
        //! Hw for image and tags 

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          setStep(2);
          dispatch(setCourse(result));
        }
      }
      else {
        toast.error("No change were made to the form");
      }
      console.log("Printing FORMDATA", formData);
      console.log("Printing result", result);
      return;
    }

    // create a new course
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instruction", JSON.stringify(data.courseRequirement));
    formData.append("status", COURSE_STATUS.DRAFT);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      setStep(2);
      dispatch(setCourse(result));
    }
    setLoading(false);
    console.log("Printing FORMDATA", formData);
    console.log("Printing result", result);

  }


  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
    >

      <div>
        <label htmlFor='courseTitle'>Course Title<sup>*</sup></label>
        <input
          id='courseTitle'
          placeholder='Enter Course Title'
          {...register("courseTitle", { required: true })}
          className='w-full'
        />
        {
          errors.courseTitle && (
            <span>Course Title is required**</span>
          )
        }
      </div>

      <div>
        <label htmlFor='courseShortDesc'>Course Short Course Description<sup>*</sup></label>
        <textarea
          id='courseShortDesc'
          placeholder='Enter Description'
          {...register("courseShortDesc", { required: true })}
          className='min-h-[140px] w-full'
        />
        {
          errors.courseShortDesc && (
            <span>Course Description is required**</span>
          )
        }
      </div>


      <div className='relative'>
        <label htmlFor='coursePrice'>Course Price<sup>*</sup></label>
        <textarea
          id='coursePrice'
          placeholder='Enter Course Price'
          {...register("coursePrice", { required: true })}
          className=' w-full'
        />

        <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400' />
        {
          errors.coursePrice && (
            <span>Course Price is required**</span>
          )
        }
      </div>


      <div className='t'>
        <label htmlFor='courseCategory'>Course Category<sup>*</sup></label>
        <select
          id='courseCategory'
          defaultValue=""
          {...register("courseCategory", { required: true })}
        >
          <option value="" disabled>Choose a category</option>
          {!loading && courseCategories.map((category, index) => (
            <option key={index} value={category?._id} className='text-black'>
              {category?.name}
            </option>
          ))}
        </select>
        {errors.courseCategory && (
          <span>Course Category is required**</span>
        )}
      </div>

      {/* //!HW   create a custom components for tags inputs */}
      {/* <ChipInput htmlFor='courseTags'
        label="  tag"
        name="courseTags"
        placeholder="Enter tags and press enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      
      /> */}

      {/* //!HW thumbnail -> create a components for upload thumbnail */}
      {/* <Upload 
          htmlFor=
        name=
        label=
        register={ }
        errors=
        setValue={}
      /> */}


      {/* Befefits of course */}
      <div>
        <label htmlFor='courseBenefits'>Benefits of the course<sup>**</sup></label>
        <textarea
          id='courseBenefits'
          placeholder='Enter benefits of the course'
          {...register("courseBenefits", { required: true })}
          className='min-h-[130px] w-full'
        />
        {errors.courseBenefits && (
          <span>
            Benefits of the courese are required
          </span>
        )}
      </div>

      {/* Requrement  */}

      <RequirementFiled htmlFor='coureseRequirement'
        name="coureseRequirement"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}


      />


      <div>

        {
          editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              className='flex items-center gap-x-2 bg-richblack-300'
            >
              continue Without Saving
            </button>
          )

        }

        <IconBtn
          text={!editCourse ? "Next" : "Save Changes"}
        />

      </div>


    </form>
  )
}

export default CourseInformationForm