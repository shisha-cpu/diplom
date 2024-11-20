import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './main.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, changeUserBalance } from '../../store/slices/userSlice';

export default function Main() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    // Загружаем пользователя из localStorage при монтировании
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            dispatch(fetchUser(storedUser));
        }
    }, [dispatch]);

    useEffect(() => {
        axios.get('http://localhost:4444/course/')
            .then(res => {
                setCourses(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    const handleClick = (courseId, price) => {
      const bool = confirm('Вы уверены?');
      if (bool) {
          // Проверяем баланс перед выполнением любых действий
          if (price > 0 && user.userInfo.balance < price) {
              alert('На балансе недостаточно средств');
              return; // Выходим из функции, если средств недостаточно
          }
  
          setSelectedCourseId(courseId);
          setShouldNavigate(true);
  
          if (price > 0) {
              axios.post('http://localhost:4444/balance', {
                  action: 'minus',
                  id: user.userInfo._id,
                  sum: price,
              })
              .then((res) => {
                  dispatch(changeUserBalance(res.data));
              })
              .catch((err) => console.log(err));
          }
      }
  };
  

    if (shouldNavigate && selectedCourseId) {
        return <Navigate to={`/course/${selectedCourseId}`} />;
    }

    return (
        <div className="main">
            <h2>Последние курсы</h2>
            {loading ? <h3>Loading...</h3> : 
                <div className="courses">
                    {[...courses].reverse().map((course, id) => (
                        <div key={id} className="course">
                            <h3>{course.title}</h3>
                            <h3>Просмотров: {course.views}</h3>
                            <h3>Лайков: {course.likes}</h3>
                            <button onClick={() => handleClick(course._id , course.price)}>
                                {course.price > 0 ? `Купить за ${course.price}` : 'Пройти бесплатно'}
                            </button>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}
