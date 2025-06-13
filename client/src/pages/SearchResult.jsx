import BlogCard from '@/components/BlogCart';
import { getEvn } from '@/helpers/getEnv';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const SearchResult = () => {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q');

    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${getEvn('VITE_API_BASE_URL')}/blog/search?q=${q}`, {
                    withCredentials: true
                });
                setBlogData(response.data.blog);
            } catch (err) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        if (q) fetchData();
    }, [q]);

    return (
        <>
            <div className='flex items-center gap-3 text-2xl font-bold text-violet-500 border-b pb-3 mb-5'>
                <h4>Search Result For: {q}</h4>
            </div>

            {loading ? (
                <div>Loading...</div> // Yahan aap `Loading` component bhi use kar sakte ho
            ) : (
                <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                    {blogData && blogData.length > 0 ? (
                        blogData.map(blog => <BlogCard key={blog._id} props={blog} />)
                    ) : (
                        <div>Data Not Found.</div>
                    )}
                </div>
            )}
        </>
    );
};

export default SearchResult;
