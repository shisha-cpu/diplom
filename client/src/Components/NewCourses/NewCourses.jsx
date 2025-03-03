import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
export default function NewCoursrs(){
    const [courses , setCourses ] = useState()


    useEffect(() => {
        axios.get('http://89.169.39.144:4444/course/')
            .then(res => {
                const filteredCourses = res.data.filter(course => course.accept !== true);
                setCourses(filteredCourses);
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id , userId)=>{
        
        axios.delete(`http://89.169.39.144:4444/courseDelete/${id}` , {userId})
        .then(res=>console.log(res.data)
        )
        location.reload()
        alert('Курс удален')
    }
    const handlePublic = (id )=>{
        
        axios.post(`http://89.169.39.144:4444/public/${id}` )
        .then(res=>console.log(res.data)
        )
        location.reload()
        alert('Курс Одобрен')
    }

    
    return(
        <>
                <h1>       Новые курсы</h1>
    {courses && courses.map((course , id )=>(
                <div className="all-course" key={id}>
                    
                    <Link to={`/course/${course._id}`}>{course.title}</Link>
                    <button className="course-delete" onClick={()=>{handleDelete(course._id , course.author)}}>Удалить </button>
                    <button  className="public-btn" onClick={()=>{handlePublic(course._id)}}>Опубликовать </button>
                </div>
                ))}
        </>
    )
}