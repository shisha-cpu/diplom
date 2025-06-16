import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { changeUserBalance } from "../../store/slices/userSlice";
import AddCourse from "../../Components/AddCourse/AddCourse";
import SkillsModal from "../../Components/SkillsModal/SkillsModal";
import './dashboard.css'

export default function Dashboard() {
  const user = useSelector((store) => store.user.userInfo);
  const [change, setChange] = useState("my");
  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pushared, setPushared] = useState([]);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [ctr, setCtr] = useState(0);
  const [newBalance, setNewBalance] = useState(0);
  const [allHysoryBalance, setAllHistoryBalance] = useState(0);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (userCourses) {
      const totalLikes = userCourses.reduce((sum, course) => sum + course.likes, 0);
      setLikes(totalLikes);
      const totalViews = userCourses.reduce((sum, course) => sum + course.views, 0);
      setViews(totalViews);
      setCtr(Math.round(totalLikes / totalViews * 100));
    }
  }, [userCourses]);

  const addUserBalance = () => {
    axios.post(`http://localhost:4444/balance`, { action: 'plus', id: user._id, sum: newBalance })
      .then(res => {
        dispatch(changeUserBalance(res.data));
        axios.get(`http://localhost:4444/clearNewBalance/${user._id}`)
          .then(res => {
            setNewBalance(res.data);
            console.log(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4444/courseDelete/${id}`)
      .then(location.reload())
      .catch(err => console.log(err));
  };

  const redirectToStat = (id) => {
    navigate(`/courseStat/${id}`);
  };

  const handleSkillsSave = async (newSkills) => {
    try {
      await axios.put(`http://localhost:4444/user/${user._id}/skills`, { skills: newSkills });
      // Update local storage and Redux store
      const updatedUser = { ...user, skills: newSkills };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: 'user/fetchUser', payload: updatedUser });
    } catch (err) {
      console.error('Error updating skills:', err);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="user-info">
          <h3>Личный кабинет пользователя: {user.name}</h3>
          <h5>Email: {user.email}</h5>
          <div className="skills-section">
            <div className="skills-header">
              <h4>Навыки</h4>
            </div>
            <div className="skills-list">
              {!user.skills || user.skills.length === 0 ? (
                <p className="no-skills">Навыки не установлены</p>
              ) : (
                user.skills.map((skill, id) => (
                  <span 
                    key={id} 
                    className="skill-tag" 
                    onClick={() => setIsSkillsModalOpen(true)}
                  >
                    {skill}
                  </span>
                ))
              )}
            </div>
          </div>
          <p>Создан: {new Date(user.createdAt).toLocaleString('ru-RU')}</p>
          <p>Новые поступления: {newBalance}</p>
          <button onClick={addUserBalance}>Получить</button>
        </div>
      </div>
      
      <div className="dashboard-main">
        <div className="content">
        <div className="button-group">
    <button className={`btn-inner ${change === 'my' ? 'selected' : ''}`} onClick={() => setChange("my")}>
       <span >Мои курсы</span>
    </button>
    <button className={`btn-inner ${change === 'new' ? 'selected' : ''}`} onClick={() => setChange("new")}>
        <span >Новый курс</span>
    </button>
    <button  className={`btn-inner ${change === 'pushared' ? 'selected' : ''}`} onClick={() => setChange("pushared")}>
        <span>Купленные курсы</span>
    </button>
    <button  className={`btn-inner ${change === 'stat' ? 'selected' : ''}`} onClick={() => setChange("stat")}>
        <span>Моя статистика</span>
    </button>
</div>


          {change === "new" ? (
            <AddCourse />
          ) : change === "my" ? (
            <div className="active-content">
              {loading ? (
                <p>Загрузка...</p>
              ) : userCourses.length > 0 ? (
                userCourses.map((course, id) => (
                  <div key={id} className="user-courses">
                    <h4>
                      <Link to={`/course>/${course._id}`}>{course.title}</Link>
                    </h4>
                    <button onClick={() => handleDelete(course._id)} className="course-delete"> Удалить </button>
                    <button onClick={() => redirectToStat(course._id)} className="course-stat">Статистика </button>
                  </div>
                ))
              ) : (
                <p>Курсы не найдены.</p>
              )}
            </div>
          ) : change === "stat" ? (
            <>
            <div className="stat">
              <h3>Всего публикаций : {userCourses.length} </h3>
              <h3>лайки : {likes}</h3>
              <h3>посмотры : {views}</h3>
              <h3>CTR : {isNaN(ctr) ? 0 : ctr}%</h3>
              <h3>Заработанно : {allHysoryBalance}</h3>
            </div>
            </>
          ) : 
          change === "pushared" ? 
          <div className="pushared">
            {loading ? (
                <p>Загрузка...</p>
              ) : pushared.length > 0 ? (
                pushared.map((course, id) => (
                  <div key={id} className="pushared-courses">
                    <h4>
                      <Link to={`/course>/${course._id}`}>{course.title}</Link>
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

      <SkillsModal
        isOpen={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
        userSkills={user.skills}
        onSave={handleSkillsSave}
      />
    </div>
  );
}
