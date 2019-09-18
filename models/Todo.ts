import { BaseModel } from "./BaseModel";
import { ITodo, ITodoModel, TodoModel } from "../dbmodels/Todo.model";
import { Counter } from "./Counter";

export class Todo extends BaseModel implements ITodo {
    uid!: string;
    createdAt!: number;
    byUser!: string;
    text!: string;
    done!: boolean;


    protected setProps(t: ITodo) {
        // Problem  in maintainence 
        // Always need to add the map 
        // TODO :  Find a better way to map the keys to class object
        this.createdAt = t.createdAt;
        this.byUser = t.byUser;
        this.done = t.done;
        this.text = t.text;
        this.uid = t.uid;
    }

    static getInstance(t: ITodo) {
        let todo: Todo = new Todo();
        todo.setProps(t);
        return todo;
    }

    static async createTodo(byUser: string, text: string): Promise<Todo> {
        const c: Counter = await Counter.nextCounter('Todo');
        const t: ITodo = {
            uid: 'TODO-' + c.getCount(),
            createdAt: Date.now(),
            byUser: byUser,
            text: text,
            done: false
        };

        return Todo.create<ITodo, ITodoModel, Todo>(t, TodoModel, Todo);
    }

    async mark(done: boolean): Promise<Todo> {
        return Todo.findOneAndUpdate<ITodoModel, Todo>({ uid: this.uid }, { done: done }, TodoModel, Todo);
    }
}