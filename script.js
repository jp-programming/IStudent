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

// Evento que al clickear en el estudiante se abre un modal para modificar sus asignaturas.
const overlay = document.getElementById('overlay');
const addStudentSubjects = (e) => {
    overlay.style.display = 'block';
    document.getElementById('modalName').innerText = e.target.firstChild.textContent;
};

// Función que imprime los datos de un objeto.
const printDataList = (DOMClass, DOMId, id, arr, eventFunction = null) => {
    // Crea un elemento div con una clase.
    const container = document.createElement('div');
    container.className = DOMClass;
    container.id = id; // Añade una clave única al estudiante.

    // Añade un evento si se envía uno.
    if(eventFunction !== null) container.addEventListener('click', eventFunction);
    
    // Renderiza en el elemento contenedor padre de los contenedores un elemento div
    const elemDOM = document.getElementById(DOMId)
    elemDOM.appendChild(container);
    arr.forEach( elem =>  
        container.innerHTML += `<p>${elem}</p>`
    );
};

const studentArr = []; // Array que contiene los objetos estudiante.

// Comprueba si la clave studentList existe, si existe renderiza los datos almacenados en el
// localStorage.
if(localStorage.getItem('studentList')){
    const studentsJSON = JSON.parse(localStorage.getItem('studentList'));
    
    studentsJSON.forEach( (student, i) => {
        const elemArr = [];
        studentArr.push(new Student({name: student.name, surname: student.surname,
        grades: student.grades, sumGrades: student.sumGrades, average: student.average}, student.id));
        elemArr.push(studentArr[i].getFullName(), studentArr[i].average);
        printDataList("studentList__info", 'studentInfo', student.id, elemArr, addStudentSubjects);
    });
}

// Función que toma los datos del estudiante para almacenarlos en un array.
const addStudent = function(e){
    const name = document.getElementById('name');
    const surname = document.getElementById('surname');

    const studentLength = studentArr.length+1;
    studentArr.push(new Student({name: name.value, surname: surname.value}, studentLength));
    e.preventDefault();

    localStorage.setItem('studentList', JSON.stringify(studentArr));
    
    name.value = '';
    surname.value = '';

    const student = studentArr[studentLength - 1];

    //student.studentGradesAvg();
    
    // Array que contiene la info que se va a mostrar.
    const elemArr = [];
    elemArr.push(student.getFullName(), student.average);
    printDataList("studentList__info", 'studentInfo', student.id, elemArr, addStudentSubjects);

    // Añade una clase para ocultar los inputs y el boton de enviar.
    name.classList.add('hidden');
    surname.classList.add('hidden');
    document.getElementById('submit').classList.add('hidden');                
};

// Función que vuelve a imprimir el promedio de los estudiantes de
// pero ordenados de manera descendente.
function printStudentAvgList(arr){
    // Ordena el arreglo de objetos estudiante tomando el promedio.
    arr.sort((a, b) => b.average - a.average); 

    const studentInfo = document.getElementById('studentInfo');

    const studentList = document.querySelectorAll('.studentList__info');
    studentList.forEach( student => {
        student.remove();
    });

    // Este foreach vuelve a imprimir los mensajes de promedio.
    arr.forEach((student) => {
        const studentContainer = document.createElement('div');
        studentContainer.className = "studentList__info";
        studentContainer.id = student.id;
        studentInfo.addEventListener('click', addStudentSubjects); // Añade un evento para gestionar las asignaturas.

        studentInfo.appendChild(studentContainer)
            .innerHTML = `<p>${student.getFullName()}</p> 
                         <p>${student.average}</p>`;
    });
}

const subjectList = []; // Array que almacena las asignaturas existentes.

// Comprueba si la clave studentList existe, si existe renderiza los datos almacenados en el
// localStorage.
if(localStorage.getItem('subjectList')){
    const subjectsJSON = JSON.parse(localStorage.getItem('subjectList'));

    subjectsJSON.forEach( (subject, i) => {
        const elemArr = [];
        subjectList.push(new Subject({id: subject.id, subjectName: subject.name, 
        totalHours: subject.totalHours}));
        elemArr.push(subjectList[i].id, subjectList[i].name, subjectList[i].totalHours);
        printDataList("subjectList__info", 'subjectInfo', subject.id, elemArr);
    });
}

// Función que añade una asignatura a la lista de asignaturas.
const addSubject = function(e){
    const subjectId = document.getElementById('subjectId');
    const subjectName = document.getElementById('subjectName');
    const totalHours = document.getElementById('totalHours');

    const subjectLength = subjectList.length+1;
    subjectList.push(new Subject({id: subjectId.value, subjectName: subjectName.value, 
        totalHours: totalHours.value}));
    e.preventDefault();

    localStorage.setItem('subjectList', JSON.stringify(subjectList));

    subjectId.value = '';
    subjectName.value = '';
    totalHours.value = '';

    const subject = subjectList[subjectLength - 1];

    // Array que contiene la info que se va a mostrar.
    const elemArr = [];
    elemArr.push(subject.id, subject.name, subject.totalHours);
    printDataList("subjectList__info", 'subjectInfo', subject.id, elemArr);

    // Añade una clase para ocultar los inputs y el boton de enviar.
    subjectId.classList.add('hidden');
    subjectName.classList.add('hidden');
    totalHours.classList.add('hidden');
    document.getElementById('subjectSubmitBtn').classList.add('hidden');
};

// Agregando eventos
document.getElementById('descAvg').onclick = () => printStudentAvgList(studentArr);
document.getElementById('form').onsubmit = e => addStudent(e);
document.getElementById('addStudent').onclick = () => {
    // Elimina la clase que oculta los inputs al clickear en el boton de añadir
    document.getElementById('name').classList.remove('hidden');
    document.getElementById('surname').classList.remove('hidden');
    document.getElementById('submit').classList.remove('hidden');
};

// Evento para cerrar el modal.
document.getElementById('closeModalBtn')
    .addEventListener('click', () => overlay.style.display = 'none');

document.getElementById('formSubject').onsubmit = e => addSubject(e);
document.getElementById('addSubjectBtn').onclick = () => {
    // Elimina la clase que oculta los inputs al clickear en el boton de añadir
    document.getElementById('subjectId').classList.remove('hidden');
    document.getElementById('subjectName').classList.remove('hidden');
    document.getElementById('totalHours').classList.remove('hidden');
    document.getElementById('subjectSubmitBtn').classList.remove('hidden');
};