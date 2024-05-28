import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const ShowCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '' });
  const [reload, setReload] = useState(false); // State to trigger refetch

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/getCaterories');
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, [reload]); // Reload when 'reload' state changes

  // delete handler
  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/getCaterories/${categoryId}`);
      // Remove the deleted category from the state
      setCategories((prevCategories) => prevCategories.filter((category) => category._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Edit and update categories
  const handleEditCategory = (category) => {
    setEditingCategory(category._id);
    setEditForm({ name: category.name, description: category.description });
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/v1/getCaterories/${editingCategory}`, editForm);
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === editingCategory ? response.data : category
        )
      );
      setEditingCategory(null);
      setEditForm({ name: '', description: '' });
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="my-5 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
      <div className="max-w-sm mx-auto text-white">
        <h2 className="text-lg font-bold mb-4">All Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category._id} className="mb-2 p-4 border border-gray-300 rounded-lg">
              {editingCategory === category._id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Category Name"
                  />
                  <input
                    type="text"
                    name="description"
                    value={editForm.description}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg text-black focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
                    placeholder="Category Description"
                  />
                  <button onClick={handleUpdateCategory} className="bg-blue-500 text-white px-3 py-1 rounded-lg mt-2">Update</button>
                  <button onClick={() => setEditingCategory(null)} className="bg-gray-500 text-white px-3 py-1 rounded-lg mt-2">Cancel</button>
                </>
              ) : (
                <>
                  <h3 className="text-md font-semibold">{category.name}</h3>
                  <p>{category.description}</p>
                  <button onClick={() => handleEditCategory(category)} className="bg-yellow-400 text-white px-3 py-1 rounded-lg mt-2">Edit</button>
                  <button onClick={() => handleDeleteCategory(category._id)} className="bg-brown-800  text-white px-3 py-1 rounded-lg mt-2">Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
