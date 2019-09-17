import { Model, Document } from "mongoose";

export abstract class BaseModel {

    // Using `any` for now
    protected abstract setProps(e: any);

    protected static async create<E, B extends Document, U>(e: E, m: Model<B>, classC: any): Promise<U> {
        let entity: any;
        try {
            entity = await m.create(e);
        } catch (e) {
            throw e;
        }
        return classC.getInstance(entity);
    }

    protected static async find<B extends Document, U>(query: any, m: Model<B>, classC: any): Promise<U> {
        let entity: any;
        try {
            entity = await m.findOne(query);
            if (!entity) throw new Error('Not Found');
        } catch (e) {
            throw e;
        }
        return classC.getInstance(entity);
    }

    protected static async findOneAndUpdate<B extends Document, U>(query: any, update: any, m: Model<B>, classC: any): Promise<U> {
        let entity: any;
        try {
            entity = await m.findOneAndUpdate(query, { $set: update }, { new: true }).exec();
        } catch (e) {
            throw e;
        }
        return classC.getInstance(entity);
    }

    protected static async findAll<B extends Document, U>(query: any, m: Model<B>, classC: any) {
        let entities: any[];
        try {
            entities = await m.find(query).exec();
        } catch(e) {
            throw e;
        }
        entities = entities.map(function(entity){
            return classC.getInstance(entity);
        })

        return entities;
    } 


    protected static async findOneAndUpsert<B extends Document, U>(query: any, update: any, m:Model<B>, classC: any): Promise<U> {
        let entity: any;
        try {
            entity = await m.findOneAndUpdate(query, update, { upsert: true, new: true }).exec();
        } catch(e){ 
            throw e;
        }

        return classC.getInstance(entity);
    }
}