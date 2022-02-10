const APIURL = 'http://localhost:8080/api/students';
const studentArr = []; // Array que contiene los objetos estudiante.
// document ready
$( () => {
    $.ajax({
        method: "GET",
        url: APIURL,
        success: (req) => {
            for(student of req){
                console.log(student)
                const elemArr = [];
                studentArr.push(new Student({name: student.name, surname: student.surname,
                grades: student.grades, sumGrades: student.sumGrades, average: student.average}, student.id));
                elemArr.push(studentArr[student.id-1].getFullName(), studentArr[student.id-1].average);
                printDataList("studentList__info", 'studentInfo', student.id, elemArr, addStudentSubjects);
            }
        }
    });

    // Agregando eventos
    $('#descAvg').click( () => printStudentAvgList(studentArr) );
    $('#form').submit( e => addStudent(e) );
    $('#addStudent').click( () => {
        // Elimina la clase que oculta los inputs al clickear en el boton de añadir
        $('#name').removeClass('hidden');
        $('#surname').removeClass('hidden');
        $('#submit').removeClass('hidden');
    });

    // Evento para cerrar el modal.
    $('#closeModalBtn').on('click', () => modal.fadeOut(500, 
        () => overlay.css('display', 'none')));

    $('#formSubject').submit( e => addSubject(e) );
    $('#addSubjectBtn').click( () => {
        // Elimina la clase que oculta los inputs al clickear en el boton de añadir
        $('#subjectId').removeClass('hidden');
        $('#subjectName').removeClass('hidden');
        $('#totalHours').removeClass('hidden');
        $('#subjectSubmitBtn').removeClass('hidden');
    });
});
