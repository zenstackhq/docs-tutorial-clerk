"use client";

import { SignUp } from "@clerk/nextjs";
import type { NextPage } from "next";

const Signup: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="mb-8 text-5xl font-extrabold text-white">Sign up</h1>
      <SignUp path="/signup" routing="path" signInUrl="/signin" />
    </div>
  );
};

export default Signup;
