import React, { useEffect, useState } from 'react'
import viewCourseSlice from '../../../../../slices/viewCourseSlice'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import Upload from '../Upload'
import IconBtn from '../../../../common/IconBtn'

export default function SubSectionModal ({

    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,

}) {


    // form 
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues,

    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, []);

    const isFormUpdated = () => {
        const currentValue = getValues();
        if (currentValue.lectureTitle !== modalData.title ||
            currentValue.lectureDesc !== modalData.description ||
            currentValue.lectureVideo !== modalData.videoUrl) {
            return true;
        }
        else {
            return false;
        }
    }


    // handel edit subsection
    const handelEditSubSection = async () => {

        const currentValue = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        // Appending
        if (currentValue.lectureTitle !== modalData.title) {
            formData.append("title", currentValue.lectureTitle);
        }
        if (currentValue.lectureDesc !== modalData.description) {
            formData.append("description", currentValue.lectureDesc);
        }
        if (currentValue.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValue.videoUrl);
        }

        setLoading(true);
        // API calling
        const result = await updateSubSection(formData, token);
        if (result) {
            // TODO same check

            // upadating course data in the new objects course variable
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData.sectionId ? result : section);

            // updating in the slice course by creating the new object
            const updatedCourse = {
                ...course, courseContent: updatedCourseContent
            };

            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);


    }

    // onsubmit
    const onSubmit = async (data) => {

        // when we only click on view button we no need to do any things only show the page'
        if (view)
            return;

        // in edit
        if (edit) {
            if (!isFormUpdated) {
                toast.error("No changes made to the form ");
            }
            else {
                // edit in the form 
                handelEditSubSection();
            }
            return;
        }

        // ADD call
        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc)
      formData.append("video", data.lectureVideo)
      
      console.log("Form data in subsectionModal", formData);
        setLoading(true);


        // API call create subsection
        const result = await createSubSection(formData, token);

        if (result) {
            // TODO  chek for updation

            // upadating course data in the new objects course variable
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData ? result : section);

            // updating in the slice course by creating the new object
            const updatedCourse = {
                ...course, courseContent: updatedCourseContent
            };


            dispatch(setCourse(updatedCourse));
        }
        // closing modal
        setModalData(null);
        setLoading(false);
    }



    return (
        <div>
            {/* creating the UI for the modals edit , add section , view section */}
            <div>
                <div>
                    <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lectures</p>
                    <button onClick={() => (!loading ? setModalData(null) : {})}>
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>

                {/* Form page on modal */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Upload components */}
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />
                    <div>
                        <label>Lecture Title</label>
                        <input
                            id='lectureTitle'
                            placeholder="Enter Lecture Title"
                            {...register("lectureTitle", { required: true })}
                            className='w-full'
                        />
                        {errors.lectureTitle && (<span>
                            Lecture Title is required
                        </span>)}
                    </div>
                    <div>
                        <label>Lecture Description</label>
                        <textarea
                            id='lectureDesc'
                            placeholder='Enter Lecture Description'
                            {...register("lectureDesc", { required: true })}
                            className='w-full min-h-[130px]'
                        />
                        {
                            errors.lectureDesc && (<span>
                                Lecture Description is required
                            </span>)
                        }
                    </div>

                    {
                        !view && (
                            <div>
                                <IconBtn
                                    text={loading ? "Loading..." : edit ? "Save changes" : "Save"}
                                />
                            </div>
                        )
                    }

                </form>

            </div>


        </div>
    )
}

