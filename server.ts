import express from "express";

const app = express();


// Add Plugins
app.use(express.json());
app.use(express.urlencoded({extended: false}))




app.get('/', (req, res) => {
    res.send('base application');
})




app.listen(3000, function() {
    console.log('Listening in 3000');
});