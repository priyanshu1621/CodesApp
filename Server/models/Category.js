const mongoose = require("mongoose");

// Define the Tags schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: { type: String },
	// instructor: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	required: true,
	// 	ref: "user",
	// },
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
});

// Export the Tags model
module.exports = mongoose.model("Category", categorySchema);