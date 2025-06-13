import React, { useEffect, useState } from 'react';
import { FaRegComment } from "react-icons/fa";
import axios from 'axios';
import { getEvn } from '@/helpers/getEnv';

const CommentCount = ({ props }) => {
    const [commentCount, setCommentCount] = useState(0);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCommentCount = async () => {
            try {
                const response = await axios.get(`${getEvn('VITE_API_BASE_URL')}/comment/get-count/${props.blogid}`, {
                    withCredentials: true,
                });
                setCommentCount(response.data.commentCount || 0);
            } catch (err) {
                setError(err.message || 'Error fetching comment count');
                setCommentCount(0);
            }
        };
        if (props?.blogid) {
            fetchCommentCount();
        }
    }, [props?.blogid]);

    return (
        <button type='button' className='flex cursor-pointer justify-between items-center gap-1'>
            <FaRegComment />
            {commentCount}
        </button>
    );
};

export default CommentCount;
