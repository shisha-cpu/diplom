import './header.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../../store/slices/userSlice'
import { useEffect } from 'react'
import { fetchUser } from '../../store/slices/userSlice'
import logo from '../../img/logo.png'

export default function Header(){
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user)
    
    const removeUser = ()=>{
        dispatch(clearUser())
   
        
    }


    useEffect(() => {
        const storedUser = localStorage.getItem('user')

        
        if (storedUser) {
            dispatch(fetchUser(JSON.parse(storedUser)))
        }
    }, [dispatch])


    return(
        <header>
            <div className="header">
                <div className="logo">
                    <Link to='/'><img src={logo} alt="Логотип" /></Link>
                </div>
                <div className="nav-bar">
                    <ul>
                         <Link to='/'>Главная  </Link>
                        <Link to='/courses' >Курсы </Link>
                        <Link to='/contact'>Контакты</Link>
                        
                    </ul>
                </div>
                <div className="auyh-bar">
                    {user && user.userInfo.name ? 
                    
                    <div className="user-block">
                        <ul>
                            <li>Пользователь : {user.userInfo.name}</li>
                            <li><Link to='/balance' className='balance-link'>Баланс : {user.userInfo.balance.balance}</Link> </li>
                            <li><Link to='/dashboard'>Личный кабинет</Link> </li>
                                {user.userInfo.name == 'shisha' ? <Link to='/admin'>Панель администратора </Link>  : '' }
                            <li><button onClick={removeUser} >Выйти</button></li>
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
    )
}