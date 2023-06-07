const express = require("express");
const todoRouter = express.Router();
const { getUserTodos, createTodo } = require("../controllers/todoController");

todoRouter.get("/:id", getUserTodos);

todoRouter.post("/:id/new/todo", createTodo);

module.exports = todoRouter;
