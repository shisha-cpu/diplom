import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function AllCourses(){
    const [courses , setCourses] = useState()
    useEffect(()=>{
        axios.get('http://localhost:4444/course/')
        .then(res => {
            const filteredCourses = res.data.filter(course => course.accept !== false);
            setCourses(filteredCourses);
    
        })
        .catch(err => console.log(err));
    },[])
    const handleDelete = (id , userId)=>{
        
        axios.delete(`http://localhost:4444/courseDelete/${id}` , {userId})
        .then(res=>console.log(res.data)
        )
        location.reload()
        alert('Курс удален')
    }
    return(
        <>
        <div className="allCourses">
 
        <h1>       Существующие курсы</h1>
        <div className="all-courses">
            {courses && courses.map((course , id )=>(
            <div className="all-course" key={id}>
                <Link to={`/course/${course._id}`}>{course.title}</Link>
                <button  className="course-delete" onClick={()=>{handleDelete(course._id , course.author)}}>Удалить </button>
            </div>
            ))}
        </div>
        </div>
        </>
    )
}