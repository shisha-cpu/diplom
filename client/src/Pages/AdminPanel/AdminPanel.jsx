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
        <div className="admin-panel-container">
            {/* Боковое меню */}
            <div className={`admin-panel-sidebar ${mobileMenuOpen ? 'admin-panel-mobile-open' : ''}`}>
                <div className="admin-panel-sidebar-header">
                    <h2>Админ-панель</h2>
                    <button className="admin-panel-mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>
                        <FiX size={24} />
                    </button>
                </div>
                
                <nav className="admin-panel-sidebar-nav">
                    <button 
                        className={`admin-panel-nav-item ${dataState === 'user' ? 'admin-panel-active' : ''}`}
                        onClick={() => {
                            setDataState('user')
                            setMobileMenuOpen(false)
                        }}
                    >
                        <FiUsers className="admin-panel-nav-icon" />
                        <span>Пользователи</span>
                    </button>
                    
                    <button 
                        className={`admin-panel-nav-item ${dataState === 'new' ? 'admin-panel-active' : ''}`}
                        onClick={() => {
                            setDataState('new')
                            setMobileMenuOpen(false)
                        }}
                    >
                        <FiPlusCircle className="admin-panel-nav-icon" />
                        <span>Новые курсы</span>
                    </button>
                    
                    <button 
                        className={`admin-panel-nav-item ${dataState === 'se' ? 'admin-panel-active' : ''}`}
                        onClick={() => {
                            setDataState('se')
                            setMobileMenuOpen(false)
                        }}
                    >
                        <FiBook className="admin-panel-nav-icon" />
                        <span>Существующие курсы</span>
                    </button>
                </nav>
                
                <div className="admin-panel-user-info">
                    <div className="admin-panel-user-avatar">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="admin-panel-user-details">
                        <p className="admin-panel-user-name">{user?.name}</p>
                        <p className="admin-panel-user-role">Администратор</p>
                    </div>
                </div>
            </div>
            
            {/* Основной контент */}
            <div className="admin-panel-content">
                <div className="admin-panel-content-header">
                    <button 
                        className="admin-panel-mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <FiMenu size={24} />
                    </button>
                    <h1>{dataState === 'user' ? 'Управление пользователями' : 
                         dataState === 'new' ? 'Новые курсы' : 'Все курсы'}</h1>
                </div>
                
                <div className="admin-panel-content-wrapper">
                    {dataState === 'user' ? <AllUsers /> : 
                     dataState === 'new' ? <NewCoursrs /> : <AllCourses />}
                </div>
            </div>
        </div>
    )
}