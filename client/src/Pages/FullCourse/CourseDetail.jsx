import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const user  = useSelector(state => state.user.userInfo)
  const [isAuthor , setAuthor] = useState(false)
  const [likeStatus , setlikeStatus ] = useState(false)
const [fovourite , setFovourite] = useState()

useEffect(() => {
  axios.get(`http://localhost:4444/course/${id}`)
      .then(res => {
          setCourse(res.data);
          setLoading(false);
      })
      .catch(err => console.log(err));
  
  axios.get(`http://localhost:4444/fovourite/${user._id}`)
      .then(res => {
          for (let i = 0; i < res.data.length; i++) {
           if (res.data[i] == id) {
            setlikeStatus(true)
           }
          }
      
      })
      .catch(err => console.log(err));
}, [id]);


useEffect(() => {

  
  axios.get(`http://localhost:4444/fovourite/${user._id}`)
      .then(res => {
          for (let i = 0; i < res.data.length; i++) {
           if (res.data[i] == id) {
            setlikeStatus(true)
           }
          }
      
      })
      .catch(err => console.log(err));
}, [user._id]);


useEffect(() => {
  if (course && user) {
    if (course.author === user._id) {
      setAuthor(true);
    }
  }
}, [course?.author, user?._id]); // Зависимости — только те поля, которые изменяются

  if (loading) {
    return <h3>Loading...</h3>;
  }

  const addLIke =()=>{
    
    axios.post(`http://localhost:4444/courseLike`,
      {userId : user._id , courseId : course._id , action : 'plus'})
    .then(res =>{
      setlikeStatus(true)
    })
  }

  const removeLike =()=>{
    axios.post(`http://localhost:4444/courseLike`,
      {userId : user._id , courseId : course._id , action : 'minus'})
    .then(res =>{
      console.log(res.data)
      setlikeStatus(false)
    })
  }

  return (
    <div className="course-detail">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>Цена: {course.price > 0 ? `${course.price} руб.` : 'Бесплатно'}</p>
      <p>Просмотров: {course.views}</p>
      <p>Лайков: {course.likes}</p>
      {!likeStatus ? <button onClick={addLIke}>Поставить лайк </button> 
      : <button onClick={removeLike}>Лайк стоит </button> }
      {isAuthor ? 
        <>
          <button>Редактировать </button>
          <button>Статистика </button>
        </> 
      : ''}
    </div>
  );
}
