import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user.userInfo);
  const [isAuthor, setAuthor] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`http://localhost:4444/addView/${id}`)
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:4444/course/${id}`)
      .then(res => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));

    axios.get(`http://localhost:4444/fovourite/${user._id}`)
      .then(res => {
        if (res.data.includes(id)) {
          setLikeStatus(true);
        }
      })
      .catch(err => console.log(err));
  }, [id, user._id]);

  useEffect(() => {
    if (course && user) {
      setAuthor(course.author === user._id);
    }
  }, [course, user]);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  const addLike = () => {
    axios.post(`http://localhost:4444/courseLike`, {
      userId: user._id,
      courseId: course._id,
      action: 'plus',
    }).then(() => {
      setLikeStatus(true);
    }).catch(err => console.log(err));
  };

  const removeLike = () => {
    axios.post(`http://localhost:4444/courseLike`, {
      userId: user._id,
      courseId: course._id,
      action: 'minus',
    }).then(() => {
      setLikeStatus(false);
    }).catch(err => console.log(err));
  };

  const redirectToStat = () => {
    navigate(`/courseStat/${course._id}`);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:4444/courseDelete/${course._id}`)
      .then(() => navigate('/'))
      .catch(err => console.log(err));
  };

  return (
    <div className="course-detail">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>Цена: {course.price > 0 ? `${course.price} руб.` : 'Бесплатно'}</p>
      <p>Продолжительность: {course.duration} часов</p>
      <p>Дата создания: {new Date(course.createdAt).toLocaleDateString()}</p>
      <p>Дата обновления: {new Date(course.updatedAt).toLocaleDateString()}</p>

      <h3>Модули курса</h3>
      {course.modules.length > 0 ? (
        <ul>
          {course.modules.map((module, index) => (
            <li key={index} className="module-item">
              <h4>{module.title}</h4>
              <p>{module.content}</p>
              {module.img && <img src={module.img} alt={module.title} />}
              {module.questions.length > 0 && (
                <div>
                  <h5>Вопросы модуля:</h5>
                  <ul>
                    {module.questions.map((question, idx) => (
                      <li key={idx}>
                        <p><strong>{question.questionText}</strong></p>
                        <ul>
                          {question.options.map((option, optionIdx) => (
                            <li key={optionIdx}>{option}</li>
                          ))}
                        </ul>
                        <p><strong>Правильный ответ:</strong> {question.correctAnswer}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Модули отсутствуют.</p>
      )}

      <h3>Итоговый тест</h3>
      {course.finalTest.length > 0 ? (
        <ul>
          {course.finalTest.map((question, index) => (
            <li key={index}>
              <p><strong>{question.questionText}</strong></p>
              <ul>
                {question.options.map((option, optionIdx) => (
                  <li key={optionIdx}>{option}</li>
                ))}
              </ul>
              <p><strong>Правильный ответ:</strong> {question.correctAnswer}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Итоговый тест отсутствует.</p>
      )}

      <p>Просмотров: {course.views}</p>
      <p>Лайков: {course.likes}</p>

      {!likeStatus ? (
        <button onClick={addLike}>Поставить лайк</button>
      ) : (
        <button onClick={removeLike}>Лайк стоит</button>
      )}

      {isAuthor && (
        <>
          <button>Редактировать</button>
          <button onClick={redirectToStat}>Статистика</button>
          <button onClick={handleDelete}>Удалить</button>
        </>
      )}
    </div>
  );
}
