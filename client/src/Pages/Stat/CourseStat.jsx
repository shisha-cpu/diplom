import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function CourseStat (){
    const {id} = useParams()
    const [course  , setCourse]= useState()
    const [ctr , setCtr ] = useState(0)
    useEffect(()=>{
        axios.get(`http://localhost:4444/course/${id}`)
        .then(res => {
            setCourse(res.data)})
            
    },[])
  
    useEffect(()=>{
        
        if (course) {

            setCtr((course.likes/ course.views) * 100)
            if (ctr !== NaN) {
                console.log(ctr);
                
            }
        }
    },course)


    return(
        <div className="stat">
            {course ?  <>
                <h2>Статтистика курса: {course.title}</h2>
            <p>id курса : {course._id}</p>
            <p>Создан  : {course.createdAt} </p>
            <p>Последнее обновление  : {course.updatedAt}</p>
            <p>Просмотры :  {course.views} </p>
            <p>Лайки :  {course.likes} </p>
            <p>CTR: {isNaN(ctr) ? 0 : ctr} %</p>
</>
            : ''}
        </div>
    )
}