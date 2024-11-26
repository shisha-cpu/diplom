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
      { label: 'Рисование', value: 'Рисование' },
      { label: 'Программирование', value: 'Программирование' },
      { label: 'Писательство', value: 'Писательство' },
      { label: 'Музыка', value: 'Музыка' },
      { label: 'Дизайн', value: 'Дизайн' },
      { label: 'Фотография', value: 'Фотография' },
      { label: 'Видеосъемка', value: 'Видеосъемка' },
      { label: 'Веб-разработка', value: 'Веб-разработка' },
      { label: 'Графический дизайн', value: 'Графический дизайн' },
      { label: 'Анализ данных', value: 'Анализ данных' },
      { label: 'SEO', value: 'SEO' },
      { label: 'Контент-менеджмент', value: 'Контент-менеджмент' },
      { label: 'Цифровой маркетинг', value: 'Цифровой маркетинг' },
      { label: 'Управление проектами', value: 'Управление проектами' },
      { label: 'Монтаж видео', value: 'Монтаж видео' },
      { label: 'Звукоинженерия', value: 'Звукоинженерия' },
      { label: '3D-моделирование', value: '3D-моделирование' },
      { label: 'Анимация', value: 'Анимация' },
      { label: 'Иллюстрация', value: 'Иллюстрация' },
      { label: 'Копирайтинг', value: 'Копирайтинг' },
      { label: 'Перевод', value: 'Перевод' },
      { label: 'Робототехника', value: 'Робототехника' },
      { label: 'Кибербезопасность', value: 'Кибербезопасность' },
      { label: 'Блокчейн', value: 'Блокчейн' },
      { label: 'Машинное обучение', value: 'Машинное обучение' },
      { label: 'Искусственный интеллект', value: 'Искусственный интеллект' },
      { label: 'Облачные технологии', value: 'Облачные технологии' },
      { label: 'Сетевые технологии', value: 'Сетевые технологии' },
      { label: 'Управление базами данных', value: 'Управление базами данных' },
      { label: 'Разработка ПО', value: 'Разработка ПО' },
      { label: 'Мобильная разработка', value: 'Мобильная разработка' },
      { label: 'Разработка игр', value: 'Разработка игр' },
      { label: 'UX/UI дизайн', value: 'UX/UI дизайн' },
      { label: 'Финансовый анализ', value: 'Финансовый анализ' },
      { label: 'Инвестирование', value: 'Инвестирование' },
      { label: 'Ораторское искусство', value: 'Ораторское искусство' },
      { label: 'Продажи', value: 'Продажи' },
      { label: 'Обслуживание клиентов', value: 'Обслуживание клиентов' },
      { label: 'Переговоры', value: 'Переговоры' },
      { label: 'Лидерство', value: 'Лидерство' },
      { label: 'Предпринимательство', value: 'Предпринимательство' },
      { label: 'Тайм-менеджмент', value: 'Тайм-менеджмент' },
      { label: 'Стратегическое планирование', value: 'Стратегическое планирование' },
      { label: 'Решение проблем', value: 'Решение проблем' },
      { label: 'Критическое мышление', value: 'Критическое мышление' },
      { label: 'Эмоциональный интеллект', value: 'Эмоциональный интеллект' },
      { label: 'Преподавание', value: 'Преподавание' },
      { label: 'Коучинг', value: 'Коучинг' },
      { label: 'Менторство', value: 'Менторство' },
      { label: 'Личный брендинг', value: 'Личный брендинг' },
      { label: 'Организация мероприятий', value: 'Организация мероприятий' },
      { label: 'Кулинария', value: 'Кулинария' },
      { label: 'Выпечка', value: 'Выпечка' },
      { label: 'Садоводство', value: 'Садоводство' },
      { label: 'Фитнес', value: 'Фитнес' },
      { label: 'Йога', value: 'Йога' },
      { label: 'Медитация', value: 'Медитация' },
      { label: 'Связи с общественностью', value: 'Связи с общественностью' },
      { label: 'Управление соцсетями', value: 'Управление соцсетями' },
      { label: 'Управление брендом', value: 'Управление брендом' },
      { label: 'Управление персоналом', value: 'Управление персоналом' },
      { label: 'Юридические консультации', value: 'Юридические консультации' },
      { label: 'Финансовое планирование', value: 'Финансовое планирование' },
      { label: 'Архитектура', value: 'Архитектура' },
      { label: 'Дизайн интерьера', value: 'Дизайн интерьера' },
      { label: 'Модный дизайн', value: 'Модный дизайн' },
      { label: 'Фотореализм', value: 'Фотореализм' },
      { label: 'Рукоделие', value: 'Рукоделие' },
      { label: 'Деревообработка', value: 'Деревообработка' },
      { label: 'Металлообработка', value: 'Металлообработка' }
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
