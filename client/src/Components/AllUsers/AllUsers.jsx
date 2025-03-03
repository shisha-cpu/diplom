import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function AllUsers(){
    const [users , setUsers] = useState()
    useEffect(()=>{
        axios.get('http://localhost:4444/users')
        .then(res => {
            setUsers(res.data)
                   
        })
        .catch(err => console.log(err))
    },[])

    const handleDelete = (user, id )=>{

        
        const importName = prompt(` Для подтверждения Удаления пользователя ${user} введите его имя`)   
        if (importName == user ) {
            axios.delete(`http://localhost:4444/user/${id}`)
            alert('Удалено ')
            location.reload()
            return
        }
        alert('Не верно ')
    }
    return(
        <>
        <div className="allCourses">
        <h1>Пользователи :  </h1>
        <div className="all-courses">
            {users && users.map((user , id )=>(
            <div className="all-course" key={id}>
                {user.name}
                <button className="course-delete" onClick={()=>handleDelete(user.name , user._id)}>Удалить</button>
            </div>
            ))}
        </div>
        </div>
        </>
    )
}