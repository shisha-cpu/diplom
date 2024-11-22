import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const user  = useSelector(state => state.user.userInfo)
  const [isAuthor , setAuthor] = useState(false)
  const [likeStatus , setlikeStatus ] = useState(false)
  const navigate = useNavigate()



useEffect(()=>{
    axios.post(`http://localhost:4444/addView/${id}`)
},[])

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
}, [course?.author, user?._id]); 

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
      setlikeStatus(false)
    })
  }

  // console.log(course);
  const redirectToStat =  (id)=>{
    navigate(`/courseStat/${id}`);
  }
  const handleDelete = (id)=>{
    axios.delete(`http://localhost:4444/courseDelete/${id}`)
    .then(navigate('/'))
    .catch(err => console.log(err)
    )
      
  }
  return (
<div className="course-detail">
  <h2>{course.title}</h2>
  <p>{course.description}</p>
  <p>Цена: {course.price > 0 ? `${course.price} руб.` : 'Бесплатно'}</p>
  <p>Продолжительность: {course.duration} часов</p>

  <p>Дата создания: {new Date(course.createdAt).toLocaleDateString()}</p>
  <p>Дата обновления: {new Date(course.updatedAt).toLocaleDateString()}</p>
  
  <h3>Модули курса</h3>
  {course.modules && course.modules.length > 0 ? (
    <ul>
      {course.modules.map((module) => (
        <li key={module._id} className="module-item">
          <h4>{module.title}</h4>
          <p>{module.content}</p>
          {module.img && <img src={module.img} alt={module.title} />}
        </li>
      ))}
    </ul>
  ) : (
    <p>Модули отсутствуют.</p>
  )}

  <p>Просмотров: {course.views }</p>
  <p>Лайков: {course.likes}</p>
  {!likeStatus ? (
    <button onClick={addLIke}>Поставить лайк</button>
  ) : (
    <button onClick={removeLike}>Лайк стоит</button>
  )}
  {isAuthor && (
    <>
      <button>Редактировать</button>
      <button onClick={()=>{
        redirectToStat(course._id)
 }}>Статистика</button>
    <button onClick={()=>{handleDelete(course._id)}}>Удалить</button>
    </>
  )}
</div>

  );
}
