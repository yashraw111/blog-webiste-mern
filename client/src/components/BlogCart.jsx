import React from 'react';
import { Card, CardContent } from './ui/card'; // Assuming these are Shadcn Card components
import { Badge } from "@/components/ui/badge"; // Assuming this is a Shadcn Badge component
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'; // Import AvatarFallback as well
import { FaRegCalendarAlt } from "react-icons/fa";
import usericon from '@/assets/images/user.png'; // Assuming this user icon path is correct
import moment from 'moment'; // For date formatting
import { Link } from 'react-router-dom';
import { RouteBlogDetails } from '@/helpers/RouteName';

const BlogCard = ({ props }) => {
    return (
        <Link
            to={RouteBlogDetails(props.category.slug, props.slug)}
            className="block h-full" // Ensure the link takes full height for consistent clickable area
        >
            <Card className="h-full flex flex-col justify-between overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer group">
                <CardContent className="p-4 sm:p-6 flex flex-col h-full"> {/* Increased padding for better spacing */}
                    {/* Author and Admin Badge Section */}
                    <div className='flex items-center justify-between mb-4'> {/* Added bottom margin */}
                        <div className='flex items-center gap-3'> {/* Increased gap, improved alignment */}
                            <Avatar className="w-10 h-10 border-2 border-gray-200"> {/* Slightly larger avatar with a border */}
                                <AvatarImage src={props?.author?.avatar || usericon} alt={props?.author?.name || 'User'} />
                                <AvatarFallback className="bg-blue-500 text-white font-semibold">
                                    {props?.author?.name ? props.author.name.charAt(0).toUpperCase() : 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-gray-800 font-semibold text-sm">{props?.author?.name}</span> {/* Bolder and slightly larger name */}
                        </div>
                        {props?.author?.role === 'admin' && (
                            <Badge variant="default" className="bg-violet-600 text-white px-3 py-1 rounded-full text-xs font-medium"> {/* More vibrant badge */}
                                Admin
                            </Badge>
                        )}
                    </div>

                    {/* Featured Image Section */}
                    <div className='mb-4 overflow-hidden rounded-lg'> {/* Added bottom margin, rounded corners for image container */}
                        <img
                            src={props.featuredImage}
                            alt={props.title}
                            className='w-full h-48 sm:h-56 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105' // Responsive height, object-cover, smooth hover scale
                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/E2E8F0/64748B?text=No+Image"; }} // Placeholder on error
                        />
                    </div>

                    {/* Blog Details Section (Date and Title) */}
                    <div>
                        <p className='flex items-center gap-2 mb-2 text-gray-500 text-sm'> {/* Muted text for date, consistent icon sizing */}
                            <FaRegCalendarAlt size={16} />
                            <span>{moment(props.createdAt).format('DD-MM-YYYY')}</span>
                        </p>
                        <h2 className='text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight line-clamp-3 group-hover:text-blue-600 transition-colors duration-200'>
                            {props.title}
                        </h2> {/* Enhanced title styling, multiple lines, hover color */}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default BlogCard;
