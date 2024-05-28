import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AddNewCategory } from './AddNewCategory';
import { ShowCategory } from './ShowCategory';

export const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const fetchCategories = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:4000/api/v1/getCaterories');
    //         setCategories(response.data);
    //         setLoading(false);
    //     } catch (error) {
    //         setError('Failed to fetch categories');
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchCategories();
    // }, []);

    // const handleCategoryAdded = () => {
    //     fetchCategories();
    // };

    // const handleCategoryUpdated = () => {
    //     fetchCategories();
    // };

    // const handleCategoryDeleted = () => {
    //     fetchCategories();
    // };

    return (
        <div>
            <div className="font-medium text-richblack-5 flex justify-center py-2 flex-row">
                <h1 className='text-3xl'>Category Page</h1>
            </div>
            <h3 className='font-medium text-2xl text-richblack-5 flex justify-center py-3'>
                Here You can Update / Delete / Create Categories
            </h3>
            <AddNewCategory />
            <ShowCategory

            />
        </div>
    );
};
