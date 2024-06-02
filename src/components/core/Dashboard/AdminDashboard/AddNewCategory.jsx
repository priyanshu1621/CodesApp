import React, { useState } from 'react'
import axios from 'axios';
import { toast } from "react-hot-toast";


export const AddNewCategory = () => {


    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    const handleSubmit = async (e) => {
        const toastId = toast.loading("Loading...");
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/v1/createCategory', {
                name: categoryName,
                description: categoryDescription,
            });
            console.log('Category created:', response.data);
            toast.success("Category Created");
            setCategoryName('');
            setCategoryDescription('');
        } catch (error) {
            console.error('Error creating category:', error);
        }
        toast.dismiss(toastId);
    };


    return (
        <div className="my-5 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">





            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="categoryName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Enter Category
                    </label>
                    <input
                        type="text"
                        id="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter category name"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="categoryDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Enter Category Description
                    </label>
                    <textarea
                        id="categoryDescription"
                        value={categoryDescription}
                        onChange={(e) => setCategoryDescription(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter category description"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Create Category
                </button>
            </form>



        </div>
    )
}
