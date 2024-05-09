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

export default function SubSectionModal({

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
        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
                {/* Modal Header */}
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">
                        {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
                    </p>
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
                    {/* Lecture Title */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
                            Lecture Title {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <input
                            disabled={view || loading}
                            id="lectureTitle"
                            placeholder="Enter Lecture Title"
                            {...register("lectureTitle", { required: true })}
                            className="form-style w-full"
                        />
                        {errors.lectureTitle && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture title is required
                            </span>
                        )}
                    </div>

                    {/* Lecture Description */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
                            Lecture Description{" "}
                            {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <textarea
                            disabled={view || loading}
                            id="lectureDesc"
                            placeholder="Enter Lecture Description"
                            {...register("lectureDesc", { required: true })}
                            className="form-style resize-x-none min-h-[130px] w-full"
                        />
                        {errors.lectureDesc && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture Description is required
                            </span>
                        )}
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

