import React, { useEffect, useState } from 'react'

const RequirementFiled = ({ name, label, register, errors, setValue, getValue }) => {

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState("");


    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, [])


    // update the field value whenever there id any change in the form
    useEffect(() => {
        setValue(name, requirementList);

    }, [requirementList])




    // Add function requirement 
    const handelAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement])
            setRequirement("");
        }
    }

    // remove  function requirement 
    const handelRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

    return (
        <div>

            <label htmlFor='name'>{label}<sup>*</sup></label>
            <div>
                <input
                    type='text'
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className='w-full'
                />
                <button
                    type='button'
                    onClick={handelAddRequirement}
                    className='font-semibold text-yellow-50'
                >
                    Add
                </button>
            </div>


            {
                requirementList.length > 0 && (
                    <ul>
                        {
                            requirementList.map((requirement, index) => (
                                <li key={index} className='flex items-center text-richblack-5'>
                                    <span>{requirement}</span>
                                    <button
                                        type='button'
                                        onClick={() => handelRemoveRequirement(index)}
                                        className='text-xs text-pure-greys-300'
                                    >
                                        clear
                                    </button>

                                </li>
                            ))
                        }
                    </ul>
                )
            }

            {
                errors[name] && (
                    <span>
                        {label} is required
                    </span>
                )
            }

        </div>
    )
}

export default RequirementFiled