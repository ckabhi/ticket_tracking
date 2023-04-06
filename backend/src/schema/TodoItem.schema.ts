import mongoose, { Schema, Model, model } from "mongoose";
import { Comments, TodoItem } from "./interface/TodoItem.interface";

export const TodoItemSchema = new Schema<TodoItem>(
  {
    title: { type: String, required: true },
    description: { type: String },
    createdBy: { type: String },
    assignedTo: { type: String },
    status: {
      type: String,
      enum: ["todo", "working", "completed"],
      default: "todo",
    },
    sharedWith: [{ type: String }],
    group: { type: String },
    comments: {
      type: new Schema<Comments>(
        {
          userId: { type: String },
          message: { type: String },
          isDeleted: { type: Boolean, default: false },
        },
        {
          timestamps: { createdAt: "created_at" },
        }
      ),
    },

    timeline: { type: Date },
    metaData: { type: Object },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const TodoItemModel = model<TodoItem>("TodoItem", TodoItemSchema);
