"use client";
import Link from "next/link";
import { useState } from "react";

interface RegisterProps {
  formData: {
    email: string;
    password: string;
    names: string;
  };
}

const page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<RegisterProps["formData"]>({
    email: "",
    names: "",
    password: "",
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setFormData({
        email: "",
        names: "",
        password: "",
      });
      const response = await fetch("http://localhost:4001/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
    } catch (error) {
      console.log("There is an error: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((oldData: any) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  };

  return (
    <div className={`w-[100%] h-[100%] flex items-center justify-center`}>
      <form
        className={`p-[2rem] flex flex-col items-center justify-center gap-[2rem] bg-[#041141b0] rounded-[0.75rem]`}
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-[30px] text-white">
          Register to my todo app
        </h2>
        <input
          type="text"
          name="names"
          placeholder="Write Here your names"
          className={`w-[100%] py-[1rem] px-[2rem] border-none outline-none bg-[#fff] rounded-[10px]`}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className={`w-[100%] py-[1rem] px-[2rem] border-none outline-none bg-[#fff] rounded-[10px]`}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Create a strong password"
          className={`w-[100%] py-[1rem] px-[2rem] border-none outline-none bg-[#fff] rounded-[10px]`}
          onChange={handleChange}
        />
        <button
          type="submit"
          className={`px-[4rem] py-[0.8rem] bg-[#05238f80] text-white`}
        >
          {isLoading ? "Loading ..." : "Register"}
        </button>
        <Link href="/">
          <p className="underline text-white">
            Already have account? sign in here!
          </p>
        </Link>
      </form>
    </div>
  );
};

export default page;
