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
const AppSidebar = () => {
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
                    <Link to="">Home</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton>
                    <BiSolidCategoryAlt/>
                    <Link to="">Category</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton>
                    <TbLogs/>
                    <Link to="">Blogs</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
                <SidebarMenuButton>
                    <FaComments/>
                    <Link to="">Comments</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton>
                    <FaUsers/>
                    <Link to="">Users</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
        
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>
            Categories
        </SidebarGroupLabel>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton>
                    <GoDot/>
                    <Link to="">Category item</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
         
        </SidebarMenu>
        
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  )
}

export default AppSidebar