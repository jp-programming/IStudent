// Función que imprime los datos de un objeto.
const printDataList = (DOMClass, DOMId, id, arr, eventFunction = null) => {
    // Crea un elemento div con una clase.
    const container = document.createElement('div');
    container.className = DOMClass;
    container.id = id; // Añade una clave única al estudiante.

    // Añade un evento si se envía uno.
    if(eventFunction !== null) container.addEventListener('click', eventFunction);
    
    // Renderiza en el elemento contenedor padre de los contenedores un elemento div
    const elemDOM = document.getElementById(DOMId);
    elemDOM.appendChild(container);
    arr.forEach( elem =>  
        container.innerHTML += `<p>${elem}</p>`
    );
};

// Obtiene el nombre del estudiante y lo pone en el modal
const overlay = $('#overlay');
const modal = $('#modal');
const addStudentSubjects = (e) => {
    overlay.css('display', 'block');
    modal.fadeOut('slow').fadeIn(250); // Animación encadenada que oculta y muestra el modal.
    $('#modalName').text(e.target.firstChild.textContent);
};

// Función que vuelve a imprimir el promedio de los estudiantes de
// pero ordenados de manera descendente.
function printStudentAvgList(arr){
    // Ordena el arreglo de objetos estudiante tomando el promedio.
    arr.sort((a, b) => b.average - a.average); 

    $('.studentList__info').remove();
 
    // Este foreach vuelve a imprimir los mensajes de promedio.
    arr.forEach((student) => {
        const elemArr = [];
        elemArr.push(student.getFullName(), student.average);
        printDataList("studentList__info", 'studentInfo', student.id, elemArr, addStudentSubjects);
    });
}

// Función que toma los datos del estudiante para almacenarlos en un array.
const addStudent = function(e){
    const name = $('#name');
    const surname = $('#surname');

    const studentLength = studentArr.length+1;
    studentArr.push(new Student({name: name.val(), surname: surname.val()}, studentLength));
    e.preventDefault();

    localStorage.setItem('studentList', JSON.stringify(studentArr));

    name.val('');
    surname.val('');

    const student = studentArr[studentLength - 1];

    //student.studentGradesAvg();
    
    // Array que contiene la info que se va a mostrar.
    const elemArr = [];
    elemArr.push(student.getFullName(), student.average);
    printDataList("studentList__info", 'studentInfo', student.id, elemArr, addStudentSubjects);

    // Añade una clase para ocultar los inputs y el boton de enviar.
    name.addClass('hidden');
    surname.addClass('hidden');
    $('#submit').addClass('hidden');                
};

// Función que añade una asignatura a la lista de asignaturas.
const addSubject = function(e){
    const subjectId = $('#subjectId');
    const subjectName = $('#subjectName');
    const totalHours = $('#totalHours');

    const subjectLength = subjectList.length+1;
    subjectList.push(new Subject({id: subjectId.val(), subjectName: subjectName.val(), 
        totalHours: totalHours.val()}));
    e.preventDefault();

    localStorage.setItem('subjectList', JSON.stringify(subjectList));

    subjectId.val('');
    subjectName.val('');
    totalHours.val('');

    const subject = subjectList[subjectLength - 1];

    // Array que contiene la info que se va a mostrar.
    const elemArr = [];
    elemArr.push(subject.id, subject.name, subject.totalHours);
    printDataList("subjectList__info", 'subjectInfo', subject.id, elemArr);

    // Añade una clase para ocultar los inputs y el boton de enviar.
    subjectId.addClass('hidden');
    subjectName.addClass('hidden');
    totalHours.addClass('hidden');
    $('#subjectSubmitBtn').addClass('hidden');
};