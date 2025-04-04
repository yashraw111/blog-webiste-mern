import React from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { RouteAddCategory, RouteCategoryDetails, RouteEditCategory, RouteIndex, RouterSignIn, RouterSignUp } from "./helpers/RouteName";
import Index from "./pages";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/profile";
import AddCategory from "./pages/Category/AddCategory";
import CategoryDetails from "./pages/Category/CategoryDetails";
import EditCategory from "./pages/Category/EditCategory";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout />}>

            <Route index element={<Index/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path={RouteAddCategory} element={<AddCategory/>}></Route>
            <Route path={RouteCategoryDetails} element={<CategoryDetails/>}></Route>
            <Route path={RouteEditCategory()} element={<EditCategory/>}></Route>

          </Route>
          <Route path={RouterSignIn} element={<Signin/>}/>
          <Route path={RouterSignUp} element={<Signup/>}/>


        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
