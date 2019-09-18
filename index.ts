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


(async function () {
    try {        
        // await User.createUser('Ashok', 'askipop@gmail.com', 'password')
        //       .then(u => u.addTodo('Buy Apples'))
        //       .then(t => t.mark(true))
        //       .then(t => t.mark(false))
        //       .then(t => t.mark(true))

        const u = await User.findUser({ uid: 'USER-2' });

        if(!u) {
            console.log('No such user find');
        } else {
            // await u.addTodo('Buy Shoes');
            const todos:Todo[] = await u.getTodos();
            console.log(todos);
        }
        

    
    } catch (e) {
        console.log(e);
    }
})()