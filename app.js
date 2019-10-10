
const Joi = require('joi');
const express = require('express')
const app = express();



//activate json, by default he's not activated.
app.use(express.json()); //piece of middleware.

//our courses array. instead of databases.
const courses = [
    {id:1, name: 'JavaScript'},
    {id:2, name: 'Php'},
    {id:3, name: 'Python'},
    {id:4, name: 'Node.js'},

];

app.get('/', (req, res) => {
    res.send('Hello from Node.js');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

//Http get request
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given id is not found!');
    res.send(course);
});

//Http post request
app.post('/api/courses', (req, res) => {
    const schema = {
        name:Joi.string().min(3).required()
    };

    Joi.validate(req.body, schema);

    if(!req.body.name || req.body.name.length < 3){
        //400 Bad request
        rest.status(400).send('Name is required and should be minimum 3 characters.');
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };                                          //with postman...
    courses.push(course);
    res.send(course);
});


//Ports
const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`Connected! on port ${port}...`));