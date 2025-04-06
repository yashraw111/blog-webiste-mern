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
  const dispath = useDispatch()
  const navigate = useNavigate()
  const { toggleSidebar } = useSidebar()
  const [showSearch, setShowSearch] = useState(false)
const handleLogout = async () => {
  try {
      const response = await axios.get(`${getEvn('VITE_API_BASE_URL')}/auth/logout`, {
          withCredentials: true,
      });
      showToast('success', response.data.message);
      dispath(removeUser());
      navigate("/");
  } catch (error) {
      showToast('error', error.response?.data?.message || error.message);
  }
};
const toggleSearch = () => {
  setShowSearch(!showSearch)
}
  return (
    <>
      <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
      <div className='flex justify-center items-center gap-2'>
                <button onClick={toggleSidebar} className='md:hidden' type='button'>
                    <AiOutlineMenu />
                </button>
                <Link to={RouteIndex}>
                    <img src={logo} className='md:w-auto w-48' />
                </Link>
            </div>
            <div className='w-[500px]'>
                <div className={`md:relative md:block absolute bg-white left-0 w-full md:top-0 top-16 md:p-0 p-5 ${showSearch ? 'block' : 'hidden'}`}>
                    <SearchBox />
                </div>
            </div>
        <div className="flex items-center gap-5 ">
        <button onClick={toggleSearch} type='button' className='md:hidden block'>
                    <IoMdSearch size={25} />
                </button>
          {!user.isLoggedIn ? (
            <Button className="rounded-full" asChild>
              <Link to={RouterSignIn}>
                {" "}
                <MdLogin />
                Sign in
              </Link>
            </Button>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                  <Avatar>
                    <AvatarImage src={user.user.avatar || userIcon} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <p>{user.user.name}</p>
                    <p>{user.user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                    <FaRegUser></FaRegUser>
                    Profile
                    
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={RouteBlogAdd}>
                    <FaPlus></FaPlus>
                    Create blog
                    
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                 
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                <IoLogOutOutline color='red' />
                                Logout
                            </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Topbar;
