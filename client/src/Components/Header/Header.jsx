import './header.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import logo from '../../img/logo.png'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { fetchUser  , clearUser } from '../../store/slices/userSlice'
export default function Header() {
        const dispatch = useDispatch()

    
    const removeUser = ()=>{
        dispatch(clearUser())
        location.reload()
        
    }


    useEffect(() => {
        const storedUser = localStorage.getItem('user')

        
        if (storedUser) {
            dispatch(fetchUser(JSON.parse(storedUser)))
        }
    }, [dispatch])
   
    
    const [user, setUser] = useState(null)
    const [balance, setBalance] = useState(0)
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => setMenuOpen(!menuOpen)



    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setUser(parsedUser)

            // Запрос баланса
            axios.get(`https://edventuralearn.ru/balance/${parsedUser._id}`)
                .then(res => {
             
                    
                    setBalance(res.data.balance.balance)
                })
                .catch(err => {
                    console.error('Ошибка при получении баланса:', err)
                })
        }
    }, [])

    return (
        <>
            <header>
                <div className="header">
                    <div className="logo">
                        <Link to='/'><img src={logo} alt="Логотип" /></Link>
                    </div>

                    <div className="nav-bar desktop-only">
                        <ul>
                            <Link to='/'>Главная</Link>
                            <Link to='/courses'>Курсы</Link>
                            <Link to='/contact'>Контакты</Link>
                        </ul>
                    </div>

                    <div className="auyh-bar desktop-only">
                        {user ?
                            <div className="user-block">
                                <ul>
                                    <li>Пользователь: {user.name}</li>
                                    <li><Link to='/balance' className='balance-link'>Баланс: {balance}</Link></li>
                                    <li><Link to='/dashboard'>Личный кабинет</Link></li>
                                    {user.name === 'admin@yandex.ru' && <li><Link to='/admin'>Панель администратора</Link></li>}
                                    <li><button onClick={removeUser}>Выйти</button></li>
                                </ul>
                            </div>
                            :
                            <ul>
                                <li><Link to='/login'>Вход</Link></li>
                                <li><Link to='/register'>Регистрация</Link></li>
                            </ul>
                        }
                    </div>
                </div>
            </header>

            {/* Бургер-кнопка */}
            <div className={`burger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Мобильное меню */}
            <nav className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
                <ul>
                    <li><Link to='/' onClick={() => setMenuOpen(false)}>Главная</Link></li>
                    <li><Link to='/courses' onClick={() => setMenuOpen(false)}>Курсы</Link></li>
                    <li><Link to='/contact' onClick={() => setMenuOpen(false)}>Контакты</Link></li>
                    {user ? (
                        <>
                            <li>Пользователь: {user.name}</li>
                            {/* <li><Link to='/balance' className='balance-link' onClick={() => setMenuOpen(false)}>Баланс: {balance.balance}</Link></li> */}
                            <li><Link to='/dashboard' onClick={() => setMenuOpen(false)}>Личный кабинет</Link></li>
                            {user.name === 'shisha' && <li><Link to='/admin' onClick={() => setMenuOpen(false)}>Панель администратора</Link></li>}
                            <li><button onClick={() => { removeUser(); setMenuOpen(false) }}>Выйти</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to='/login' onClick={() => setMenuOpen(false)}>Вход</Link></li>
                            <li><Link to='/register' onClick={() => setMenuOpen(false)}>Регистрация</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    )
}
