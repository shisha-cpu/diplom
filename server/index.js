
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
app.delete('/courseDelete/:id' , CourseController.deleteCourse)
app.get('/userCourse/:id' , CourseController.getUserCourses)
app.post('/courseLike' , CourseController.changeLikes)
app.get('/fovourite/:id' , CourseController.getFovourite)
app.post('/pushared' , CourseController.userGetCourse)
app.get('/pushared/:id' , CourseController.getPurchased)
app.post('/addView/:id' , CourseController.AddView)
app.post('/comments' , CourseController.addComment)
app.get('/comments/:courseId' , CourseController.getComments)
//Баланс
app.get('/getNewBalace/:id' , CourseController.addNewBalance )
app.get('/clearNewBalance/:id', CourseController.clwarNewBalance)
app.post('/balance' , UserController.changeBalance)
app.get('/allHysoryBalance/:id' , CourseController.getAllBalance)

app.listen(4444 , ()=>{
    console.log('Server started!');
})