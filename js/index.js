// Comprueba si la clave studentList existe, si existe renderiza los datos almacenados en el
// localStorage.
if(localStorage.getItem('studentList')){
    const studentsJSON = JSON.parse(localStorage.getItem('studentList'));
    
    studentsJSON.forEach( (student, i) => {
        const elemArr = [];
        studentArr.push(new Student({name: student.name, surname: student.surname,
        grades: student.grades, sumGrades: student.sumGrades, average: student.average}, student.id));
        elemArr.push(student.id, studentArr[i].getFullName(), studentArr[i].average);
        printDataList("studentList__info", 'studentInfo', student.id, elemArr, addStudentSubjects);
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



