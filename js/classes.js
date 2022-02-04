// Función constructora de los objetos persona
function Person(name, surname) {
    this.name = name;
    this.surname = surname;
}

Person.prototype.getFullName = function(){ return `${this.name} ${this.surname}` };

// Función constructora de los objetos estudiante
function Student(data, id){
    Person.call(this, data.name, data.surname); // Llama al método constructo de persona y lo vincula
    this.id = id;
    this.grades = data.grades || [];
    this.sumGrades = data.sumGrades || 0;
    this.average = data.average || 0;
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
    const num = parseInt(prompt(`Calcular promedio 
    Introduzca la cantidad de asignaturas:`));

    this.setGrades(num); // Guarda las calificaciones del estudiante.
    this.setAverage(this.sumGrades, num); // Guarda el promedio de las calificaciones.
};

// Función constructora de las asignaturas.
function Subject(data){
    this.id = data.id;
    this.name = data.subjectName;
    this.totalHours = data.totalHours;
};
