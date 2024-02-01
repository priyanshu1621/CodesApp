const RatingAndReviews = require("../models/RatingAndReviews");
const Course = require("../models/Course");


// create rating
exports.createRating = async (req, res) => {
    try {

        // get user id
        const userId = req.user.id;

        // fetchdata from req data
        const { rating, review, courseId } = req.body;

        //! check if user is enrolled in the course
        const courseDetails = await Course.findOne(
            {
                _id: courseId,
                studentEnrolled: { $elemMatch: { $eq: userId } },
            });

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: 'Student is not enrolled in the course',
            });
        }

        // check if user already reviews the course
        const alreadyReviewed = await RatingAndReviews.findOne({
            user: userId,
            course: courseId,
        });
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: 'Course is already reviewed by the User ',
            })
        }

        // create rating and review
        const ratingReview = await RatingAndReviews({
            rating, review,
            course: courseId,
            user: userId,
        })
        // update course with this rating/review
        const updateCourseDetails = await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                }
            },
            { new: true }
        )
        console.log(updateCourseDetails)
        // update response
        return res.status(200).json({
            success: true,
            message: 'Rating And Reviews is created Successfully ',
            ratingReview,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// getAverageRating

exports.getAverageRating = async (req, res) => {
    try {
        // get id
        const courseId = req.body.courseId;

        // calculate avg rating

        const result = await RatingAndReviews.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }
        ])


        // return  rating

        if (result.length > 0) {

            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,

            })

        }

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }


}


// getAllRating

exports.getAllRating = async (req, res) => {
    try {
        const allReviews = await RatingAndReviews.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "courseName",
            })
            .exec();

        // return response

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}



//TODO: course sari rating and reviews -> particular course