import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AddNewCategory } from './AddNewCategory';
import { ShowCategory } from './ShowCategory';

export const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


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


