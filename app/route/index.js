const authAdmin = require('../middleware/auth/authAdmin');
const authStudent = require('../middleware/auth/authStudent');
const checkQuestion = require('../middleware/auth/checkQuestion');
const checkUser = require('../middleware/auth/checkUser');
const getAllCourses = require('../middleware/kurzus/getAllCourses');
const getCourse = require('../middleware/kurzus/getCourse');
const getAvailableCourses = require('../middleware/kurzus/getAvailableCourses');
const delCourse = require('../middleware/kurzus/delCourse');
const saveCourse = require('../middleware/kurzus/saveCourse');
const saveStudent = require('../middleware/student/saveStudent');
const saveStudentCourse = require('../middleware/student/saveStudentCourse');
const getAllStudentCourses = require('../middleware/student/getAllStudentCourses');
const render = require('../middleware/render');
const getStudent = require('../middleware/student/getStudent');
const delStudentCourse = require('../middleware/student/delStudentCourse');
const logout = require('../middleware/auth/logout');

const courseModel = require('../models/course');
const studentModel = require('../models/student');



module.exports = function(app){
    const objRepo = {
        courseModel: courseModel,
        studentModel: studentModel,
    };  

    app.use('/regisztracio',
        saveStudent(objRepo),
        render(objRepo,'regisztracio'));

    app.use('/elfelejtettJelszo',
        checkQuestion(objRepo),
        render(objRepo,'elfelejtettJelszo'));
    
    app.use('/admin/kurzusok/:courseid/edit',
        authAdmin(objRepo),
        getCourse(objRepo),
        saveCourse(objRepo),
        render(objRepo, 'newCourse'));
    
    app.get('/admin/kurzusok/:courseid/del',
        authAdmin(objRepo),
        getCourse(objRepo),
        delCourse(objRepo));

    app.use('/admin/kurzusok/new',
        authAdmin(objRepo),
        saveCourse(objRepo),
        render(objRepo, 'newCourse'));

    app.get('/admin/kurzusok',
        authAdmin(objRepo),
        getAllCourses(objRepo),
        render(objRepo, 'adminProfile'));

    app.get('/student/:userid/kurzusaim',
        authStudent(objRepo),
        getStudent(objRepo),
        getAllStudentCourses(objRepo),
        render(objRepo, 'profile'));
    
    app.get('/student/:userid/availableCourses',
        authStudent(objRepo),
        getStudent(objRepo),
        getAvailableCourses(objRepo),
        render(objRepo, 'select'));

    app.get('/student/:userid/course/:courseid/new',
        authStudent(objRepo),
        getStudent(objRepo),
        getCourse(objRepo),
        saveStudentCourse());

    app.get('/student/:userid/kurzusaim/:courseid/del',
        authStudent(objRepo),
        getStudent(objRepo),
        getCourse(objRepo),
        delStudentCourse());
    
    

    app.use('/logout', logout());

    app.get('/favicon.ico',(req, res)=>{
        res.status(204);
        res.end();
    });

    app.use('/',checkUser(objRepo), render(objRepo,'index')); 
};