import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import './main.css';
import { useDispatch, useSelector  } from 'react-redux';
import { fetchUser, changeUserBalance } from '../../store/slices/userSlice';
import Modal from '../../Components/Modal/Modal';
import ConfirmModal from '../../Components/AcceptModal/ConfirmModal';
export default function Main() {
    const [courses, setCourses] = useState([]);
    const [sortType, setSortType] = useState(""); 
    const [loading, setLoading] = useState(true);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [pushared , setPushared] = useState([])
    const user = useSelector(state => state.user);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [originalCourses, setOriginalCourses] = useState([]);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [userSlikkslls , setUserSkills ] = useState([])
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [pendingCourse, setPendingCourse] = useState(null);
    const boolRef = useRef()
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            dispatch(fetchUser(storedUser));
        }
    }, [dispatch]);

    useEffect(() => {
    axios.get('http://89.169.39.144:4444/course/')
        .then(res => {
            const filteredCourses = res.data.filter(course => course.accept !== false);
            setCourses(filteredCourses);
            setOriginalCourses(filteredCourses);
            setLoading(false);
        })
        .catch(err => console.log(err));

        if (user.userInfo._id) {
            axios.get(`http://89.169.39.144:4444/pushared/${user.userInfo._id}`)
            .then(res =>{
                setPushared(res.data)
                
            })
        }
    }, []);
    useEffect(() => {
        let sortedCourses = [...originalCourses];
    
        switch (sortType) {
            case "views":
                sortedCourses.sort((a, b) => b.views - a.views);
                break;
            case "likes":
                sortedCourses.sort((a, b) => b.likes - a.likes);
                break;
            case "priceLow":
                sortedCourses.sort((a, b) => a.price - b.price);
                break;
            case "priceHigh":
                sortedCourses.sort((a, b) => b.price - a.price);
                break;
            default:
                sortedCourses = [...originalCourses]; // Без сортировки
                break;
        }
    
        setCourses(sortedCourses);
    }, [sortType, originalCourses]); 
    useEffect(() => {
        console.log("Текущий тип сортировки:", sortType);
    }, [sortType]);
    
    
    useEffect(()=>{
        if (user.userInfo._id) {
            axios.get(`http://89.169.39.144:4444/pushared/${user.userInfo._id}`)
            .then(res =>{
                setPushared(prevState => [...prevState, ...res.data]);  
                
            })
            axios.get(`http://89.169.39.144:4444/userCourse/${user.userInfo._id}`)
            .then(res => {
                setPushared(prevState => [...prevState, ...res.data]);  
            })
            console.log(user);
            if (user.userInfo.skills.length > 0) {
                setUserSkills(user.userInfo.skills)
            }
        }
   
    },[user.userInfo._id])
    const handleClick = (courseId, price, isPusgared) => {
  


        if (1==1) {
            if (price > 0 && user.userInfo.balance < price) {
                alert('На балансе недостаточно средств');
                return;
            }
            axios.post('http://89.169.39.144:4444/pushared', { userId: user.userInfo._id, courseId })
                .then(res => console.log(res.data));

            setSelectedCourseId(courseId);
            setShouldNavigate(true);

            if (price > 0 && !isPusgared) {
                axios.post('http://89.169.39.144:4444/balance', {
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



  console.log(courses);
  
    if (shouldNavigate && selectedCourseId) {
        return <Navigate to={`/course/${selectedCourseId}`} />;
    }
    const courseDetal = (course)=>{
        axios.get(`http://89.169.39.144:4444/course/${course._id}`)
        .then(res => {setCourse(res.data)
            console.log(res.data);
        })
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
    const handleConfirm = (bool) => {
        setConfirmVisible(false);
        boolRef.current = bool; 
    };


    console.log("Все теги курсов:", courses.map(c => c.tags));
    console.log("Навыки пользователя:", userSlikkslls);
    
    return (
        <div className="main">
          <aside>
          <aside>
    <div className="filter-container">
        <input
            type="text"
            placeholder="Поиск курсов 🔎" 
            onChange={(e) => {
                const searchValue = e.target.value.toLowerCase();
                if (!searchValue) {
                
                    setCourses(originalCourses);
                } else {
       
                    setCourses(
                        originalCourses.filter((course) =>
                            course.title.toLowerCase().includes(searchValue)
                        )
                    );
                }
            }}
        />

<select onChange={(e) => setSortType(e.target.value)}>
    <option value="">Сортировать по</option>
    <option value="views">По популярности (просмотры)</option>
    <option value="likes">По лайкам</option>
    <option value="priceLow">По цене (сначала дешевые)</option>
    <option value="priceHigh">По цене (сначала дорогие)</option>
</select>
    </div>
</aside>

</aside>
            {loading ? (
                <h3>Загрузка...</h3>
            ) : (
                <div className="courses">
                {userSlikkslls.length > 0 && courses.some(course => 
                  Array.isArray(course.tags) && 
                  course.tags.some(tag => 
                    userSlikkslls.map(skill => skill.toLowerCase()).includes(tag.toLowerCase())
                  )
                ) && (
                  <div className="recommended-courses">
                    <h2>Рекомендованные курсы</h2>
                    <div className="courses-grid">
                      {courses
                        .filter((course) =>
                          course.tags.some((tag) =>
                            userSlikkslls.map(skill => skill.toLowerCase()).includes(tag.toLowerCase())
                          )
                        )
                        .map((course, id) => {
                          let isPusgared = pushared.some(
                            (pushed) =>
                              pushed._id.toString() ===
                              course._id.toString()
                          );
              
                          return (
                            <div key={id} className="course">
                              <h3>{course.title}</h3>
                              <img src={course.img} alt="" />
                              {user.userInfo.name && (
                                <div className="course-btns">
                                  <button onClick={() => handleClick(course._id , course.price , pushared)}>
                                    {isPusgared ? 'Открыть' : course.price > 0 ? `Купить за ${course.price}` : 'Пройти бесплатно'}
                                  </button>
                                  <button onClick={() => openModal(course)}>Подробнее</button>
                                </div>
                              )}
                              <div className="card-views">
                                <h3>👀 {course.views}</h3>
                                <h3>❤️ {course.likes}</h3>
                                <h3>💬 {course.comments ? course.comments.length : 0}</h3>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
                {courses.length > 0 && (
                  <div className="latest-courses">
                    <h2>Последние курсы</h2>
                    <div className="courses-grid">
                      {courses.map((course, id) => {
                        let isPusgared = pushared.some(
                          (pushed) =>
                            pushed._id.toString() ===
                            course._id.toString()
                        );
              
                        return (
                          <div key={id} className="course">
                            <h3>{course.title}</h3>
                            <img src={course.img} alt="" />
                            {user.userInfo.name && (
                              <div className="course-btns">
                                <button onClick={() => handleClick(course._id , course.price , pushared)}>
                                  {isPusgared ? 'Открыть' : course.price > 0 ? `Купить за ${course.price}` : 'Пройти бесплатно'}
                                </button>
                                <button onClick={() => openModal(course)}>Подробнее</button>
                              </div>
                            )}
                            <div className="card-views">
                              <h3>👀 {course.views}</h3>
                              <h3>❤️ {course.likes}</h3>
                              <h3>💬 {course.comments ? course.comments.length : 0}</h3>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              
            )}
    
            {modalVisible && (
                <Modal course={selectedCourse} onClose={closeModal} />
            )}
                       {confirmVisible && (
    <ConfirmModal
        message="Вы уверены?"
        onConfirm={() => handleConfirm(true)}
        onCancel={() => handleConfirm(false)}
        isOpen = {confirmVisible}
    />
)}

        </div>
    );
    

}