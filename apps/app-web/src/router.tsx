import { memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { SignIn } from "./auth/pages/sign-in";
import { SignUp } from "./auth/pages/sign-up";
import { Layout } from "./layout";

export const Router = memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});
