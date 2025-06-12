import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiCheck, FiTrash2, FiBook, FiUser, FiClock, FiDollarSign, FiAlertCircle } from "react-icons/fi";
import './newCourses.css';

export default function NewCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://edventuralearn.ru/course/')
            .then(res => {
                const filteredCourses = res.data.filter(course => course.accept !== true);
                setCourses(filteredCourses);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id, userId) => {
        if (window.confirm('Вы уверены, что хотите удалить этот курс?')) {
            axios.delete(`https://edventuralearn.ru/courseDelete/${id}`, { userId })
                .then(() => {
                    setCourses(prev => prev.filter(course => course._id !== id));
                    alert('Курс удален');
                })
                .catch(err => {
                    console.log(err);
                    alert('Ошибка при удалении курса');
                });
        }
    };

    const handlePublic = (id) => {
        if (window.confirm('Одобрить и опубликовать этот курс?')) {
            axios.post(`https://edventuralearn.ru/public/${id}`)
                .then(() => {
                    setCourses(prev => prev.filter(course => course._id !== id));
                    alert('Курс одобрен и опубликован');
                })
                .catch(err => {
                    console.log(err);
                    alert('Ошибка при публикации курса');
                });
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };

    if (loading) return <div className="loading">Загрузка новых курсов...</div>;

    return (
        <div className="new-courses-container">
            <div className="header-section">
                <h1><FiAlertCircle className="header-icon" /> Новые курсы на модерации ({courses.length})</h1>
                <p>Проверьте и одобрите или отклоните новые курсы</p>
            </div>

            {courses.length === 0 ? (
                <div className="no-courses">Нет курсов, ожидающих модерации</div>
            ) : (
                <div className="courses-grid">
                    {courses.map((course) => (
                        <div className="moderation-card" key={course._id}>
                            <div className="card-header">
                                <div className="course-image1">
                                    {course.img ? (
                                        <img src={course.img} alt={course.title} />
                                    ) : (
                                        <div className="image-placeholder">
                                            <FiBook size={24} />
                                        </div>
                                    )}
                                </div>
                                <div className="course-info">
                                    <h3>
                                        <Link to={`/course/${course._id}`}>{course.title}</Link>
                                    </h3>
                                    <div className="author-date">
                                        <span><FiUser /> {course.authorName || 'Автор не указан'}</span>
                                        <span><FiClock /> {formatDate(course.createdAt)}</span>
                                    </div>
                                </div>
                            </div>

                            {course.description && (
                                <div className="course-description">
                                    <p>{course.description.length > 150 ? 
                                        `${course.description.substring(0, 150)}...` : 
                                        course.description}
                                    </p>
                                </div>
                            )}

                            <div className="moderation-actions">
                                <button 
                                    className="approve-btn"
                                    onClick={() => handlePublic(course._id)}
                                >
                                    <FiCheck /> Одобрить
                                </button>
                                <button 
                                    className="reject-btn"
                                    onClick={() => handleDelete(course._id, course.author)}
                                >
                                    <FiTrash2 /> Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}