const express = require('express')
const app = express();

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

})


//Ports
const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`Connected! on port ${port}...`));