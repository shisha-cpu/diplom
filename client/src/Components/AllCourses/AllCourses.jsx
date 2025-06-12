import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FiTrash2, FiBook, FiUser, FiClock, FiDollarSign, FiStar } from "react-icons/fi"
import './allCourses.css'

export default function AllCourses() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        axios.get('http://89.169.39.144:4444/course/')
            .then(res => {
                const filteredCourses = res.data.filter(course => course.accept !== false)
                setCourses(filteredCourses)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    const handleDelete = (id, userId) => {
        if (!window.confirm('Вы уверены, что хотите удалить этот курс?')) return
        
        axios.delete(`http://89.169.39.144:4444/courseDelete/${id}`, { userId })
            .then(() => {
                setCourses(prev => prev.filter(course => course._id !== id))
                alert('Курс успешно удален')
            })
            .catch(err => {
                console.log(err)
                alert('Ошибка при удалении курса')
            })
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('ru-RU', options)
    }

    const truncateDescription = (text, maxLength = 100) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...'
        }
        return text
    }

    if (loading) return <div className="loading">Загрузка курсов...</div>

    return (
        <div className="courses-container">
            <div className="courses-header">
                <h1>Существующие курсы ({courses.length})</h1>
            </div>
            
            <div className="courses-grid">
                {courses.map((course) => 
              {
                console.log(course);
                
                return(  (
                    <div className="course-card" key={course._id}>
                        <div className="course-image">
                            {course.img ? (
                                <img src={course.img} alt={course.title} />
                            ) : (
                                <div className="image-placeholder">
                                    <FiBook size={32} />
                                </div>
                            )}
                        </div>
                        
                        <div className="course-content">
                            <h3 className="course-title">
                                <Link to={`/course/${course._id}`}>{course.title}</Link>
                            </h3>
                            
                            {course.description && (
                                <p className="course-description">
                                    {truncateDescription(course.description)}
                                </p>
                            )}
                            
                            <div className="course-meta">
                                <div className="meta-item">
                                    <FiUser className="meta-icon" />
                                    <span>Автор: {course.authorName || 'Неизвестен'}</span>
                                </div>
                                
                                <div className="meta-item">
                                    <FiClock className="meta-icon" />
                                    <span>Создан: {formatDate(course.createdAt)}</span>
                                </div>
                                
                                {course.price && (
                                    <div className="meta-item">
                                        <FiDollarSign className="meta-icon" />
                                        <span>Цена: {course.price} ₽</span>
                                    </div>
                                )}
                                
                                {course.rating && (
                                    <div className="meta-item">
                                        <FiStar className="meta-icon" />
                                        <span>Рейтинг: {course.rating.toFixed(1)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="course-actions">
                            <button 
                                className="delete-btn"
                                onClick={() => handleDelete(course._id, course.author)}
                            >
                                <FiTrash2 /> Удалить
                            </button>
                        </div>
                    </div>
                ))
                
              })}
            </div>
        </div>
    )
}