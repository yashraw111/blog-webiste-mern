import React from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { RouteAddCategory, RouteBlog, RouteBlogAdd, RouteBlogByCategory, RouteBlogDetails, RouteBlogEdit, RouteCategoryDetails, RouteCommentDetails, RouteEditCategory, RouteIndex, RouteProfile, RouterSignIn, RouterSignUp, RouteSearch, RouteUser } from "./helpers/RouteName";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AddCategory from "./pages/Category/AddCategory";
import CategoryDetails from "./pages/Category/CategoryDetails";
import EditCategory from "./pages/Category/EditCategory";
import AddBlog from "./pages/Blog/AddBlog";
import BlogDetails from "./pages/Blog/BlogDetails";
import EditBlog from "./pages/Blog/EditBlog";
import SingleBlogDetails from "./pages/SingleBlogDetails";
import BlogByCategory from "./pages/Blog/BlogByCategory";
import SearchResult from "./pages/SearchResult";
import Comments from "./pages/Comments";
import User from "./pages/User";
import AuthRouteProtechtion from "./components/AuthRouteProtechtion";
import OnlyAdminAllowed from "./components/OnlyAdminAllowed";
import Index from "./pages/Index";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout />}>

            <Route index element={<Index/>}></Route>
            {/* <Route path="/profile" element={<Profile/>}></Route> */}
{/* blog category */}
            
            {/* <Route path={RouteAddCategory} element={<AddCategory/>}></Route> */}
            {/* <Route path={RouteCategoryDetails} element={<CategoryDetails/>}></Route> */}
            {/* <Route path={RouteEditCategory()} element={<EditCategory/>}>  </Route> */}


{/* blog */}
            <Route path={RouteBlogDetails()} element={<SingleBlogDetails/>}></Route>
            <Route path={RouteBlogByCategory()} element={<BlogByCategory/>}></Route>
            <Route path={RouteSearch()} element={<SearchResult/>}></Route>
            {/* <Route path={RouteUser} element={<User/>}></Route> */}


            <Route element={<AuthRouteProtechtion />}>
            <Route path={RouteProfile} element={<Profile />} />
            <Route path={RouteBlogAdd} element={<AddBlog />} />
            <Route path={RouteBlog} element={<BlogDetails />} />
            <Route path={RouteBlogEdit()} element={<EditBlog />} />
            <Route path={RouteCommentDetails} element={<Comments />} />
          </Route>

          <Route element={<OnlyAdminAllowed />}>
            <Route path={RouteAddCategory} element={<AddCategory />} />
            <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
            <Route path={RouteEditCategory()} element={<EditCategory />} />
            <Route path={RouteUser} element={<User />} />
          </Route>


          </Route>
          <Route path={RouterSignIn} element={<Signin/>}/>
          <Route path={RouterSignUp} element={<Signup/>}/>


        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
