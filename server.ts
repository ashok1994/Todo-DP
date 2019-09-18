import express, { Request, Response } from "express";

const app = express();
import { connect, ConnectionStates } from 'mongoose';
import { User } from './models/User';
import { Todo } from './models/Todo';
import { DBError } from "./errors/DBError";



connect('mongodb://localhost:27017/test')
    .then((r) => {
        // console.log(r);
    })
    .catch(e => {
        console.log(e);
    });


// Add Plugins
app.use(express.json());
app.use(express.urlencoded({ extended: false }))




app.get('/', async (req, res, next) => {
    const u = await User.findUser({ uid: 'USER-3' });

    if (!u) {
        console.log('No such user find');
        next(new DBError('yeah', 'yeah'));
    } else {
        const todos: Todo[] = await u.getTodos();
        res.json({ todos });
    }

})




app.use(function(err:Error, req:Request, res:Response, next:()=>void) {
    if(err instanceof DBError) {
        console.log(err.stack);
        return res.status(500).send({ error: { message: err.message}});
    }

    
});



app.listen(3000, function () {
    console.log('Listening in 3000');
});