import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { changeUserBalance } from "../../store/slices/userSlice";


export default function Dashboard() {
  const user = useSelector((store) => store.user.userInfo);
  const [change, setChange] = useState("my");
  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Поля для курса
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [modules, setModules] = useState([]); // Новый список для модулей
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [pushared , setPushared] = useState([])
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleContent, setModuleContent] = useState("");
  const [moduleImg, setModuleImg] = useState("");
  const [likes , setLikes ] = useState(0)
  const [views ,setViews] = useState(0)
  const [ctr , setCtr] = useState(0)
  const [newBalance , setNewBalance] = useState(0)
  const [allHysoryBalance , setAllHistoryBalance] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (user._id) {
      axios
        .get(`http://localhost:4444/userCourse/${user._id}`)
        .then((res) => {
          setUserCourses(res.data);

      
          setLoading(false);
        })
        .catch((err) => console.log(err));
        axios
        .get(`http://localhost:4444/pushared/${user._id}`)
        .then((res) => {
          setPushared(res.data);
        })
        .catch((err) => console.log(err));
        axios
        .get(`http://localhost:4444/getNewBalace/${user._id}`)
        .then((res) => {
          setNewBalance(res.data);
          console.log(res.data);
          
        })
        .catch((err) => console.log(err));
        axios
        .get(`http://localhost:4444/allHysoryBalance/${user._id}`)
        .then((res) => {
          setAllHistoryBalance(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } 
    
  }, [user._id]);

  useEffect(()=>{
    if (userCourses ) {
      const totalLikes = userCourses.reduce((sum , course )=>sum + course.likes , 0 )
      setLikes(totalLikes)
      const totalViews = userCourses.reduce((sum , course )=>sum + course.views , 0 )
      setViews(totalViews)
  
      
      setCtr(Math.round(totalLikes / totalViews * 100));

    }
  },[userCourses])
  // Добавление модуля
  const addModule = () => {
    if (moduleTitle && moduleContent) {
      setModules([
        ...modules,
        { title: moduleTitle, content: moduleContent, img: moduleImg },
      ]);
      setModuleTitle("");
      setModuleContent("");
      setModuleImg("");
    }
  };

  // Удаление модуля
  const removeModule = (index) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  // Отправка курса
  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      title,
      description,
      duration,
      modules,
      price,
      img,
    };

    axios
      .post("http://localhost:4444/course", {
        courseData,
        userId: user._id,
      })
      .then((res) => {
        
        setTitle("");
        setDescription("");
        setDuration("");
        setModules([]);
        setPrice("");
        setImg("");
        location.reload()
      })
      .catch((e) => console.log(e));
  };
  const addUserBalance = ()=>{
 
    
    axios.post(`http://localhost:4444/balance` , {action : 'plus' , id : user._id , sum : newBalance})
    .then(res =>{
      dispatch(changeUserBalance(res.data))
      axios.get(`http://localhost:4444/clearNewBalance/${user._id}`)
      .then(res =>{
        setNewBalance(res.data)
        console.log(res.data);
        
      }
    )  .catch(err=>console.log(err)
  )
      
    })
    .catch(err=>console.log(err)
    )
  }
  // Удаление курса 
  const handleDelete = (id)=>{
    axios.delete(`http://localhost:4444/courseDelete/${id}`)
    .then(location.reload())
    .catch(err => console.log(err)
    )
    
  }
  //Редирект в ститистику опр курса
  const redirectToStat =  (id)=>{
    navigate(`/courseStat/${id}`);
  }
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="user-info">
          <h3>Личный кабинет пользователя: {user.name}</h3>
          <h5>Email: {user.email}</h5>
          <p>Новые поступления : {newBalance} </p>
          <button onClick={addUserBalance}>Получить </button>
        </div>
      </div>
      <hr />
      <div className="dashboard-main">
        <div className="content">
          <button onClick={() => setChange("my")}>Мои курсы</button>
          <button onClick={() => setChange("new")}>Новый курс</button>
          <button onClick={() => setChange("pushared")}>Купленные курсы  </button>
          <button onClick={() => setChange("stat")}>Моя статистика </button>


          {change === "new" ? (
            <div className="new-content">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Заголовок курса"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Описание курса"
                />
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Продолжительность курса"
                />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Цена курса"
                />
                <input
                  type="text"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  placeholder="Ссылка на изображение"
                />

                <h4>Модули курса</h4>
                {modules.map((mod, index) => (
                  <div key={index} className="module-item">
                    <h5>{mod.title}</h5>
                    <p>{mod.content}</p>
                    {mod.img && <img src={mod.img} alt={mod.title} />}
                    <button type="button" onClick={() => removeModule(index)}>
                      Удалить
                    </button>
                  </div>
                ))}

                <h4>Добавить модуль</h4>
                <input
                  type="text"
                  value={moduleTitle}
                  onChange={(e) => setModuleTitle(e.target.value)}
                  placeholder="Название модуля"
                />
                <textarea
                  value={moduleContent}
                  onChange={(e) => setModuleContent(e.target.value)}
                  placeholder="Описание модуля"
                />
                <input
                  type="text"
                  value={moduleImg}
                  onChange={(e) => setModuleImg(e.target.value)}
                  placeholder="Ссылка на изображение модуля"
                />
                <button type="button" onClick={addModule}>
                  Добавить модуль
                </button>

                <button type="submit">Создать курс</button>
              </form>
            </div>
          ) : change === "my" ? (
            <div className="active-content">
              {loading ? (
                <p>Загрузка...</p>
              ) : userCourses.length > 0 ? (
                userCourses.map((course, id) => (
                  <div key={id} className="user-courses">
                    <h4>
                      <Link to={`/course/${course._id}`}>{course.title}</Link>
                    </h4>
                    <button onClick={()=>handleDelete(course._id)}> Удалить </button>
                    <button onClick={()=>redirectToStat(course._id)}>Статистика </button>
                  </div>
                ))
              ) : (
                <p>Курсы не найдены.</p>
              )}
            </div>
          ) : change==="stat" ? (
            <>
            <div className="stat">
              <h3>Всего публикаций : {userCourses.length} </h3>
              <h3>лайки : {likes}</h3>
              <h3>посмотры : {views}</h3>
              <h3>CTR : {ctr}%</h3>
              <h3>Заработанно : {allHysoryBalance}</h3>
            </div>
            </>
          ) :  change==="pushared" ? 
          <div className="pushared">
            {loading ? (
                <p>Загрузка...</p>
              ) : pushared.length > 0 ? (
                pushared.map((course, id) => (
                  <div key={id} className="pushared-courses">
                    <h4>
                      <Link to={`/course/${course._id}`}>{course.title}</Link>
                    </h4>
                  </div>
                ))
              ) : (
                <p>Курсы не найдены.</p>
              )}
          </div> 
          : ''}
        </div>
      </div>
    </div>
  );
}
