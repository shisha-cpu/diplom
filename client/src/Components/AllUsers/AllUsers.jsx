import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FiTrash2, FiUser, FiDollarSign, FiBook, FiHeart, FiShoppingCart, FiClock } from "react-icons/fi"
import './allUsers.css'

export default function AllUsers() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        axios.get('http://89.169.39.144:4444/users')
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
            axios.delete(`http://89.169.39.144:4444/user/${id}`)
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

    if (loading) return <div className="loading">Загрузка пользователей...</div>

    return (
        <div className="users-container">
            <h1>Пользователи ({users.length})</h1>
            
            <div className="user-cards">
                {users.map((user) => (
                    <div className="user-card" key={user._id}>
                        <div className="user-card-header">
                            <div className="user-avatar">
                                <FiUser size={20} />
                            </div>
                            <div className="user-info">
                                <h3>{user.name}</h3>
                                <p>{user.email}</p>
                            </div>
                        </div>
                        
                        <div className="user-stats">
                            <div className="stat-item">
                                <FiDollarSign className="stat-icon" />
                                <span>Баланс: {user.balance?.balance || 0} ₽</span>
                            </div>
                            
                            <div className="stat-item">
                                <FiBook className="stat-icon" />
                                <span>Курсов: {user.courses?.length || 0}</span>
                            </div>
                            
                            <div className="stat-item">
                                <FiHeart className="stat-icon" />
                                <span>Избранное: {user.fovourite?.length || 0}</span>
                            </div>
                            
                            <div className="stat-item">
                                <FiShoppingCart className="stat-icon" />
                                <span>Покупок: {user.purchased?.length || 0}</span>
                            </div>
                            
                            <div className="stat-item">
                                <FiClock className="stat-icon" />
                                <span>Зарегистрирован: {formatDate(user.createdAt)}</span>
                            </div>
                        </div>
                        
                        {user.skills?.length > 0 && (
                            <div className="user-skills">
                                <h4>Навыки:</h4>
                                <div className="skills-list">
                                    {user.skills.map((skill, index) => (
                                        <span key={index} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <button 
                            className="delete-btn"
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