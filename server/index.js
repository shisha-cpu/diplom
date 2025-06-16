import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import * as UserController  from './controllers/controllers.js'
import path from 'path'
import { fileURLToPath } from 'url'
import * as CourseController from './controllers/courseControllers.js'
import YooCheckoutPkg from '@a2seven/yoo-checkout';
import jwt from 'jsonwebtoken';

import { v4 as uuidv4 } from 'uuid'; 
import User from './models/user.js'; 

const JWT_SECRET = 'your-secret-key'; // В реальном проекте используйте переменные окружения

const { YooCheckout } = YooCheckoutPkg;

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
app.get('/users' ,UserController.users )
app.delete('/user/:id' , UserController.deleteUser)
app.put('/user/:id/skills', UserController.updateUserSkills)
//Курсы

app.post('/course' ,CourseController.addCourse )
app.post('/public/:id' ,CourseController.publicCourse )
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
app.get('/balance/:id', CourseController.getBalance);
app.get('/getNewBalace/:id' , CourseController.addNewBalance )
app.get('/clearNewBalance/:id', CourseController.clwarNewBalance)
app.post('/balance' , UserController.changeBalance)
app.get('/allHysoryBalance/:id' , CourseController.getAllBalance)


const YouKassa = new YooCheckout({
  shopId: '1098970',
  secretKey: 'test_wH9h8n6jhi5Ql2wAJppsVqDhI7n3d_YfuZuNejr7yL4', 
});



app.post('/api/payment', async (req, res) => {
  const { value, userId } = req.body;
console.log('userId' , userId);

  try {
    const idempotenceKey = uuidv4(); // для безопасного повторного запроса

    const payment = await YouKassa.createPayment({
      amount: {
        value: Number(value).toFixed(2),
        currency: 'RUB',
      },
      confirmation: {
        type: 'redirect',
        return_url: 'http://localhost:4444/',
      },
      capture: true,
      description: `Пополнение баланса пользователем ${userId}`,
      metadata: {
        userId,
      },
    }, idempotenceKey);
console.log(payment.status);

    // Пополняем баланс, если платеж сразу успешен или ожидает подтверждения
    if (payment.status === 'succeeded' || payment.status === 'pending') {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }


      user.balance.balance += Number(value);
      console.log(user.balance.balance);
      console.log(  user.balance.balance += Number(value));
      
      await user.save();
    }

    res.json({
      url: payment.confirmation.confirmation_url,
      status: payment.status,
    });

  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Ошибка при создании платежа' });
  }
});



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../client/dist')));

// Отдача index.html на любые другие маршруты (для React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});
app.listen(4444 , ()=>{
    console.log('Server started!');
})