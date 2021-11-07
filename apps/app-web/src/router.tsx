import { memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";

export const Router = memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
});
