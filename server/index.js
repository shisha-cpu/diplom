
    import express from 'express'
    import cors from 'cors'
    import mongoose from 'mongoose'
    import * as UserController  from './controllers/controllers.js'
    import * as CourseController from './controllers/courseControllers.js'
    mongoose 
    .connect('mongodb+srv://admin:wwwwww@cluster0.weppimj.mongodb.net/diplom?retryWrites=true&w=majority&appName=Cluster0' ) 
    .then(()=> console.log('DB okey')) 
    .catch((err)=> console.log('db error' , err))


    const app = express()
    app.use(express.json())
    app.use(cors())

    //авторизация
    app.post('/register'  , UserController.register)
    app.post('/login' , UserController.login )

    //Курсы

    app.post('/course' ,CourseController.addCourse )
    app.get('/course', CourseController.getCourse)
    app.get('/course/:id' , CourseController.getCourseById)
    app.get('/courseDelete/:id' , CourseController.deleteCourse)
    app.get('/userCourse/:id' , CourseController.getUserCourses)
    app.post('/courseLike' , CourseController.changeLikes)
    app.get('/fovourite/:id' , CourseController.getFovourite)
    //Баланс

    app.post('/balance' , UserController.changeBalance)

    app.listen(4444 , ()=>{
        console.log('Server started!');
    })