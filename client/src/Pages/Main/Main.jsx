import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './main.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, changeUserBalance } from '../../store/slices/userSlice';
import Modal from '../../Components/Modal/Modal';
export default function Main() {
    const [courses, setCourses] = useState([]);
    const [ course , setCourse] = useState([])
    const [loading, setLoading] = useState(true);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [pushared , setPushared] = useState([])
    const user = useSelector(state => state.user);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [modal , setModal ] = useState(false)
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);

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

        if (user.userInfo._id) {
            axios.get(`http://localhost:4444/pushared/${user.userInfo._id}`)
            .then(res =>{
                setPushared(res.data)
                
            })
        }
    }, []);

    useEffect(()=>{
        if (user.userInfo._id) {
            axios.get(`http://localhost:4444/pushared/${user.userInfo._id}`)
            .then(res =>{
                setPushared(prevState => [...prevState, ...res.data]);  
                
            })
            axios.get(`http://localhost:4444/userCourse/${user.userInfo._id}`)
            .then(res => {
                setPushared(prevState => [...prevState, ...res.data]);  
            })
        
        
        }
    },[user.userInfo._id])

    const handleClick = (courseId, price, isPusgared) => {
      const bool = confirm('Вы уверены?');
      if (bool) {

          if (price > 0 && user.userInfo.balance < price) {
              alert('На балансе недостаточно средств');
              return; 
          }
          axios.post('http://localhost:4444/pushared' , {userId : user.userInfo._id , courseId })
          .then(res=>console.log(res.data)
          )
          
          setSelectedCourseId(courseId);
          setShouldNavigate(true);
  
          if (price > 0 && !isPusgared) {
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
    const courseDetal = (course)=>{
        axios.get(`http://localhost:4444/course/${course._id}`)
        .then(res => {setCourse(res.data)
            console.log(res.data);
        })
    }
    if (!modal) {
        // return <Modal />
    }
    const openModal = (course) => {
        setSelectedCourse(course);
        console.log(course);
        
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedCourse(null);
        setModalVisible(false);
    };

    return (
        <div className="main">
                 <aside>
              <label htmlFor="sort">Сортировать по:</label>
              <select id="sort" >
                  <option value="title">Название</option>
                  <option value="views">Просмотры</option>
                  <option value="likes">Лайки</option>
              </select>
          </aside>
  
            {loading ? <h3>Загрузка...</h3> : 
                <div className="courses">
                              <h2>Новые курсы</h2>
                              <h2>Рекомендованные  курсы</h2>
                       
                    <div className="courses">
                        {[...courses].reverse().map((course, id) => {
                        
                        let isPusgared = false
                         if (pushared) {
                            for (let i = 0; i < pushared.length; i++) {
                                if (pushared[i]._id.toString() === course._id.toString() ) {
                                    isPusgared = true
                                }
                        
                             }
                         }
                            return(
                                <div key={id} className="course">
                                <h3>{course.title}</h3>
                                <h3>Просмотров: {course.views}</h3>
                                <h3>Лайков: {course.likes}</h3>
                                <button onClick={() => handleClick(course._id , course.price , isPusgared)}>
                                    {isPusgared ? 'Открыть'
                                    :
                                    course.price > 0 ? `Купить за ${course.price}`
                                    : 'Пройти бесплатно'}
                                </button>
                                <button onClick={() => openModal(course)}>Подробнее</button>
                            </div>
                            )
                        })}
                    </div>
                </div>
            }
             {modalVisible && <Modal course={selectedCourse} onClose={closeModal} />}
        </div>
    );
}
