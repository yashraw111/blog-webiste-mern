import Comment from '@/components/Comment';
import CommentCount from '@/components/CommentCount';
import LikeCount from '@/components/LikeCount';
import Loading from '@/components/Loading';
import RelatedBlog from '@/components/RelatedBlog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getEvn } from '@/helpers/getEnv';
import { decode } from 'entities';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleBlogDetails = () => {
    const { blog, category } = useParams();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${getEvn('VITE_API_BASE_URL')}/blog/get-blog/${blog}`, {
                    withCredentials: true
                });
                setData(response.data);
            } catch (err) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        if (blog) fetchBlog();
    }, [blog]);

    if (loading) return <Loading />;

    if (error) {
        return (
            <div className="text-center text-red-500 p-8">
                <p className="text-xl font-semibold mb-2">Error loading blog details.</p>
                <p className="text-gray-600">Please try again later.</p>
            </div>
        );
    }

    if (!data || !data.blog) {
        return (
            <div className="text-center text-gray-500 p-8">
                <p className="text-xl font-semibold">Blog not found.</p>
            </div>
        );
    }

    const { title, author, createdAt, featuredImage, blogContent, _id: blogId } = data.blog;

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 md:p-8 max-w-7xl mx-auto'>
            <div className='md:col-span-2 lg:col-span-3 bg-white rounded-xl shadow-lg p-6 md:p-8'>
                <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight'>
                    {title}
                </h1>

                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-200'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="w-12 h-12 border-2 border-gray-200">
                            <AvatarImage src={author?.avatar} alt={author?.name || 'Author'} />
                            <AvatarFallback className="bg-blue-500 text-white font-semibold text-lg">
                                {author?.name ? author.name.charAt(0).toUpperCase() : 'A'}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className='font-semibold text-lg text-gray-800'>{author?.name}</p>
                            <p className='text-gray-500 text-sm'>Published on {moment(createdAt).format('MMMM Do, YYYY')}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-6 mt-4 sm:mt-0'>
                        <LikeCount props={{ blogid: blogId }} />
                        <CommentCount props={{ blogid: blogId }} />
                    </div>
                </div>

                <div className='my-6 rounded-lg overflow-hidden shadow-md'>
                    <img
                        src={featuredImage}
                        alt={title}
                        className='w-full h-64 md:h-96 object-cover rounded-lg'
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1200x600/E2E8F0/64748B?text=Featured+Image"; }}
                    />
                </div>

                <div
                    className='prose prose-lg max-w-none text-gray-800 leading-relaxed'
                    dangerouslySetInnerHTML={{ __html: decode(blogContent) || '' }}
                ></div>

                <div className='mt-10 pt-8 border-t border-gray-200'>
                    <Comment props={{ blogid: blogId }} />
                </div>
            </div>

            <div className='md:col-span-1 bg-white rounded-xl shadow-lg p-6 h-fit sticky top-24'>
                <h3 className='text-xl font-bold text-gray-800 mb-4 pb-4 border-b border-gray-200'>Related Blogs</h3>
                <RelatedBlog props={{ category: category, currentBlog: blog }} />
            </div>
        </div>
    );
};

export default SingleBlogDetails;
