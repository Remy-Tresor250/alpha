"use client";
import { setTodos } from "@/app/state/state";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Params = {
  params: {
    userId: string;
  };
};

const Todos = ({ params: { userId } }: Params) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const todos = useSelector((state: any) => state.todos)
    const dispatch = useDispatch()
    console.log(useSelector((state: any) => state.user));

  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch(`http://localhost:4001/todos/${userId}`);
      const data = await res.json();

      dispatch(setTodos({todos: data}))
    };
    
    getTodos();
  }, []);

  return (
    <div
      className={`w-[100%] h-[100%] text-white flex justify-center items-center`}
    >
      <div
        className={`w-[50%] p-[2rem] rounded-[0.75rem] bg-[#041141b0] flex flex-col justify-center items-center gap-[1rem]`}
      >
        <div className={`flex justify-between items-center w-[100%]`}>
          <h3 className={`text-[30px] font-bold`}>Todos</h3>
          <h4 className={`text-[20px] font-bold underline`}>Add a todo</h4>
        </div>

        <div className={`flex flex-col justify-center items-center w-[100%]`}>
          {todos.map((todo: any) => (
            <div className={`w-[100%] py-[1rem]`} key={todo._id}>{todo.todo}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todos;
