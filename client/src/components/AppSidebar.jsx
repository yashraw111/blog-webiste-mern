import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter, // Assuming this is part of your sidebar components, though not used in original code
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from 'react-router-dom';
import logo from "@/assets/images/logo-white.png"; // Assuming this logo path is correct
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { TbLogs } from "react-icons/tb";
import { FaComments } from "react-icons/fa";
import { GoDotFill } from "react-icons/go"; // Using GoDotFill for a more prominent dot icon
import {
  RouteBlog,
  RouteBlogByCategory,
  RouteCategoryDetails,
  RouteCommentDetails,
  RouteIndex,
  RouteUser
} from '@/helpers/RouteName';
import { getEvn } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/UseFetch';
import { useSelector } from 'react-redux';

const AppSidebar = () => {
  const user = useSelector(state => state.user);
  const { data: categoryData } = useFetch(`${getEvn('VITE_API_BASE_URL')}/category/all-category`, {
    method: 'get',
    credentials: 'include'
  });

  return (
    // Main Sidebar container with a clean white background and subtle shadow
    <Sidebar className="bg-white border-r border-gray-200 shadow-lg md:shadow-md h-screen fixed top-0 left-0 overflow-y-auto">
      {/* Sidebar Header with Logo */}
      <SidebarHeader className="bg-white p-4 border-b border-gray-100 flex justify-center items-center h-16">
        {/* The logo image. Adjusted width for better fit, using `object-contain` */}
        <img src={logo} alt="Logo" className="w-32 md:w-36 object-contain" />
      </SidebarHeader>

      {/* Sidebar Content Area */}
      <SidebarContent className="p-4 flex flex-col flex-grow">
        {/* Main Navigation Group */}
        <SidebarGroup className="mb-6">
          <SidebarMenu>
            {/* Home Menu Item */}
            <SidebarMenuItem>
              <Link to={RouteIndex} className="flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                <IoHome size={20} className="flex-shrink-0" />
                <span className="font-medium">Home</span>
              </Link>
            </SidebarMenuItem>

            {/* Conditional Menu Items for Logged-in Users */}
            {user && user.isLoggedIn ? (
              <>
                <SidebarMenuItem>
                  <Link to={RouteBlog} className="flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                    <TbLogs size={20} className="flex-shrink-0" />
                    <span className="font-medium">Blogs</span>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link to={RouteCommentDetails} className="flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                    <FaComments size={20} className="flex-shrink-0" />
                    <span className="font-medium">Comments</span>
                  </Link>
                </SidebarMenuItem>
              </>
            ) : null}

            {/* Conditional Menu Items for Admin Users */}
            {user && user.isLoggedIn && user.user.role === 'admin' ? (
              <>
                <SidebarMenuItem>
                  <Link to={RouteCategoryDetails} className="flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                    <BiSolidCategoryAlt size={20} className="flex-shrink-0" />
                    <span className="font-medium">Categories</span>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link to={RouteUser} className="flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                    <FaUsers size={20} className="flex-shrink-0" />
                    <span className="font-medium">Users</span>
                  </Link>
                </SidebarMenuItem>
              </>
            ) : null}
          </SidebarMenu>
        </SidebarGroup>

        {/* Categories Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-gray-500 uppercase px-3 py-2 mb-2 tracking-wide">
            Categories
          </SidebarGroupLabel>
          <SidebarMenu>
            {/* Dynamically rendered Category Menu Items */}
            {categoryData && categoryData.category && categoryData.category.length > 0 ? (
              categoryData.category.map(category => (
                <SidebarMenuItem key={category._id}>
                  <Link to={RouteBlogByCategory(category.slug)} className="flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                    <GoDotFill size={16} className="text-gray-400 flex-shrink-0" /> {/* Slightly smaller, muted dot */}
                    <span className="text-sm">{category.name}</span>
                  </Link>
                </SidebarMenuItem>
              ))
            ) : (
              <SidebarMenuItem>
                <span className="flex items-center gap-3 py-2 px-3 text-gray-500 text-sm italic">
                  No categories found.
                </span>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
 
    </Sidebar>
  );
};

export default AppSidebar;
