import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './courseDetail.css';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user.userInfo);
  const [isAuthor, setAuthor] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState();
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [answers, setAnswers] = useState({});
  const [answerText, setAnswerText] = useState('');
  const [tetxAnswerBtn, setTextAnswerBtn] = useState(true);

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
    axios.get(`http://localhost:4444/comments/${id}`)
      .then(res => {
        setComments(res.data);
      });
    
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

  const handleComment = () => {
    location.reload();
    axios.post('http://localhost:4444/comments', {
      userId: user._id,
      courseId: course._id,
      text: commentText
    })
    .then(res => {
      setCommentText('');
      alert('Успешно отправлено');
    });
  };

  const redirectToStat = () => {
    navigate(`/courseStat/${course._id}`);
  };

  const checkOption = (moduleIndex, questionIndex, option, correctAnswer) => {
    const questionKey = `${moduleIndex}-${questionIndex}`;
  
    if (answers[questionKey]) return; 
  
    setAnswers(prev => ({
      ...prev,
      [questionKey]: option === correctAnswer ? 'Верно' : 'Ошибка'
    }));
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:4444/courseDelete/${course._id}`)
      .then(() => navigate('/'))
      .catch(err => console.log(err));
  };

  const handleAnswer = (questionKey, correctAnswer) => {
    const isCorrect = answerText === correctAnswer;
    setAnsweredQuestions(prev => ({
      ...prev,
      [questionKey]: isCorrect ? 'Верно' : 'Неверно'
    }));
  };

  return (
    <div className="course-detail">
      <h2 className='center'>Курс : {course.title}</h2>
      <img src={course.img} className='course-img' alt="" />
      <div className="course-info-card">
        <p>💸 {course.price > 0 ? `${course.price} руб.` : 'Бесплатно'}</p>
        <p>🕒 {course.duration} часов</p>
        <p>👀 {course.views}</p>
        <p>❤️ {course.likes}</p>
      </div>
      <p>О курсе : {course.description}</p>

      {course.modules.length > 0 ? (
        <ul>
          <h3>Модули курса</h3>
          {course.modules.map((module, index) => (
            <li key={index} className="module-item">
              <h4 className='center'>{module.title}</h4>
              {module.img && <img src={module.img} className='course-img' alt={module.title} />}
              <p>{module.content}</p>
             
              {module.questions.length > 0 && (
  <div className="questions-section">
    <h4>Вопросы модуля:</h4>
    <ul>
      {module.questions.map((question, questionIndex) => {
        const questionKey = `${index}-${questionIndex}`;
        return (
          <li key={questionIndex} className="question-item">
            <p><strong>{question.questionText}</strong></p>
            {question.type === 'text' ? 
              <>
                <div className="text-answer">
                  <input 
                    type='text' 
                    placeholder='Введите свой ответ : ' 
                    value={answerText} 
                    onChange={(e) => setAnswerText(e.target.value)}
                  /> 
                  <button onClick={() => handleAnswer(questionKey, question.correctAnswer)}>
                    Проверить
                  </button>
                </div>
                {answeredQuestions[questionKey] && (
                  <p className={answeredQuestions[questionKey] === 'Верно' ? 'correct' : 'incorrect'}>
                    {answeredQuestions[questionKey]}
                  </p>
                )}
              </>
              : 
              <>
                <ul>
                  {question.options.map((option, optionIdx) => (
                    <li 
                      key={optionIdx} 
                      className={`option-item ${answers[questionKey] === 'Верно' && option === question.correctAnswer ? 'correct' : ''}`} 
                      onClick={() => checkOption(index, questionIndex, option, question.correctAnswer)}
                    >
                      - {option}
                    </li>
                  ))}
                </ul>
                {answers[questionKey] && (
                  <p className={answers[questionKey] === 'Верно' ? 'correct' : 'incorrect'}>
                    {answers[questionKey]}
                  </p>
                )}
              </>
            }
          </li>
        );
      })}
    </ul>
  </div>
)}
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}

      {course.finalTest.length > 0 ? (
        <ul>
          <h3>Итоговый тест</h3>
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
        ''
      )}

      {!likeStatus ? (
        <button onClick={addLike}>Поставить лайк</button>
      ) : (
        <button onClick={removeLike}>Лайк стоит</button>
      )}

      {isAuthor && (
        <>
          <button>Редактировать</button>
          <button onClick={redirectToStat} className="course-stat">Статистика</button>
          <button onClick={handleDelete} className="course-delete">Удалить</button>
        </>
      )}
      
      <div className="course-comment">
        <h3>Комментарии 💬</h3>
        <input 
          value={commentText} 
          onChange={e => setCommentText(e.target.value)} 
          type="text" 
          placeholder='Напишите свой комментарий о курсе ....' 
          className='comment-imput' 
        />
        <button onClick={handleComment}>Отправить</button>
        <div className="comment-list">
          {comments && comments.map((comment, id) => (
            <>
              {comment.text ? 
                <>
                  <h6 className={`${comment.user.name === user.name ? 'this-comment-author' : 'comment-author'}`}>
                    {comment.user.name}
                  </h6>
                  <p className="commetn-text">{comment.text}</p>
                </>
                : null}
            </>
          ))}
        </div>
      </div>
    </div>  
  );
}