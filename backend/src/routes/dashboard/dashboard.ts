import { Router, Request, Response } from "express";
import { verifyToken } from "../../middleware/AuthProvider.middleware";
import {
  addTodo,
  deleteTodo,
  todoItem,
  todoList,
  updateTodo,
} from "../../middleware/Dashboard.middleware";
const route = Router();

route.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    msg: "dashboard is working",
  });
});

route.post("/todos", verifyToken, addTodo);

route.put("/todos/:todoId", verifyToken, updateTodo);

route.get("/todos", verifyToken, todoList);

route.get("/todos/:todoId", verifyToken, todoItem);

route.delete("/todos/:todoId", verifyToken, deleteTodo);

route.post("/todos/:todoId/comments", verifyToken);

export default route;
