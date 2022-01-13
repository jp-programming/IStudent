// Función constructora de los objetos persona
function Person(name, surname) {
    this.name = name;
    this.surname = surname;
}

Person.prototype.getFullName = function(){ return `${this.name} ${this.surname}` };

// Función constructora de los objetos estudiante
function Student(data){
    Person.call(this, data.name, data.surname); // Llama al método constructo de persona y lo vincula
    this.grades = [];
    this.sumGrades = 0;
    this.average = null;
}

// Hereda los métodos de persona
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

// Esta función hace una sumatoria de todas las nota del estudiante.
Student.prototype.summatory = (grades, grade) => grades + grade;

// Toma cada una de las notas del estudiante, dependiendo de cuantas
// calificaciones se quiera tomar, guarda cada una de ellas y su sumatoria.
Student.prototype.setGrades = function(num){
    let counter = 0;
    let grade;

    // Esta instrucción toma y va sumando cada una de las notas digitadas.
    while(num > counter){
        grade = parseInt(prompt(`Digite la nota de la asignatura #${++counter}:`));
        this.grades.push(grade);
        this.sumGrades = this.summatory(this.sumGrades, grade);
    }
};

// Esta es la función que calcula el promedio de las calificaciones.
Student.prototype.setAverage = function(grades, num) {
    this.average = Math.round(grades / num);
} 

// Por último esta es la función principal del programa, es la encargada de
// llamar en el orden correcto a cada una de las funciones para que el código
// sea legible.
Student.prototype.studentGradesAvg = function(){
    const msg = `${this.getFullName()} su promedio de calificación es:`;
    const num = parseInt(prompt(`Calcular promedio 
    Introduzca la cantidad de asignaturas:`));

    this.setGrades(num); // Guarda las calificaciones del estudiante.
    this.setAverage(this.sumGrades, num); // Guarda el promedio de las calificaciones.

    // Renderiza en el elemento studentList del DOM un elemento li
    // que contiene el nombre y promedio del estudiante. 
    document.getElementById('studentList')
        .appendChild(document.createElement('li'))
        .innerText = `${msg} ${this.average}`;
};

const studentArr = []; // Array que contiene los objetos estudiante.

// Función que toma los datos del estudiante para almacenarlos en un array.
const addStudent = function(e){
    const name = document.getElementById('name');
    const surname = document.getElementById('surname');

    studentArr.push(new Student({name: name.value, surname: surname.value}));
    e.preventDefault();
    
    name.value = '';
    surname.value = '';

    studentArr[studentArr.length - 1].studentGradesAvg();
};


// Función que vuelve a imprimir el promedio de los estudiantes de
// pero ordenados de manera descendente.
function printStudentAvgList(arr){
    // Ordena el arreglo de objetos estudiante tomando el promedio.
    arr.sort((a, b) => b.average - a.average); 

    const studentList = document.getElementById('studentList');
    studentList.innerText = '';

    // Este foreach vuelve a imprimir los mensajes de promedio.
    arr.forEach((student) => 
        studentList.appendChild(document.createElement('li'))
            .innerText = `${student.getFullName()} su promedio de calificación es: ${student.average}`
    );
}

// Agregando eventos
document.getElementById('descAvg').onclick = () => printStudentAvgList(studentArr);
document.getElementById('form').onsubmit = e => addStudent(e);
