import './header.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../../store/slices/userSlice'
import { useEffect } from 'react'
import { fetchUser } from '../../store/slices/userSlice'
export default function Header(){
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user)
    
    const removeUser = ()=>{
        dispatch(clearUser())
        console.log(user.userInfo);
        
    }


    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        console.log(storedUser);
        
        if (storedUser) {
            dispatch(fetchUser(JSON.parse(storedUser)))
        }
    }, [dispatch])


    return(
        <header>
            <div className="header">
                <div className="logo">
                    <Link to='/'><img src="" alt="Логотип" /></Link>
                </div>
                <div className="nav-bar">
                    <ul>
                        <li>Страница </li>
                        <li>Страница</li>
                        <li>Страница</li>
                    </ul>
                </div>
                <div className="auyh-bar">
                    {user.userInfo.name ? 
                    
                    <div className="user-block">
                        <ul>
                            <li>Пользователь : {user.userInfo.name}</li>
                            <li>Баланс : {user.userInfo.balance}</li>
                            <li><Link to='/dashboard'>Личный кабинет</Link> </li>
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