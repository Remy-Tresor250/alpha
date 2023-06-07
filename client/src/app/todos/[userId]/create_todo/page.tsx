"use client";
import { setTodos } from "@/app/state/state";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Params = {
  params: {
    userId: string;
  };
};

const CreateTodo = () => {
  const { _id } = useSelector((state: any) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter()
  const dispatch = useDispatch();
  const [todoData, setTodoData] = useState<object>({
    todo: "",
    description: "",
    userId: _id,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:4009/todos/${_id}/create_todo`,
        {
          method: "POST",
          body: JSON.stringify(todoData),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      dispatch(setTodos({ todos: data }));
    } catch (error: any) {
      console.log(`There is an error: ${error.message}`);
    } finally {
      setIsLoading(true);
      router.push("/todos/"+_id)
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setTodoData((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  };
  return (
    <div className={`w-[100%] h-[100%] flex justify-center items-center`}>
      <form
        onSubmit={handleSubmit}
        method="post"
        className={`flex flex-col justify-center items-center gap-[1.5rem] w-[40%] rounded-[0.75rem] p-[2rem] bg-[#041141b0]`}
      >
        <h3 className={`text-center text-white font-bold w-[100%] text-[30px]`}>
          Create a todo
        </h3>
        <input
          type="text"
          placeholder="Todo ..."
          className={`w-[100%] p-[1rem] rounded-[10px] border-none outline-none`}
          onChange={handleChange}
        />
        <textarea
          name="description"
          className={`w-[100%] h-[10rem] rounded-[10px] p-[1rem] border-none outline-none resize-none`}
          placeholder="Description about this todo ..."
          onChange={handleChange}
        />
        <button
          type="submit"
          className="text-white bg-[#05638f80] px-[4rem] py-[1rem] rounded-[5px] text-[20px]"
        >
          {isLoading ? "Loading ..." : "Create todo"}
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
