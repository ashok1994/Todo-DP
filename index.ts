import { connect } from 'mongoose';
import { User } from './models/User';
import { Todo } from './models/Todo';



connect('mongodb://localhost:27017/test')
    .then((r) => {
        console.log(r);
    })
    .catch(e => {
        console.log(e);
    });


(async function() {
    try {
        // const u:User = await User.createUser('ID0', 'ashok', 'askipop@gmail.com', 'password');
        const u:User = await User.findUser({ uid: 'ID0' });
        // const t: Todo = await Todo.createTodo('IDO', 'Task1');
        const t:Todo = await u.addTodo('by await');
        console.log(t);
    } catch(e) {
        console.log(e);
    }
})()