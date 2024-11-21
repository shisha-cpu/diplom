import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

  // Поля для модуля
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleContent, setModuleContent] = useState("");
  const [moduleImg, setModuleImg] = useState("");

  useEffect(() => {
    if (user._id) {
      axios
        .get(`http://localhost:4444/userCourse/${user._id}`)
        .then((res) => {
          setUserCourses(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [user._id]);

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
        console.log(res);
        setTitle("");
        setDescription("");
        setDuration("");
        setModules([]);
        setPrice("");
        setImg("");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="user-info">
          <h3>Личный кабинет пользователя: {user.name}</h3>
          <h5>Email: {user.email}</h5>
        </div>
      </div>
      <hr />
      <div className="dashboard-main">
        <div className="content">
          <button onClick={() => setChange("my")}>Мои курсы</button>
          <button onClick={() => setChange("new")}>Новый курс</button>
          <button onClick={() => setChange("stat")}>Статистика </button>

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
                  </div>
                ))
              ) : (
                <p>Курсы не найдены.</p>
              )}
            </div>
          ) : change==="stat" ? (
            <><h3>Статистика </h3></>
          ) : ''}
        </div>
      </div>
    </div>
  );
}
