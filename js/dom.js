// document ready
$( () => {
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
