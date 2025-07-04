import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './courseDetail.css';

// Function to format text with newlines and markdown-style formatting
const formatText = (text) => {
  if (!text) return '';
  
  // Replace newlines with <br> tags
  let formattedText = text.replace(/\n/g, '<br>');
  
  // Replace markdown-style bold with HTML bold
  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Replace markdown-style italic with HTML italic
  formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  return formattedText;
};

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user.userInfo);
  const [isAuthor, setAuthor] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState();
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [answers, setAnswers] = useState({});
  const [answerText, setAnswerText] = useState('');
  const [tetxAnswerBtn, setTextAnswerBtn] = useState(true);
  const [finalTestAnswers, setFinalTestAnswers] = useState({});
  const [finalTestResults, setFinalTestResults] = useState({});
  useEffect(() => {
    axios.post(`https://edventuralearn.ru/addView/${id}`)
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    axios.get(`https://edventuralearn.ru/course/${id}`)
      .then(res => {
        console.log(res.data);
        
        setCourse(res.data);
        console.log(course);
        
        setLoading(false);
      })
      .catch(err => console.log(err));
      console.log(11);
    axios.get(`https://edventuralearn.ru/comments/${id}`)
      .then(res => {
        setComments(res.data);
      });
    
    axios.get(`https://edventuralearn.ru/fovourite/${user._id}`)
      .then(res => {
        if (res.data.includes(id)) {
          setLikeStatus(true);
        }
      })
      .catch(err => console.log(err));

    // Check if course is purchased
    axios.get(`https://edventuralearn.ru/pushared/${user._id}`)
      .then(res => {
        const purchasedCourses = res.data;
        setIsPurchased(purchasedCourses.some(course => course._id === id));
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
  const checkFinalTestAnswer = (questionIndex, userAnswer, correctAnswer) => {
    const isCorrect = userAnswer === correctAnswer;
    setFinalTestResults(prev => ({
      ...prev,
      [questionIndex]: isCorrect ? 'Верно' : 'Ошибка'
    }));
  };
const addLike = () => {
  axios.post(`https://edventuralearn.ru/courseLike`, {
    userId: user._id,
    courseId: course._id,
    action: 'plus',
  }).then((res) => {
    setLikeStatus(true);
    setCourse(prev => ({...prev, likes: prev.likes + 1}));
  }).catch(err => console.log(err));
};

const removeLike = () => {
  axios.post(`https://edventuralearn.ru/courseLike`, {
    userId: user._id,
    courseId: course._id,
    action: 'minus',
  }).then((res) => {
    setLikeStatus(false);
    setCourse(prev => ({...prev, likes: prev.likes - 1}));
  }).catch(err => console.log(err));
};
  const handleComment = () => {
    axios.post('https://edventuralearn.ru/comments', {
      userId: user._id,
      courseId: course._id,
      text: commentText
    })
    .then(res => {
      const newComment = {
        _id: res.data._id,
        text: commentText,
        user: {
          name: user.name
        }
      };
      setComments(prev => [...prev, newComment]); 
      setCommentText('');
    })
    .catch(err => {
      console.error('Ошибка при отправке комментария', err);
    });
  };
  
  const handleFinalTestTextAnswer = (questionIndex, userAnswer, correctAnswer) => {
    const isCorrect = userAnswer === correctAnswer;
    setFinalTestResults(prev => ({
      ...prev,
      [questionIndex]: isCorrect ? 'Верно' : 'Ошибка'
    }));
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
    axios.delete(`https://edventuralearn.ru/courseDelete/${course._id}`)
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

  const handlePurchase = () => {
    axios.post('https://edventuralearn.ru/pushared', {
      userId: user._id,
      courseId: course._id
    })
    .then(res => {
      setIsPurchased(true);
      navigate(`/course</${course._id}`);
    })
    .catch(err => {
      if (err.response?.status === 400) {
        alert(err.response.data.message);
      } else {
        console.error('Error purchasing course:', err);
      }
    });
  };

  // Check if course is paid and not purchased
  const isPaidAndNotPurchased = course.price > 0 && !isPurchased && !isAuthor;

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      borderRadius: '12px',
      minHeight: '48px',
      boxShadow: 'none',
      transition: 'all 0.3s ease',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
      color: '#fff',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(0, 123, 255, 0.2)',
      borderRadius: '8px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '14px',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#fff',
      cursor: 'pointer',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'rgba(255, 255, 255, 0.7)',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'rgba(255, 255, 255, 0.7)',
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: 'rgba(255, 255, 255, 0.7)',
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff',
    }),
  };
  return (
    <div className="course-detail">
      <h2 className='center'>Курс : {course.title}</h2>
      <img src={course.img} className='course-img' alt="" />
      <div className="course-info-card">
        <p>💸 {course.price > 0 ? `${course.price} руб.` : 'Бесплатно'}</p>
        <p>🕒 {course.duration} </p>
        <p>👀 {course.views}</p>
        <p>❤️ {course.likes}</p>
      </div>
      <p dangerouslySetInnerHTML={{ __html: formatText(course.description) }} />

      {isPaidAndNotPurchased ? (
        <div className="purchase-section">
          <h3>Этот курс платный</h3>
          <p>Для доступа к материалам курса необходимо его приобрести</p>
          <button 
            className="purchase-button"
            onClick={handlePurchase}
          >
            Купить курс за {course.price} руб.
          </button>
        </div>
      ) : (
        <>
          {course.modules.length > 0 ? (
            <ul>
              <h3 className='center'>Модули курса</h3>
              {course.modules.map((module, index) => (
                <li key={index} className="module-item">
                  <h4 className='center'>{module.title}</h4>
                  {module.img && <img src={module.img} className='course-img' alt={module.title} />}
                  <p dangerouslySetInnerHTML={{ __html: formatText(module.content) }} />
                 
                  {module.questions.length > 0 && (
                    <div className="questions-section">
                      <h4>Вопросы модуля:</h4>
                      <ul>
                        {module.questions.map((question, questionIndex) => {
                          const questionKey = `${index}-${questionIndex}`;
                          return (
                            <li key={questionIndex} className="question-item">
                              <p dangerouslySetInnerHTML={{ __html: formatText(question.questionText) }} />
                              {question.type === 'text' ? 
                                <>
                                  <div className="text-answer">
                                    <input 
                                      type='text' 
                                      placeholder='Введите свой ответ : ' 
                                      value={finalTestAnswers[index] || ''} 
                                      onChange={(e) => setFinalTestAnswers(prev => ({
                                        ...prev,
                                        [index]: e.target.value
                                      }))}
                                    /> 
                                    <button onClick={() => handleFinalTestTextAnswer(index, finalTestAnswers[index], question.correctAnswer)}>
                                      Проверить
                                    </button>
                                  </div>
                                  {finalTestResults[index] && (
                                    <p className={finalTestResults[index] === 'Верно' ? 'correct' : 'incorrect'}>
                                      {finalTestResults[index]}
                                    </p>
                                  )}
                                </>
                                : 
                                // Остальной код для вариантов ответа
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
            <h3 className='center'>Итоговый тест</h3>
            {course.finalTest.map((question, index) => (
              <li key={index}>
                <p><strong>{question.questionText}</strong></p>
                <ul>
                  {question.options.map((option, optionIdx) => (
                    <li 
                      key={optionIdx} 
                      onClick={() => checkFinalTestAnswer(index, option, question.correctAnswer)}
                      className={`option-item ${finalTestResults[index] === 'Верно' && option === question.correctAnswer ? 'correct' : ''}`}
                    >
                      - {option}
                    </li>
                  ))}
                </ul>
                {finalTestResults[index] && (
                  <p className={finalTestResults[index] === 'Верно' ? 'correct' : 'incorrect'}>
                    {finalTestResults[index]}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          ''
        )}
        {!isAuthor && (
          <div className="like-button-container">
            {!likeStatus ? (
              <button onClick={addLike} className="like-button">❤️ Поставить лайк</button>
            ) : (
              <button onClick={removeLike} className="like-button active">❤️ Убрать лайк</button>
            )}
          </div>
        )}

        {isAuthor && (
          <>
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
                    <p className="commetn-text" dangerouslySetInnerHTML={{ __html: formatText(comment.text) }} />
                  </>
                  : null}
              </>
            ))}
          </div>
        </div>
      </>
      )}
    </div>  
  );
}