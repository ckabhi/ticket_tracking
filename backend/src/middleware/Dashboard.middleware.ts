import { Request, response, NextFunction, Response } from "express";
import {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
  SUCCESS,
} from "../helper/HttpStatusCode.helper";
import { ResponseBuilder } from "../helper/response.helper";
import {
  createItem,
  deleteTodoItem,
  getItemById,
  getItems,
  updateItem,
} from "../model/TodoItem.model";
import { TodoItem } from "../schema/interface/TodoItem.interface";

export const addTodo = async (req: Request, res: Response) => {
  try {
    const body: TodoItem = req.body;
    body.createdBy = res.locals._user._id;

    const result = await createItem(body);

    return res.status(SUCCESS).json(ResponseBuilder.successResponse(result));
  } catch (error) {
    return res
      .json(SERVER_ERROR)
      .json(
        ResponseBuilder.errorResponse("somthing went wrong, try again", error)
      );
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const requestInterface = [
      "title",
      "description",
      "group",
      "status",
      "timeline",
      "createdBy",
      "assignedTo",
      "sharedWith",
    ];
    const updateObject: any = {};
    const body = req.body;
    const { todoId } = req.params;

    if (!todoId)
      return res
        .status(BAD_REQUEST_ERROR)
        .json(ResponseBuilder.errorResponse("_id is not provided"));

    Object.keys(body).forEach((itm) => {
      if (requestInterface.indexOf(itm) >= 0) {
        updateObject[itm] = body[itm];
      }
    });

    const result = await updateItem(todoId, updateObject);

    return res.status(SUCCESS).json(ResponseBuilder.successResponse(result));
  } catch (error) {
    return res
      .status(SERVER_ERROR)
      .json(ResponseBuilder.errorResponse("somthing went wrong", error));
  }
};

export const todoList = async (req: Request, res: Response) => {
  try {
    let owner = req.query.owner as string;
    let page = req.query.page as string;
    let limit = req.query.limit as string;
    if (!page) page = "1";
    if (!limit) limit = "10";
    if (!owner) owner = "none";

    const result = await getItems(
      owner,
      res.locals._user._id,
      parseInt(page),
      parseInt(limit)
    );

    return res.status(SUCCESS).json(ResponseBuilder.successResponse(result));
  } catch (error) {
    return res
      .status(SERVER_ERROR)
      .json(ResponseBuilder.errorResponse("somthing went wrong", error));
  }
};

export const todoItem = async (req: Request, res: Response) => {
  try {
    const { todoId, page, limit } = req.params;
    const result = await getItemById(todoId);
    if (!result?._id)
      return res
        .status(NOT_FOUND_ERROR)
        .json(ResponseBuilder.errorResponse("Item not exist with this id"));

    return res.status(SUCCESS).json(ResponseBuilder.successResponse(result));
  } catch (error) {
    return res
      .status(SERVER_ERROR)
      .json(ResponseBuilder.errorResponse("Somthing went wrong", error));
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { todoId } = req.params;
    const result = await deleteTodoItem(todoId);

    return res.status(SUCCESS).json(ResponseBuilder.successResponse(result));
  } catch (error) {
    return res
      .status(SERVER_ERROR)
      .json(ResponseBuilder.errorResponse("Somthing went wrong.", error));
  }
};

export const todosCommebts = async (req: Request, res: Response) => {
  try {
    const { todoId } = req.params;
  } catch (error) {
    return res
      .status(SERVER_ERROR)
      .json(ResponseBuilder.errorResponse("Somthing went wring", error));
  }
};
