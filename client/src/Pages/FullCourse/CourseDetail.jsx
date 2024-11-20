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
  

  useEffect(() => {
    axios.get(`http://localhost:4444/course/${id}`)
      .then(res => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [id]);

useEffect(()=>{
  if (course) {
    if (course.author ==  user._id) {
      setAuthor(true)
    }
  }
}, course)

  if (loading) {
    return <h3>Loading...</h3>;
  }


  return (
    <div className="course-detail">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>Цена: {course.price > 0 ? `${course.price} руб.` : 'Бесплатно'}</p>
      <p>Просмотров: {course.views}</p>
      <p>Лайков: {course.likes}</p>
      {isAuthor ? 
        <>
          <button>Редактировать </button>
          <button>Статистика </button>
        </> 
      : ''}
    </div>
  );
}
