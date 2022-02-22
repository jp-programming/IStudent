// Función que imprime los datos de un objeto.
const printDataList = (DOMClass, DOMId, id, arr, eventFunction = null) => {
    // Crea un elemento div con una clase.
    const container = document.createElement('div');
    container.className = DOMClass;
    container.id = id; // Añade una clave única al contenedor.

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

    $('#modalId').text(e.target.children[0].innerText);
    $('#modalName').text(e.target.children[1].innerText);

    $('#subjectSelect').empty();
    $('#subjectSelect').append('<option selected value="default">Seleccionar asignatura</option>')

    // Carga las asignaturas que no se encuentran registradas con el estudiante.
    const id = parseInt($('#modalId').text());
    const student = studentArr[id-1];
    const grades = student.grades;
    if(grades.length === 0){
        subjectList.forEach( sj => 
            $('#subjectSelect').append(`<option value="${sj.id}">${sj.name}</option>`));
    } else{
        let subjectId;
        subjectList.forEach( sj => {
            subjectId = grades.find((grade) => grade.id === sj.id);
            if(subjectId === undefined){
                $('#subjectSelect').append(`<option value="${sj.id}">${sj.name}</option>`);
            }
        });
    }

    $('#subjectStdInfo').empty();

    // Renderiza las asignaturas que tiene el estudiante.
    student.grades.forEach((gd) => {
        const elemArr = [];
        const {name, totalHours} = subjectList.find((subject) => subject.id === gd.id);

        elemArr.push(gd.id, name, totalHours);
        printDataList("subjectStdList__info", 'subjectStdInfo', `S-${gd.id}`, elemArr);

        $(`#S-${gd.id}`).append(`<input id="${gd.id}Grade" class="gradeInput" value="${gd.grade}" />`);
    });
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
        elemArr.push(student.id, student.getFullName(), student.average);
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
    
    // Array que contiene la info que se va a mostrar.
    const elemArr = [];
    elemArr.push(student.id, student.getFullName(), student.average);
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

// Función que añade de las asignaturas existentes una al estudiante.
const addSubjectStd = () => {
    const subjectSelect = $('#subjectSelect');
    const subjectId = subjectSelect.val(); 

    if(subjectId === 'default'){
        return;
    }

    $(`option[value*=${subjectId}]`).remove();

    const subject = subjectList.find((sj) => subjectId === sj.id);

    const elemArr = [];
    elemArr.push(subject.id, subject.name, subject.totalHours);
    printDataList("subjectStdList__info", 'subjectStdInfo', `S-${subject.id}`, elemArr);

    $(`#S-${subject.id}`).append(`<input id="${subjectId}Grade" class="gradeInput" value="0" placeholder="Calificación"/>`);
};

// Guarda las calificaciones en el array del objeto instaciado de Student.
const saveGrades = () => {
    const subject = $('#subjectStdInfo').children();
    const studentId = parseInt($('#modalId').text());
    const student = studentArr[studentId-1];

    if(!(subject.length > 0)){
        return;
    }

    let gradeObj;

    for(sub of subject){
        gradeObj = student.grades.find((grade) => 
            grade.id === sub.children[0].innerText);

        // En el caso de que ya exista una asignatura lo que hace es reemplazar la calificación.
        !gradeObj
            ? student.grades.push({id: sub.children[0].innerText, 
                                    grade: parseInt(sub.children[3].value)})
            : student.grades.forEach((gd) => {
                if(gd.id === gradeObj.id) {
                    gd.grade = parseInt(sub.children[3].value);
                } 
            });
    }

    student.sumGrades = 0;
    student.studentGradesAvg();

    localStorage.setItem('studentList', JSON.stringify(studentArr));

    $(`#${studentId}`).children()[2].innerText = student.average; 
};

