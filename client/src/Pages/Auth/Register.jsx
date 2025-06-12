import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/slices/userSlice";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import './register.css'
export default function Register() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [redirect, setRedirect] = useState(false);
 const navigate = useNavigate();
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
      { label: 'Графика', value: 'Графика' },
      { label: 'Анализ', value: 'Анализ' },
      { label: 'SEO', value: 'SEO' },
      { label: 'Контент', value: 'Контент' },
      { label: 'Маркетинг', value: 'Маркетинг' },
      { label: 'Управление', value: 'Управление' },
      { label: 'Монтаж', value: 'Монтаж' },
      { label: 'Звукоинженерия', value: 'Звукоинженерия' },
      { label: '3D', value: '3D' },
      { label: 'Анимация', value: 'Анимация' },
      { label: 'Иллюстрация', value: 'Иллюстрация' },
      { label: 'Копирайтинг', value: 'Копирайтинг' },
      { label: 'Перевод', value: 'Перевод' },
      { label: 'Робототехника', value: 'Робототехника' },
      { label: 'Кибербезопасность', value: 'Кибербезопасность' },
      { label: 'Блокчейн', value: 'Блокчейн' },
      { label: 'ИИ', value: 'ИИ' },
      { label: 'Сети', value: 'Сети' },
      { label: 'БД', value: 'БД' },
      { label: 'ПО', value: 'ПО' },
      { label: 'Мобильная разработка', value: 'Мобильная разработка' },
      { label: 'Разработка игр', value: 'Разработка игр' },
      { label: 'UX/UI', value: 'UX/UI' },
      { label: 'Финансовый анализ', value: 'Финансовый анализ' },
      { label: 'Инвестирование', value: 'Инвестирование' },
      { label: 'Ораторство', value: 'Ораторство' },
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
      { label: 'PR', value: 'PR' },
      { label: 'SMM', value: 'SMM' },
      { label: 'Управление брендом', value: 'Управление брендом' },
      { label: 'HR', value: 'HR' },
      { label: 'Юриспруденция', value: 'Юриспруденция' },
      { label: 'Финансовое планирование', value: 'Финансовое планирование' },
      { label: 'Архитектура', value: 'Архитектура' },
      { label: 'Дизайн интерьера', value: 'Дизайн интерьера' },
      { label: 'Модный дизайн', value: 'Модный дизайн' },
      { label: 'Фотореализм', value: 'Фотореализм' },
      { label: 'Рукоделие', value: 'Рукоделие' },
      { label: 'Деревообработка', value: 'Деревообработка' },
      { label: 'Металлообработка', value: 'Металлообработка' },
      { label: 'Логистика', value: 'Логистика' },
      { label: 'Аналитика данных', value: 'Аналитика данных' },
      { label: 'Big Data', value: 'Big Data' },
      { label: 'Машинное обучение', value: 'Машинное обучение' },
      { label: 'DevOps', value: 'DevOps' },
      { label: 'Клонирование', value: 'Клонирование' },
      { label: 'Биоинформатика', value: 'Биоинформатика' },
      { label: 'Нейронаука', value: 'Нейронаука' },
      { label: 'Квантовые вычисления', value: 'Квантовые вычисления' },
      { label: 'AR/VR', value: 'AR/VR' },
      { label: 'Криптография', value: 'Криптография' },
      { label: 'Электроника', value: 'Электроника' },
      { label: 'Робототехника', value: 'Робототехника' },
      { label: 'Астрономия', value: 'Астрономия' },
      { label: 'Геология', value: 'Геология' },
      { label: 'Экология', value: 'Экология' },
      { label: 'Психология', value: 'Психология' },
      { label: 'Социология', value: 'Социология' },
      { label: 'Философия', value: 'Философия' },
      { label: 'История', value: 'История' },
      { label: 'Лингвистика', value: 'Лингвистика' },
      { label: 'Переводы', value: 'Переводы' },
      { label: 'Журналистика', value: 'Журналистика' },
      { label: 'Редактирование', value: 'Редактирование' },
      { label: 'Визуализация данных', value: 'Визуализация данных' },
      { label: 'Киберспорт', value: 'Киберспорт' },
      { label: 'Трейдинг', value: 'Трейдинг' },
      { label: 'Форекс', value: 'Форекс' },
      { label: 'Криптовалюты', value: 'Криптовалюты' },
      { label: 'Фриланс', value: 'Фриланс' },
      { label: 'Удаленная работа', value: 'Удаленная работа' },
      { label: 'Геймдизайн', value: 'Геймдизайн' },
      { label: 'Сторителлинг', value: 'Сторителлинг' },
      { label: 'Подкастинг', value: 'Подкастинг' },
      { label: 'Блогинг', value: 'Блогинг' },
      { label: 'Влоггинг', value: 'Влоггинг' },
      { label: 'Таргетинг', value: 'Таргетинг' },
      { label: 'Контекстная реклама', value: 'Контекстная реклама' },
      { label: 'E-commerce', value: 'E-commerce' },
      { label: 'Дропшиппинг', value: 'Дропшиппинг' },
      { label: 'Логическое мышление', value: 'Логическое мышление' },
      { label: 'Креативность', value: 'Креативность' },
      { label: 'Самообучение', value: 'Самообучение' },
      { label: 'Исследования', value: 'Исследования' },
      { label: 'Научная работа', value: 'Научная работа' },
      { label: 'Патентоведение', value: 'Патентоведение' },
      { label: 'Стандартизация', value: 'Стандартизация' },
      { label: 'Управление проектами', value: 'Управление проектами' },
      { label: 'Scrum', value: 'Scrum' },
      { label: 'Agile', value: 'Agile' },
      { label: 'Канбан', value: 'Канбан' },
      { label: 'Бережливое производство', value: 'Бережливое производство' },
      { label: 'Шесть сигм', value: 'Шесть сигм' },
      { label: 'Управление рисками', value: 'Управление рисками' },
      { label: 'Управление качеством', value: 'Управление качеством' },
      { label: 'Управление изменениями', value: 'Управление изменениями' },
      { label: 'Управление знаниями', value: 'Управление знаниями' },
      { label: 'Управление инновациями', value: 'Управление инновациями' },
      { label: 'Управление цепочками поставок', value: 'Управление цепочками поставок' },
      { label: 'Управление активами', value: 'Управление активами' },
      { label: 'Управление IT-услугами', value: 'Управление IT-услугами' },
      { label: 'Управление продуктом', value: 'Управление продуктом' },
      { label: 'Управление данными', value: 'Управление данными' },
      { label: 'Управление контентом', value: 'Управление контентом' },
      { label: 'Управление сообществом', value: 'Управление сообществом' },
      { label: 'Управление репутацией', value: 'Управление репутацией' },
      { label: 'Управление кризисами', value: 'Управление кризисами' },
      { label: 'Управление безопасностью', value: 'Управление безопасностью' },
      { label: 'Управление энергопотреблением', value: 'Управление энергопотреблением' },
      { label: 'Управление отходами', value: 'Управление отходами' },
      { label: 'Управление водными ресурсами', value: 'Управление водными ресурсами' },
      { label: 'Управление лесами', value: 'Управление лесами' },
      { label: 'Управление рыболовством', value: 'Управление рыболовством' },
      { label: 'Управление сельским хозяйством', value: 'Управление сельским хозяйством' },
      { label: 'Управление туризмом', value: 'Управление туризмом' },
      { label: 'Управление гостиничным бизнесом', value: 'Управление гостиничным бизнесом' },
      { label: 'Управление ресторанами', value: 'Управление ресторанами' },
      { label: 'Управление транспортом', value: 'Управление транспортом' },
      { label: 'Управление логистикой', value: 'Управление логистикой' },
      { label: 'Управление складом', value: 'Управление складом' },
      { label: 'Управление запасами', value: 'Управление запасами' },
      { label: 'Управление закупками', value: 'Управление закупками' },
      { label: 'Управление продажами', value: 'Управление продажами' },
      { label: 'Управление маркетингом', value: 'Управление маркетингом' },
      { label: 'Управление рекламой', value: 'Управление рекламой' },
      { label: 'Управление PR', value: 'Управление PR' },
      { label: 'Управление SMM', value: 'Управление SMM' },
      { label: 'Управление SEO', value: 'Управление SEO' },
      { label: 'Управление контентом', value: 'Управление контентом' },
      { label: 'Управление социальными медиа', value: 'Управление социальными медиа' },
      { label: 'Управление блогом', value: 'Управление блогом' },
      { label: 'Управление подкастом', value: 'Управление подкастом' },
      { label: 'Управление влогом', value: 'Управление влогом' },
      { label: 'Управление сайтом', value: 'Управление сайтом' },
      { label: 'Управление приложением', value: 'Управление приложением' },
      { label: 'Управление игрой', value: 'Управление игрой' },
      { label: 'Управление сообществом', value: 'Управление сообществом' },
      { label: 'Управление фан-клубом', value: 'Управление фан-клубом' },
      { label: 'Управление событиями', value: 'Управление событиями' },
      { label: 'Управление фестивалями', value: 'Управление фестивалями' },
      { label: 'Управление конференциями', value: 'Управление конференциями' },
      { label: 'Управление выставками', value: 'Управление выставками' },
      { label: 'Управление спортивными событиями', value: 'Управление спортивными событиями' },
      { label: 'Управление киберспортивными событиями', value: 'Управление киберспортивными событиями' },
      { label: 'Управление благотворительностью', value: 'Управление благотворительностью' },
      { label: 'Управление волонтерами', value: 'Управление волонтерами' },
      { label: 'Управление НКО', value: 'Управление НКО' },
      { label: 'Управление образовательными программами', value: 'Управление образовательными программами' },
      { label: 'Управление курсами', value: 'Управление курсами' },
      { label: 'Управление тренингами', value: 'Управление тренингами' },
      { label: 'Управление вебинарами', value: 'Управление вебинарами' },
      { label: 'Управление онлайн-школой', value: 'Управление онлайн-школой' },
      { label: 'Управление университетом', value: 'Управление университетом' },
      { label: 'Управление исследованиями', value: 'Управление исследованиями' },
      { label: 'Управление лабораторией', value: 'Управление лабораторией' },
      { label: 'Управление научными проектами', value: 'Управление научными проектами' },
      { label: 'Управление инновационными проектами', value: 'Управление инновационными проектами' },
      { label: 'Управление стартапами', value: 'Управление стартапами' },
      { label: 'Управление венчурными проектами', value: 'Управление венчурными проектами' },
      { label: 'Управление инвестициями', value: 'Управление инвестициями' },
      { label: 'Управление фондами', value: 'Управление фондами' },
      { label: 'Управление акциями', value: 'Управление акциями' },
      { label: 'Управление облигациями', value: 'Управление облигациями' },
      { label: 'Управление недвижимостью', value: 'Управление недвижимостью' },
      { label: 'Управление строительством', value: 'Управление строительством' }]
    setSkillOptions(allSkills);
  }, []);

  const handleSkillChange = (selectedSkills) => {
    if (selectedSkills.length <= 3) {
      setSkills(selectedSkills);
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (skills.length === 0) {
      setError('Пожалуйста, выберите хотя бы один навык');
      return;
    }

    const userData = {
      email,
      password,
      name: username,
      skills: skills.map(skill => skill.value)
    };
    
    try {
      const res = await axios.post('https://edventuralearn.ru/register', userData);
      
      dispatch(fetchUser(res.data));
      localStorage.setItem('user', JSON.stringify(res.data));
      
      // Редирект на главную страницу
      navigate("/");
      
      // Перезагрузка страницы после небольшой задержки
      setTimeout(() => {
        window.location.reload();
      }, 100);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка регистрации');
      console.error(err);
    }
  };


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
