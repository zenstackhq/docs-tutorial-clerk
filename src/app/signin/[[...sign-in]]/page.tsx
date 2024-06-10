"use client";

import { SignIn } from "@clerk/nextjs";
import type { NextPage } from "next";

const Signin: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="mb-8 text-5xl font-extrabold text-white">Login</h1>
      <SignIn path="/signin" routing="path" signUpUrl="/signup" />
    </div>
  );
};

export default Signin;
