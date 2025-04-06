import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Link } from 'react-router-dom'
import logo from "@/assets/images/logo-white.png"
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { TbLogs } from "react-icons/tb";
import { FaComments } from "react-icons/fa";
import { GoDot } from "react-icons/go";
import {  RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentDetails, RouteIndex, RouteUser } from '@/helpers/RouteName';
import { getEvn } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/UseFetch';
import { useSelector } from 'react-redux';
const AppSidebar = () => {
    const user = useSelector(state => state.user)
    const { data: categoryData } = useFetch(`${getEvn('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        credentials: 'include'
    })
  return (
    <Sidebar>
    <SidebarHeader className="bg-white">
        <img src={logo} alt="" width={120} />
    </SidebarHeader>
    <SidebarContent className="bg-white">
      <SidebarGroup>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton>
                    <IoHome/>
                    <Link to={RouteIndex}>Home</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>

       
       {user && user.isLoggedIn
                            ? <>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                    <TbLogs/>
                                        <Link to={RouteBlog}>Blogs</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                    <FaComments/>
                                        <Link to={RouteCommentDetails}>Comments</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                            :
                            <></>
                        }
                        {user && user.isLoggedIn && user.user.role === 'admin'
                            ? <>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                    <BiSolidCategoryAlt/>
                                        <Link to={RouteCategoryDetails}>Categories</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                    <FaUsers/>
                                        <Link to={RouteUser}>Users</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                            :
                            <></>
                        }
        </SidebarMenu>
        
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>
            Categories
        </SidebarGroupLabel>
        <SidebarMenu>
                        {categoryData && categoryData.category.length > 0
                            && categoryData.category.map(category => <SidebarMenuItem key={category._id}>
                                <SidebarMenuButton>
                                    <GoDot />
                                    <Link to={RouteBlogByCategory(category.slug)}>{category.name}</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>)
                        }

                    </SidebarMenu>
        
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  )
}

export default AppSidebar