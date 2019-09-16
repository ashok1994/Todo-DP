import { BaseModel } from "./BaseModel";
import { ITodo, ITodoModel, TodoModel } from "../dbmodels/Todo.model";

export class Todo extends BaseModel implements ITodo {
    createdAt: number;
    byUser: string;
    text: string;
    done: boolean;


    protected setProps(t: ITodo) {
        this.createdAt = t.createdAt;
        this.byUser = t.byUser;
        this.done = t.done;
        this.text = t.text;
    }

    static getInstance(t: ITodo) {
        let todo:Todo = new Todo();
        todo.setProps(t);
        return todo;
    }

    static async createTodo(byUser, text): Promise<Todo>{
        const t: ITodo = {
            createdAt: Date.now(),
            byUser: byUser,
            text: text,
            done: false
        };

        return this.create<ITodo, ITodoModel, Todo>(t, TodoModel, Todo);
    }

}