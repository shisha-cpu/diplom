import { useState } from "react"
import { useSelector } from "react-redux"
import AllCourses from "../../Components/AllCourses/AllCourses"
import AllUsers from "../../Components/AllUsers/AllUsers"
import NewCoursrs from "../../Components/NewCourses/NewCourses"
import './adminPanel.css'
export default function AdminPanel(){
    const user = useSelector(state => state.user.userInfo)
    const [dataState , setDataState] = useState('user')
    
    return(
        <div className="adminPanel dashboard">
            <h1>Панль администратора</h1>
            <div className="admin-section dashboard-header">
                <button className="btn-inner" onClick={()=>{setDataState('user')}}>Пользователи</button>
                <button onClick={()=>{setDataState('new')}}>Новые курсы </button>
                <button onClick={()=>{setDataState('se')}}> Существующие курсы </button>


                
            </div>
            {dataState == 'user' ? (<AllUsers />) : dataState == 'new' ?  (<NewCoursrs />)  : (<AllCourses />)  }
        </div>
    )
}