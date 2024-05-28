const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Create categories 
router.post("/", async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Category name is required" });
    }

    try {
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: "Error creating category" });
    }
})


// Get all categories exist
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({})
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Server error Cannot fetch the categories details' })
    }
})



// Delete a category by ID
router.delete('/:id', async (req, res) => {
    const categoryId = req.params.id;
    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});



// Update category
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const category = await Category.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Failed to update category", error });
    }
});



module.exports = router;