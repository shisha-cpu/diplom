import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/slices/userSlice";
import { Navigate } from "react-router-dom";
import Select from 'react-select';

export default function Register() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const allSkills = [
      { value: 'drawing', label: 'Рисование' },
      { value: 'programming', label: 'Программирование' },
      { value: 'writing', label: 'Писательство' },
      { value: 'music', label: 'Музыка' },
      { value: 'design', label: 'Дизайн' },
      { value: 'photography', label: 'Фотография' },
      { value: 'videography', label: 'Видеосъемка' },
      { value: 'webDevelopment', label: 'Веб-разработка' },
      { value: 'graphicDesign', label: 'Графический дизайн' },
      { value: 'dataAnalysis', label: 'Анализ данных' },
      { value: 'seo', label: 'SEO' },
      { value: 'contentWriting', label: 'Контент-менеджмент' },
      { value: 'digitalMarketing', label: 'Цифровой маркетинг' },
      { value: 'projectManagement', label: 'Управление проектами' },
      { value: 'videoEditing', label: 'Монтаж видео' },
      { value: 'soundEngineering', label: 'Звукоинженерия' },
      { value: '3dModeling', label: '3D-моделирование' },
      { value: 'animation', label: 'Анимация' },
      { value: 'illustration', label: 'Иллюстрация' },
      { value: 'copywriting', label: 'Копирайтинг' },
      { value: 'translation', label: 'Перевод' },
      { value: 'robotics', label: 'Робототехника' },
      { value: 'cyberSecurity', label: 'Кибербезопасность' },
      { value: 'blockchain', label: 'Блокчейн' },
      { value: 'machineLearning', label: 'Машинное обучение' },
      { value: 'ai', label: 'Искусственный интеллект' },
      { value: 'cloudComputing', label: 'Облачные технологии' },
      { value: 'networking', label: 'Сетевые технологии' },
      { value: 'databaseManagement', label: 'Управление базами данных' },
      { value: 'softwareDevelopment', label: 'Разработка ПО' },
      { value: 'mobileDevelopment', label: 'Мобильная разработка' },
      { value: 'gameDevelopment', label: 'Разработка игр' },
      { value: 'uxUiDesign', label: 'UX/UI дизайн' },
      { value: 'financialAnalysis', label: 'Финансовый анализ' },
      { value: 'investing', label: 'Инвестирование' },
      { value: 'publicSpeaking', label: 'Ораторское искусство' },
      { value: 'sales', label: 'Продажи' },
      { value: 'customerService', label: 'Обслуживание клиентов' },
      { value: 'negotiation', label: 'Переговоры' },
      { value: 'leadership', label: 'Лидерство' },
      { value: 'entrepreneurship', label: 'Предпринимательство' },
      { value: 'timeManagement', label: 'Тайм-менеджмент' },
      { value: 'strategicPlanning', label: 'Стратегическое планирование' },
      { value: 'problemSolving', label: 'Решение проблем' },
      { value: 'criticalThinking', label: 'Критическое мышление' },
      { value: 'emotionalIntelligence', label: 'Эмоциональный интеллект' },
      { value: 'teaching', label: 'Преподавание' },
      { value: 'coaching', label: 'Коучинг' },
      { value: 'mentoring', label: 'Менторство' },
      { value: 'personalBranding', label: 'Личный брендинг' },
      { value: 'eventPlanning', label: 'Организация мероприятий' },
      { value: 'cooking', label: 'Кулинария' },
      { value: 'baking', label: 'Выпечка' },
      { value: 'gardening', label: 'Садоводство' },
      { value: 'fitness', label: 'Фитнес' },
      { value: 'yoga', label: 'Йога' },
      { value: 'meditation', label: 'Медитация' },
      { value: 'publicRelations', label: 'Связи с общественностью' },
      { value: 'socialMediaManagement', label: 'Управление соцсетями' },
      { value: 'brandManagement', label: 'Управление брендом' },
      { value: 'humanResources', label: 'Управление персоналом' },
      { value: 'legalAdvice', label: 'Юридические консультации' },
      { value: 'financialPlanning', label: 'Финансовое планирование' },
      { value: 'architecture', label: 'Архитектура' },
      { value: 'interiorDesign', label: 'Дизайн интерьера' },
      { value: 'fashionDesign', label: 'Модный дизайн' },
      { value: 'photorealism', label: 'Фотореализм' },
      { value: 'handicrafts', label: 'Рукоделие' },
      { value: 'woodworking', label: 'Деревообработка' },
      { value: 'metalworking', label: 'Металлообработка' }
    ];
    setSkillOptions(allSkills);
  }, []);

  const handleSkillChange = (selectedSkills) => {
    if (selectedSkills.length <= 3) {
      setSkills(selectedSkills);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
      name: username,
      skills: skills.map(skill => skill.value)
    };
    
    axios.post('http://localhost:4444/register', userData)
      .then(res => {
        dispatch(fetchUser(res.data));
        localStorage.setItem('user', JSON.stringify(res.data));
        setRedirect(true);
      })
      .catch(err => console.log(err));
  };

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <section>
      <div className="auth-container">
        <h2 className="auth-logo">Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <label>Имя:</label>
          <input type="text" onChange={e => setUserName(e.target.value)} required />
          
          <label>Email:</label>
          <input type="text" onChange={e => setEmail(e.target.value)} required />
          
          <label>Пароль:</label>
          <input type="password" onChange={e => setPassword(e.target.value)} required />
          
          <label>Выберите навыки (макс. 3):</label>
          <Select
            isMulti
            name="skills"
            options={skillOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSkillChange}
            value={skills}
            placeholder="Начните вводить навык"
            maxMenuHeight={150}
          />
          
          <input type="submit" value="Зарегистрироваться" />
        </form>
      </div>
    </section>
  );
}
