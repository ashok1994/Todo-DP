import { Model, Document } from "mongoose";

export abstract class BaseModel {

    // Using `any` for now
    protected abstract setProps(e: any);
    
    static async create<E, B extends Document, U>(e: E, m: Model<B>, classC: any): Promise<U> {
        let entity: any;
        try {
            entity = await m.create(e);
        } catch (e) {
            throw e;
        }
        return classC.getInstance(entity);
    }

    static async find<B extends Document, U>(query: any, m: Model<B>, classC: any): Promise<U> {
        let entity: any;
        try {
            entity = await m.findOne(query);
            if(!entity) throw new Error('Not Found');
        } catch(e) {
            throw e;
        }
        return classC.getInstance(entity);
    }
}


