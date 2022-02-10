const express = require('express');
const cors = require('cors');
const app = express();

let students = [
    {
        "id": 1,
        "name": "Jose",
        "surname": "Escamilla",
        "grades": [],
        "sumGrades": 0,
        "average": 0
    },
    {
        "id": 2,
        "name": "Carlos",
        "surname": "Milano",
        "grades": [],
        "sumGrades": 0,
        "average": 0
    }
];

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
   res.send(`<h1>API de estudiantes</h1>
   <p>/api/students para obtener todos los estudiantes</p>
   <p>/api/students/{id} para obtener el estudiante que coincida con el id</p>`);
});

app.get('/api/students', (req, res) => {
    res.json(students);
});

app.get('/api/students/:id', (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(student => student.id === id);

    if(student) {
        res.json(student);
    } else {
        res.status(404).end();
    }
});

app.delete('/api/students/:id', (req, res) => {
    const id = Number(req.params.id);
    students = students.filter(student => student.id !== id);
    res.status(204).end();
});

app.post('/api/students', (req, res) => {
    const student = req.body;

    if(!student || !student.name){
        return res.status(400).json({
            error: 'student is missing'
        })
    }

    const ids = students.map(student => student.id);
    const maxId = Math.max(... ids);

    const newStudent = {
        id: maxId + 1,
        name: student.name
    }

    students = [...students, newStudent];

    res.status(201).json(newStudent);
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`it's alive on port ${PORT}`)
});