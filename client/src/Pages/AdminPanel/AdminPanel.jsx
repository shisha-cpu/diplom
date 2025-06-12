import { useState } from "react"
import { useSelector } from "react-redux"
import AllCourses from "../../Components/AllCourses/AllCourses"
import AllUsers from "../../Components/AllUsers/AllUsers"
import NewCoursrs from "../../Components/NewCourses/NewCourses"
import './adminPanel.css'
import { FiUsers, FiBook, FiPlusCircle, FiMenu, FiX } from "react-icons/fi"

export default function AdminPanel(){
    const user = useSelector(state => state.user.userInfo)
    const [dataState, setDataState] = useState('user')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    
    return(
        <div className="admin-container">
            {/* Боковое меню */}
            <div className={`admin-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Админ-панель</h2>
                    <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>
                        <FiX size={24} />
                    </button>
                </div>
                
                <nav className="sidebar-nav">
                    <button 
                        className={`nav-item ${dataState === 'user' ? 'active' : ''}`}
                        onClick={() => {
                            setDataState('user')
                            setMobileMenuOpen(false)
                        }}
                    >
                        <FiUsers className="nav-icon" />
                        <span>Пользователи</span>
                    </button>
                    
                    <button 
                        className={`nav-item ${dataState === 'new' ? 'active' : ''}`}
                        onClick={() => {
                            setDataState('new')
                            setMobileMenuOpen(false)
                        }}
                    >
                        <FiPlusCircle className="nav-icon" />
                        <span>Новые курсы</span>
                    </button>
                    
                    <button 
                        className={`nav-item ${dataState === 'se' ? 'active' : ''}`}
                        onClick={() => {
                            setDataState('se')
                            setMobileMenuOpen(false)
                        }}
                    >
                        <FiBook className="nav-icon" />
                        <span>Существующие курсы</span>
                    </button>
                </nav>
                
                <div className="user-info">
                    <div className="user-avatar">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                        <p className="user-name">{user?.name}</p>
                        <p className="user-role">Администратор</p>
                    </div>
                </div>
            </div>
            
            {/* Основной контент */}
            <div className="admin-content">
                <div className="content-header">
                    <button 
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <FiMenu size={24} />
                    </button>
                    <h1>{dataState === 'user' ? 'Управление пользователями' : 
                         dataState === 'new' ? 'Новые курсы' : 'Все курсы'}</h1>
                </div>
                
                <div className="content-wrapper">
                    {dataState === 'user' ? <AllUsers /> : 
                     dataState === 'new' ? <NewCoursrs /> : <AllCourses />}
                </div>
            </div>
        </div>
    )
}