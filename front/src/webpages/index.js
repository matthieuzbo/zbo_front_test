import React from "react";
import {
  BrowserRouter,
  // Switch,
  Route,
  Routes,
  // Link,
} from "react-router-dom";
import Home from "./home";
import User from "./user";
import UserList from "./user_list";


const Webpages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />}></Route>
        <Route path="/user/:id" element={<User />}></Route>
        <Route path="/users" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Webpages;
