const Todo = require("../models/todoModel");
const _ = require("lodash");

module.exports.createTodo = async (req, res) => {
  try {
    const { id } = _.pick(req.params, "id");
    const { todo, description } = _.pick(req.body, [
      "todo",
      "description",
      "isCompleted",
    ]);

    const newTodo = new Todo({
      todo,
      description,
      userId: id,
    });

    await newTodo.save();

    const todos = await Todo.findById(id)

    return res.status(201).json(todos);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports.getUserTodos = async (req, res) => {
    try {
        const {id} = _.pick(req.params, "id")
        const userTodos = await Todo.findById(id)

        return res.status(200).json(userTodos)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}