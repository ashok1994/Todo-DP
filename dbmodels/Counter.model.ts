import { Document, Schema, Model, model } from "mongoose";

export interface ICounter {
    counterFor: string;
    count: number;
}


export interface ICounterModel extends ICounter, Document { }

export const CounterSchema: Schema = new Schema({
    counterFor: String,
    count: Number
});


export const CounterModel: Model<ICounterModel> = model<ICounterModel>("Counter", CounterSchema);