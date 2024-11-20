import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
// import course from "../../../../server/models/course"


export default function Dashboard(){
    const user = useSelector(store =>store.user.userInfo)
    const [change , setChange] = useState('my')
    const [title , setTitle] = useState('')
    const [text , setText ] = useState('')
    const [price , setPrice] = useState(0)
    const [img , setImg]  = useState('')
    const [userCourses , setUserCourses] = useState([])
    const [loading , setLoading] = useState(true)

   useEffect(() => {
    if (user._id) {
            axios.get(`http://localhost:4444/userCourse/${user._id}`)
                .then(res => {
                    console.log(res.data);
                    setUserCourses(res.data);
                    setLoading(false);
                })
                .catch(err => console.log(err));
    }
}, [user._id]);

    
    const handleSubmit = (e)=>{
        e.preventDefault()
        const cours = {title , text , img , price}
        setTitle('')
        setText('')
        setImg('')
        setPrice('')

        const id = user._id
        axios.post('http://localhost:4444/course', {
            courseData: cours,
            userId: id
        })
        .then(res => console.log(res))
        .catch(e => console.log(e));
    }

    const handleDelete = (id)=>{
       axios.get(`http://localhost:4444/courseDelete/${id}`)
       .then(res =>{
        console.log(res)
        location.reload()
       }
       )
    }   

    
    return (
        <div className="dashboard">
            <div className="dasboard-header">
                <div className="user-info">
                    <h3>Личный кабинет пользователя  : {user.name}</h3>
                    <h5>Email : {user.email}</h5>
                    <p>За последнее время вы заработали : </p>
                    <button>Забрать </button>
                    {/* <h5>Навыки : {user.skills.map((skill , id)=>(
                        <p key={id}>{skill}</p>
                    ))}</h5> */}
                </div>
            </div>
            <hr />
            <div className="dashboard-main">
                <div className="content">
                    <button onClick={()=>setChange('my')}>Мои курсы </button>
                    <button onClick={()=>setChange('new')}>Новый курс </button>
                    <button onClick={()=>setChange('stat')}  >Стаитистика </button>
                    {change === 'new' ? (
  <div className="new-content">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Заголовок"
      />
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Текст курса"
      />
      <input
        type="text"
        value={img}
        onChange={e => setImg(e.target.value)}
        placeholder="Фотошрафия"
      />
      <input
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
        placeholder="Цена"
      />
      <button type="submit">Создать</button>
    </form>
  </div>
) : change === 'my' ? (
  <div className="active-content">
    {loading ? (
      <p>Загрузка...</p>
    ) : userCourses.length > 0 ? (
      userCourses.map((course, id) => {
        console.log(course); // Логируем курс
        return (
          <div key={id} className="user-courses">
            <h4>
              <Link to={`/course/${course._id}`}>{course.title}</Link>
            </h4>
            <button onClick={() => handleDelete(course._id)}>Удалить</button>
          </div>
        );
      })
    ) : (
      <p>Курсы не найдены.</p>
    )}
  </div>
) : change === 'stat' ? (
  <div className="stat-content">
    <p>Всего просмотров </p>
    <p>Всего лайков </p>
    
    <p>CRT</p>
  
  </div>
) : (
  <p>Неверное состояние.</p> 
)}

                </div>
            </div>
        </div>
    )
}