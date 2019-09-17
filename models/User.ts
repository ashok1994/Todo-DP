import { IUser, IUserModel, UserModel } from "../dbmodels/User.model";
import { BaseModel } from "./BaseModel";
import { Todo } from "./Todo";
import { Counter } from "./Counter";

export class User extends BaseModel implements IUser{
    uid: string;
    createdAt: number;
    name: string;
    email: string;
    password: string;

    protected setProps(user: IUser) {
        this.uid = user.uid;
        this.createdAt = user.createdAt;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
    }

    static getInstance(user: IUser): User {
        let u:User = new User();
        u.setProps(user);
        return u;
    }

    static async createUser(name: string, email: string, password: string):Promise<User> {
        
        const c:Counter = await Counter.nextCounter('User');
        const u:IUser = {
            uid: 'USER-'+ c.getCount(),
            name: name,
            email: email,
            password: password,
            createdAt: Date.now()
        };
        return User.create<IUser, IUserModel, User>(u, UserModel, User);
    }

    static async findUser(query: any): Promise<User>{
        let u: IUser | undefined = undefined;
        return User.find<IUserModel, User>(query, UserModel, User);
    }

    async addTodo(text: string): Promise<Todo>{
        return Todo.createTodo(this.uid, text);
    }        
}

