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

// Esta es la función que calcula el promedio de las calificaciones.
Student.prototype.setAverage = function(grades, num) {
    this.average = Math.round(grades / num);
} 

// Función que realiza la suma de las calificaciones y calcula el average.
Student.prototype.studentGradesAvg = function(){
    this.grades.forEach((gd)=>{
        this.sumGrades = this.summatory(this.sumGrades, gd.grade);
    });
    
    this.setAverage(this.sumGrades, this.grades.length); // Guarda el promedio de las calificaciones.
};

// Función constructora de las asignaturas.
function Subject(data){
    this.id = data.id;
    this.name = data.subjectName;
    this.totalHours = data.totalHours;
};
