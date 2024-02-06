import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
    return (
        <div>
            We are Passionate about revolutionizing the way we learn . Our innovation platform
            <HighlightText text={"Combine technologies"} />

            <span className='text-brown-500'>
                {" "}
                experties
            </span>
            , and community to create an
            <span className='text-brown-500'>
                {" "}
                unparalleled education experience
            </span>
        </div>
    )
}

export default Quote