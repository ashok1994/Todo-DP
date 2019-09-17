import { BaseModel } from "./BaseModel";
import { ICounter, ICounterModel, CounterModel } from "../dbmodels/Counter.model";


export class Counter extends BaseModel implements ICounter {

    counterFor: string;
    count: number;
    
    protected setProps(c: ICounter) {
        this.count = c.count;
        this.counterFor = c.counterFor;
    } 

    getCount(): number {
        return this.count;
    }

    static getInstance(c: ICounter): Counter {
        const counter = new Counter();
        counter.setProps(c);
        return counter;
    }

    static nextCounter(counterFor: string) : Promise<Counter>{
        return Counter.findOneAndUpsert<ICounterModel, Counter>(
            { counterFor: counterFor },
            { $inc: { count : 1} },
            CounterModel,
            Counter
        );
    }
}