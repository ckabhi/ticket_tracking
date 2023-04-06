import mongoose from "mongoose";
import {
  TodoItem,
  UpdateRequest,
} from "../schema/interface/TodoItem.interface";
import { TodoItemModel } from "../schema/TodoItem.schema";
import { UserModel } from "../schema/User.schema";
import { getAllUser } from "./account.model";

export const createItem = async (todoData: TodoItem) => {
  const result = new TodoItemModel(todoData);
  return await result.save();
};

export const updateItem = async (todoId: string, updateData: UpdateRequest) => {
  return await TodoItemModel.findByIdAndUpdate(todoId, updateData, {
    new: true,
  });
};

export const getItems = async (
  ownerType: string,
  userId: string,
  page: number,
  limit: number
) => {
  let queryParameter: any = {};
  let skip = (page - 1) * limit;
  if (ownerType == "me") queryParameter["createdBy"] = userId;

  const todoList = await TodoItemModel.find(queryParameter)
    .skip(skip)
    .limit(limit)
    .lean();

  const userList = await getAllUser();
  const todoListResult: Object[] = [];

  for (const item of todoList) {
    let rowItem: any = Object.assign({}, item);

    if (item?.createdBy) {
      rowItem["createdBy"] = await mappedToUser(item.createdBy, userList);
    }
    if (item?.assignedTo) {
      rowItem["assignedTo"] = await mappedToUser(item.assignedTo, userList);
    }
    if (item?.sharedWith?.length) {
      rowItem["sharedWith"] = await mappedIdsToUser(item.sharedWith, userList);
    }
    if (item.comments?.length) {
      rowItem["comments"] = await mappedCommentToUser(item.comments, userList);
    }

    todoListResult.push(rowItem);
  }

  return todoListResult;
};

const mappedIdsToUser = async (userIds: string[], userList: any) => {
  const mappedIdsWithUser: Object[] = [];

  if (userIds.length < 1) return [];
  userIds.forEach((id) => {
    mappedIdsWithUser.push(userList[id]);
  });

  return mappedIdsWithUser;
};

const mappedCommentToUser = async (comments: any, userList: any) => {
  comments = comments.map((itm: { [x: string]: any }) => {
    itm["from"] = userList[itm.userId];
  });
};

const mappedToUser = async (userId: string, userList: any) => {
  console.log("usr", userList[userId]);
  return userList[userId];
};

export const getItemById = async (id: string) => {
  const userList = await getAllUser();
  const result = await TodoItemModel.findOne({ _id: id }).lean();
  const formatedResult: any = Object.assign({}, result);
  if (result?.createdBy) {
    formatedResult["createdBy"] = await mappedToUser(
      result.createdBy,
      userList
    );
  }

  if (result?.comments?.length) {
    formatedResult["comments"] = await mappedCommentToUser(
      result.comments,
      userList
    );
  }

  if (result?.sharedWith?.length) {
    formatedResult["sharedWith"] = await mappedIdsToUser(
      result.sharedWith,
      userList
    );
  }

  return formatedResult;
};

export const deleteTodoItem = async (todoId: string) => {
  return await TodoItemModel.findByIdAndUpdate(
    todoId,
    { isDeleted: true },
    { new: true }
  );
};
