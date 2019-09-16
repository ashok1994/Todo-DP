import { Document, Schema, Model, model } from "mongoose";

export interface ITodo {
    createdAt: number;
    byUser: string;
    text: string;
    done: boolean;
}  


export interface ITodoModel extends ITodo, Document {}

export const TodoSchema: Schema = new Schema({ 
    createdAt: Number,
    byUser: String,
    text: String,
    done: Boolean
});


export const TodoModel: Model<ITodoModel> = model<ITodoModel>("Todo", TodoSchema);