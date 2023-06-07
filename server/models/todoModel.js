const { required } = require("joi");
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    todo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    isCompleted: {
      type: String,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
