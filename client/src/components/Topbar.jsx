import React from "react";
import logo from "@/assets/images/logo-white.png";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import SearchBox from "./SearchBox";
import { RouterSignIn } from "@/helpers/RouteName";
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
const Topbar = () => {
  const user = useSelector((state) => state.user);
  const dispath = useDispatch()
  const navigate = useNavigate()
 
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
  return (
    <>
      <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
        <div>
          <img src={logo} alt="" />
        </div>
        <div className="w-[500px]">
          <SearchBox></SearchBox>
        </div>
        <div className="rounded-full ">
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
                    <Link to="">
                    <FaRegUser></FaRegUser>
                    Profile
                    
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="">
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
