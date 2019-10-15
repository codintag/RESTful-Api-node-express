
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
    if(!course) return res.status(404).send('The course with the given id is not found!');
    res.send(course);
});

//Http post request
app.post('/api/courses', (req, res) => {
   const { error } = validateCourse(req.body); //result.error

   if(error) return res.status(400).send(result.error.details[0].message);  //400 Bad request 

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };                                          //with postman...
    courses.push(course);
    res.send(course);
});

//uptade request
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given id is not found!');

    const { error } = validateCourse(req.body); //result.error

    if (error) return res.status(400).send(error.details[0].message); //400 Bad request


    course.name = req.body.name;
    res.send(course);

});


//delete request
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given id is not found!');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});


function validateCourse(course) {
    const schema = {
        name:Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}


//Ports
const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`Connected! on port ${port}...`));