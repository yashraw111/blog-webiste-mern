import React from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { RouteIndex, RouterSignIn, RouterSignUp } from "./helpers/RouteName";
import Index from "./pages";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout />}>

            <Route index element={<Index/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
          </Route>
          <Route path={RouterSignIn} element={<Signin/>}/>
          <Route path={RouterSignUp} element={<Signup/>}/>


        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
