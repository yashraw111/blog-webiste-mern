import React, { useState } from "react";
import logo from "@/assets/images/logo-white.png";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import SearchBox from "./SearchBox";
import { RouteBlogAdd, RouteIndex, RouterSignIn } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userIcon from "../assets/images/user.png";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoLogOutOutline, IoSearch } from "react-icons/io5";
import axios from "axios";
import { showToast } from "@/helpers/showToast";
import { removeUser } from "@/redux/User/user.slice";
import { getEvn } from "@/helpers/getEnv";
import { IoMdSearch } from "react-icons/io";
import { useSidebar } from "./ui/sidebar"; 
import { AiOutlineMenu } from "react-icons/ai";

const Topbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${getEvn('VITE_API_BASE_URL')}/auth/logout`, {
        withCredentials: true,
      });
      showToast('success', response.data.message);
      dispatch(removeUser()); // Using dispatch
      navigate("/");
    } catch (error) {
      showToast('error', error.response?.data?.message || error.message);
    }
  };
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  return (
    <>
      <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-4 md:px-8 border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={toggleSidebar} className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors" type="button" aria-label="Toggle sidebar">
            <AiOutlineMenu size={20} />
          </button>
          {/* <Link to={RouteIndex} className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 md:h-9 object-contain" />
          </Link> */}
          <Link to={RouteIndex} className="flex items-center">
  {/* <img src={logo} alt="Logo" className="h-8 md:h-9 object-contain" /> */}
  <span className="text-xl md:text-2xl font-extrabold  text-blue-600">MyBlog</span>
</Link>
        </div>
        <div className="flex-1 max-w-xl mx-auto hidden md:block"> 
          <SearchBox />
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleSearch} type="button" className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors" aria-label="Toggle search">
            <IoMdSearch size={22} />
          </button>

          {!user.isLoggedIn ? (
            <Button className="rounded-full px-5 py-2 text-sm font-medium transition-all hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Link to={RouterSignIn} className="flex items-center gap-1">
                <MdLogin size={18} />
                Sign in
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer outline-none ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full">
                <Avatar className="w-9 h-9 border-2 border-transparent hover:border-blue-500 transition-colors">
                  <AvatarImage src={user.user.avatar || userIcon} alt="User Avatar" />
                  <AvatarFallback className="bg-blue-500 text-white text-sm">
                    {user.user.name ? user.user.name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2">
                <DropdownMenuLabel className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold text-gray-800 truncate">{user.user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-50 rounded-md py-2 px-3 transition-colors">
                  <Link to="/profile" className="flex items-center gap-2">
                    <FaRegUser size={16} className="text-gray-600" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-50 rounded-md py-2 px-3 transition-colors">
                  <Link to={RouteBlogAdd} className="flex items-center gap-2">
                    <FaPlus size={16} className="text-gray-600" />
                    Create blog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:bg-red-50 rounded-md py-2 px-3 transition-colors">
                  <IoLogOutOutline size={18} className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <div className={`fixed top-16 left-0 w-full bg-white md:hidden p-4 border-b border-gray-200 transition-transform duration-300 ease-in-out ${showSearch ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'}`}>
        <SearchBox />
      </div>
    </>
  );
};

export default Topbar;