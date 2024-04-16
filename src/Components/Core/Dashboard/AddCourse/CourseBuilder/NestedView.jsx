import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from './SubSectionModal';
import ConfirmationModel from '../../../../common/ConfirmationModal'
import { setStep, setCourse } from '../../../../../slices/courseSlice';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';



const NestedView = ({ handleChangeEditSectionName }) => {

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // three flag for edit view , view mode, add view mode

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);


    // confirmation model data
    const [confirmationModal, setConfirmationModal] = useState(null);

    // Delete handler using confirmationmodal
    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
            token,

        })

        if (result) {
            dispatch(setCourse(result))
        }
        // closing modal
        setConfirmationModal(null);
    }

    // Delete handler Sub section
    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({ subSectionId, sectionId, token });
        if (result) {

            // upadating course data in the new objects course variable
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === sectionId ? result : section);
            
            // updating in the slice course by creating the new object
            const updatedCourse = {
                ...course, courseContent: updatedCourseContent
            };

            // TODO  check for updation also in subsectionModal also
            dispatch(setCourse(updatedCourse));
        }
        // closing modal
        setConfirmationModal(null);
    }


    return (
        <div>
            {/* confirmation madal logout used */}

            <div className='rounded-lg bg-richblack-700 p-6 px-8'>
                {/*Details section using map  */}

                {
                    course?.courseContent?.map((section) => {
                        {/* detail tag used here in section with open keyword   means that the hidden content will be visible when the page loads.*/ }
                        return <details key={section._id} open>

                            <summary className='flex items-center justify-between gap-x-8 border-b-2'>
                                <div className='flex items-center gap-x-3'>
                                    <RxDropdownMenu className='text-yellow-50 ' />
                                    <p>{section.sectionName}</p>
                                </div>

                                <div className='flex items-center gap-x-3'>
                                    {/* Edit button */}
                                    <button
                                        onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                                        <MdEdit />
                                    </button>

                                    {/* Delete button */}
                                    <button
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Delete this Section",
                                                text2: "All the lectures in this section will be deleted",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: () => handleDeleteSection(section._id),
                                                btn2Handler: () => setConfirmationModal(null)
                                            })
                                        }}>
                                        <RiDeleteBin6Line />
                                    </button>

                                    {/* small line */}
                                    <span>|</span>

                                    {/* downAarrow */}
                                    <BiSolidDownArrow className='text-xl text-richblack-300' />

                                </div>

                            </summary>


                            <div>
                                {
                                    section.subSection.map((data) => (
                                        <div key={data?.id}
                                            // funtion on click
                                            onClick={() => setViewSubSection(data)}
                                            className='flex items-center gap-x-3 border-b-2'>

                                            <div className='flex items-center gap-x-3'>
                                                <RxDropdownMenu />
                                                <p>{data.title} </p>
                                            </div>

                                            {/* edit and delete button */}
                                            {/* Here what is happening is that onClick on parent div will affect the whole 
                                            by over the edit and delete button functionality so we use e.stopPropagation() */}
                                            <div
                                                onClick={(e)=> e.stopPropagation()}
                                                
                                                className='flex items-center gap-x-3'>
                                                <button
                                                    onClick={() => setEditSubSection({ ...data, sectionId: section._id })}
                                                >
                                                    <MdEdit />

                                                </button>

                                                <button
                                                    onClick={() => setConfirmationModal({
                                                        text1: "Delete this Sub Section",
                                                        text2: "Selected lectures will be deleted",
                                                        btn1Text: "Delete",
                                                        btn2Text: "Cancel",
                                                        btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                        btn2Handler: () => setConfirmationModal(null)
                                                    })}>

                                                    <RiDeleteBin6Line />

                                                </button>
                                            </div>

                                        </div>
                                    ))
                                }

                                {/*  Add section button */}
                                <button
                                    onClick={() => setAddSubSection(section._id)}
                                    className='mt-4 flex items-center gap-x-2 text-yellow-50'
                                >
                                    <AiOutlinePlus />
                                    <p>Add Lecture</p>
                                </button>

                            </div>


                        </details>

                    })
                }


            </div>

            {/* modals for edit confirmation and  */}
            {
                addSubSection ?
                    (<SubSectionModal
                        modalData={addSubSection}
                        setModalData={setAddSubSection}
                        add={true}
                    />)
                    : viewSubSection ?
                        (<SubSectionModal
                            modalData={viewSubSection}
                            setModalData={setViewSubSection}
                            view={true}
                        />)
                        : editSubSection ?
                            (<SubSectionModal
                                modalData={editSubSection}
                                setModalData={setEditSubSection}
                                edit={true}
                            />)
                            : (<div></div>)


            }
            {
                confirmationModal ?
                    (
                        <ConfirmationModel modalData={confirmationModal} />
                    )
                    : (<div></div>)
            }



        </div >
    )
}

export default NestedView