import { useState, useEffect } from "react";
import "./App.css";
import { MdEditDocument } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";

import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLocalStorage();
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage();
  };

  return (
    <>
      <Navbar />
      <div className="md:container my-5 mx-3 rounded-xl bg-violet-100 p-5 md:mx-auto min-h-[80vh] md:w-1/2">
        <div className="font-bold text-center text-3xl">Vi-Task = Manage your Todos at one Place</div>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
         <div className="flex">
         <input
            onChange={handleChange}
            value={todo}
            className="w-full px-5 py-1 rounded-full"
            type="text"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-violet-800 disabled:bg-violet-300 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white mx-3 rounded-lg"
          >
            Save
          </button>
         </div>
        </div>
        <input className="my-4" id="show"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />{" "}
        <label className="mx-2" htmlFor="show">Show Finished</label>
        
      <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-2xl font-bold ">Your Todo's</h2>
        <div className="todos ">
          {todos.length === 0 && (
            <div className="m-4">Please write your task!</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex flex-wrap my-3 justify-between gap-3"
                >
                  <div className="flex gap-5">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm  font-bold text-white rounded-md mx-1"
                    >
                      <MdEditDocument />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <MdOutlineDeleteForever />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
