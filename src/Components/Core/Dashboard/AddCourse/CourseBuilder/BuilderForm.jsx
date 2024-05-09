import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { MdAddCircleOutline } from 'react-icons/md';
import { BiRightArrow } from 'react-icons/bi';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';
import { MdNavigateNext } from "react-icons/md"


const BuilderForm = () => {

    // importing the required things
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const { course } = useSelector((state) => state.course);







    // On submit
    const onSubmit = async (data) => {


        // console.log("Data in the builder form ", data);



        setLoading(true);
        let result;

        if (editSectionName) {
            // we are editing the sectionName
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id,
                }, token
            )
        } else {


            // console.log("Course id in builder form ", course._id);



            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id,
            }, token)
        }

        // Value update
        if (result) {
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", "");
        }

        // loading false
        setLoading(false);
    }

    // createing flag for editsection btn and create section 
    const [editSectionName, setEditSectionName] = useState(null)

    // Cnacel edit button 
    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName", "")
    }

    // Go Back btn function
    const goBack = () => {
        dispatch(setStep(1))
        dispatch(setEditCourse(true));
    }

    const goToNext = () => {
        //  here we are checking the validation that coure atleast have one section and subSection
        if (course.courseContent.length === 0) {
            toast.error("Please add atleast one section")
            return
        }
        if (
            course.courseContent.some((section) => section.subSection.length === 0)
        ) {
            toast.error("Please add atleast one lecture in each section")
            return
        }
        // if ecverything is  good go to nexrt step
        dispatch(setStep(3));
    }




    // Nested loop -> edit section function
    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEdit();
            return;
        }

        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    }



    return (
        <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="sectionName">
                        Section Name <sup className="text-pink-200">*</sup>
                    </label>
                    <input
                        id="sectionName"
                        disabled={loading}
                        placeholder="Add a section to build your course"
                        {...register("sectionName", { required: true })}
                        className="form-style w-full"
                    />
                    {errors.sectionName && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Section name is required
                        </span>
                    )}
                </div>
                {/* create sectin add button */}

                <div className="flex items-end gap-x-4">
                    <IconBtn
                        type="submit"
                        disabled={loading}
                        text={editSectionName ? "Edit Section Name" : "Create Section"}
                        outline={true}
                    >
                        <MdAddCircleOutline size={20} className="text-yellow-50" />
                    </IconBtn>
                    {editSectionName && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="text-sm text-richblack-300 underline"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            {
                // section state chanfe in coursebuilder
                course?.courseContent?.length > 0 && (
                    <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
                )
            }

            <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <IconBtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>

        </div>
    )
}

export default BuilderForm