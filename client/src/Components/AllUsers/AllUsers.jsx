import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FiTrash2, FiUser, FiDollarSign, FiBook, FiHeart, FiShoppingCart, FiClock } from "react-icons/fi"
import './allUsers.css'

export default function AllUsers() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        axios.get('https://edventuralearn.ru/users')
            .then(res => {
                setUsers(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    const handleDelete = (user, id) => {
        const importName = prompt(`Для подтверждения удаления пользователя ${user} введите его имя`)   
        if (importName === user) {
            axios.delete(`https://edventuralearn.ru/user/${id}`)
                .then(() => {
                    setUsers(prev => prev.filter(u => u._id !== id))
                    alert('Пользователь удален')
                })
                .catch(err => {
                    console.log(err)
                    alert('Ошибка при удалении')
                })
            return
        }
        alert('Неверное имя пользователя')
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('ru-RU', options)
    }

    if (loading) return <div className="all-users-loading">Загрузка пользователей...</div>

    return (
        <div className="all-users-container">
            <h1>Пользователи ({users.length})</h1>
            
            <div className="all-users-cards">
                {users.map((user) => (
                    <div className="all-users-card" key={user._id}>
                        <div className="all-users-card-header">
                            <div className="all-users-avatar">
                                <FiUser size={20} />
                            </div>
                            <div className="all-users-info">
                                <h3>{user.name}</h3>
                                <p>{user.email}</p>
                            </div>
                        </div>
                        
                        <div className="all-users-stats">
                            <div className="all-users-stat-item">
                                <FiDollarSign className="all-users-stat-icon" />
                                <span>Баланс: {user.balance?.balance || 0} ₽</span>
                            </div>
                            
                            <div className="all-users-stat-item">
                                <FiBook className="all-users-stat-icon" />
                                <span>Курсов: {user.courses?.length || 0}</span>
                            </div>
                            
                            <div className="all-users-stat-item">
                                <FiHeart className="all-users-stat-icon" />
                                <span>Избранное: {user.fovourite?.length || 0}</span>
                            </div>
                            
                            <div className="all-users-stat-item">
                                <FiShoppingCart className="all-users-stat-icon" />
                                <span>Покупок: {user.purchased?.length || 0}</span>
                            </div>
                            
                            <div className="all-users-stat-item">
                                <FiClock className="all-users-stat-icon" />
                                <span>Зарегистрирован: {formatDate(user.createdAt)}</span>
                            </div>
                        </div>
                        
                        {user.skills?.length > 0 && (
                            <div className="all-users-skills">
                                <h4>Навыки:</h4>
                                <div className="all-users-skills-list">
                                    {user.skills.map((skill, index) => (
                                        <span key={index} className="all-users-skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <button 
                            className="all-users-delete-btn"
                            onClick={() => handleDelete(user.name, user._id)}
                        >
                            <FiTrash2 /> Удалить
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}