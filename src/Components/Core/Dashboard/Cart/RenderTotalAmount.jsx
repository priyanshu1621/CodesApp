import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';


const RenderTotalAmount = () => {

    const {total, cart} = useSelector((state) => state.cart)

    const handelBuyCourse = () => {
        
        const course = cart.map((course) => course._id);
        console.log("Bought these course: ", course);
        
        // ToDO: API integrate -> paytm gateway path
    }

  return (
      <div>
        <p>Total: </p>
          <p>Rs {total} </p>

          <IconBtn
              text="Buy Now"
              onclick={handelBuyCourse}
              customClasses={"w-full justify-center"}
          />
      </div>
  )
}

export default RenderTotalAmount