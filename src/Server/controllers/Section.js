const Section = require("../models/Section");
const Course = require("../models/Course");

// CREATE a new section
exports.createSection = async (req, res) => {
    try {
        // fetch data
        const { sectionName, courseId } = req.body;
        // data validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing required properties",
            });
        }

        // create section
        const newSection = await Section.create({ sectionName });


        // update course with section ObjectId
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                },
            },
            { new: true }
        )

            // ????????????????????????????????????????????????????????

            // TODO: Populate to replace section / subsection both in the updatedCourseDetails

            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        // Return the updated course object in the response
        res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourse,
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


// UPDATE a section
exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId } = req.body;
        const section = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: section,
        });
    } catch (error) {
        console.error("Error updating section:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};




//  delete Section

exports.deleteSection = async (req, res) => {
    try {
        // fetch Id -> assuming that we are sending Id in params
        const { sectionId } = req.body;

        // find by id and delete data
        await Section.findByIdAndDelete(sectionId);

        //  TODO do we remove the entry from the course Schema


        // return response

        res.status(200).json({
            success: true,
            message: "Section deleted",
        });
    } catch (error) {
        console.error("Error deleting section:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};