"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "./state/state";
import { useRouter } from "next/navigation";

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(formData);
  

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:4001/auth/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {"Content-Type": "application/json"}
      });
      const data = await res.json();

      dispatch(setLogin({ user: data.user, token: data.token }));
      router.push("/todos/" + data.user._id);
    } catch (error: any) {
      console.log(`There is an error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { value, name } = e.target;

    setFormData((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  };

  return (
    <main className={`w-[100%] h-[100%] flex justify-center items-center`}>
      <form
        onSubmit={handleSubmit}
        className={`p-[2rem] rounded-[0.75rem] bg-[#041141b0] drop-shadow-xl flex flex-col gap-[2rem] items-center`}
      >
        <h2 className="text-center text-[30px] text-white">
          Login in a todo app
        </h2>
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
          placeholder="Password"
          className={`w-[100%] py-[1rem] px-[2rem] border-none outline-none bg-[#fff] rounded-[10px]`}
          onChange={handleChange}
        />
        <button
          type="submit"
          className={`px-[4rem] py-[0.8rem] bg-[#05238f80] text-white`}
        >
          {isLoading ? "Loading ..." : "Login"}
        </button>
        <Link href="/register">
          <p className="underline text-white">If no account, register here!</p>
        </Link>
      </form>
    </main>
  );
}
