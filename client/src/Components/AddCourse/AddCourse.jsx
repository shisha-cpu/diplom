import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Select from 'react-select';
import './addCourse.css'
export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [modules, setModules] = useState([]);
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [tags, setTags] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");

  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleContent, setModuleContent] = useState("");
  const [moduleImg, setModuleImg] = useState("");
  const [moduleQuestions, setModuleQuestions] = useState([]);
  const [textQuestion , setTextQuestion] = useState()
  const [finalTestQuestions, setFinalTestQuestions] = useState([]);

  const user = useSelector((state) => state.user.userInfo);
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

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      title,
      description,
      duration,
      modules,
      price,
      img,
      tags: tags.map((tag) => tag.value),
      difficulty,
      finalTest: finalTestQuestions,
    };
    console.log(courseData);
    
    axios
      .post("http://89.169.39.144:4444/course", {
        courseData,
        userId: user._id,
      })
      .then(() => {

        setTitle("");
        setDescription("");
        setDuration("");
        setModules([]);
        setPrice("");
        setImg("");
        setTags("");
        setDifficulty("Beginner");
        setFinalTestQuestions([]);
        // location.reload();
      })
      .catch((e) => console.log(e));
  };

  const addModule = () => {
    if (moduleTitle && moduleContent) {
      setModules((prevModules) => [
        ...prevModules,
        {
          title: moduleTitle,
          content: moduleContent,
          img: moduleImg,   
          questions: moduleQuestions,
        },
      ]);
      setModuleTitle("");
      setModuleContent("");
      setModuleImg("");
      setModuleQuestions([]);
    }
  };
  const addTextQuestion = () => {
    const questionText = prompt("Введите текст вопроса:");
    if (!questionText) return;
    const correctAnswer = prompt(
      `Введите правильный ответ:`
    );
    setModuleQuestions((prev) => [
      ...prev,
      { questionText, type: "text"  , correctAnswer}, // Указываем тип как "text"
    ]);
  
    // Обновляем поле textQuestion
    setTextQuestion(questionText); // Сохраняем открытый вопрос в textQuestion
  };
  
  
  const addQuestion = (setQuestions) => {
    const questionText = prompt("Введите текст вопроса:");
    if (!questionText) return;

    const options = prompt(
      "Введите варианты ответов через запятую (например: A,B,C,D):"
    )
      ?.split(",")
      .map((opt) => opt.trim());
    if (!options || options.length < 2) return alert("Должно быть минимум 2 варианта!");

    const correctAnswer = prompt(
      `Введите правильный ответ из вариантов (${options.join(", ")}):`
    );
    if (!correctAnswer || !options.includes(correctAnswer)) {
      return alert("Правильный ответ должен быть из списка вариантов.");
    }

    setQuestions((prev) => [
      ...prev,
      { questionText, options, correctAnswer },
    ]);
  };
console.log(modules);
const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: '12px',
    minHeight: '48px',
    boxShadow: 'none',
    transition: 'all 0.3s ease',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(0, 123, 255, 0.2)',
    borderRadius: '8px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff',
    fontSize: '14px',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#fff',
    cursor: 'pointer',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'rgba(255, 255, 255, 0.7)',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'rgba(255, 255, 255, 0.7)',
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: 'rgba(255, 255, 255, 0.7)',
  }),
  input: (provided) => ({
    ...provided,
    color: '#fff',
  }),
};
  return (
    <div className="addCourse">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок курса"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание курса"
          required
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Продолжительность курса (в часах)"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Цена курса"
          required
        />
<Select
  isMulti
  options={allSkills}
  value={tags}
  onChange={setTags}
  placeholder="Выберите теги курса"
  styles={customStyles}
  className="basic-multi-select"
  classNamePrefix="select"
/>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Beginner">Новичок</option>
          <option value="Intermediate">Средний</option>
          <option value="Advanced">Продвинутый</option>
        </select>
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          placeholder="Ссылка на изображение курса"
        />

        <h4>Модули курса</h4>
        {modules.map((mod, index) => (
  <div key={index} className="module-item">
    <h5>{mod.title}</h5>
    <p>{mod.content}</p>
    {mod.img && <img src={mod.img} alt={mod.title} />}
    <ul>
      {mod.questions.map((q, idx) => (
        <li key={idx}>
          {q.questionText}
          {q.type === 'multiple_choice' && q.options && q.options.length > 0 && (
            <> - Ответы: {q.options.join(", ")} </> 
          )}
          {q.type === 'multiple_choice' && q.correctAnswer && (
            <> - Правильный: {q.correctAnswer}</>
          )}
          {q.type === 'text' && <span> - Открытый вопрос</span>} 
        </li>
      ))}
    </ul>
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
        <button
          type="button"
          onClick={() => addQuestion(setModuleQuestions)}
        >
          Добавить тест
        </button>
        <button
          type="button"
          onClick={() => addTextQuestion(setModuleQuestions)}
        >
          Добавить вопрос с открытым ответом 
        </button>
        <button type="button" onClick={addModule}>
          Добавить модуль
        </button>

        <h4>Итоговый тест курса</h4>
        <button
          type="button"
          onClick={() => addQuestion(setFinalTestQuestions)}
        >
          Добавить вопрос в итоговый тест
        </button>
        <ul>
          {finalTestQuestions.map((q, index) => (
            <li key={index}>
              {q.questionText} - Ответы: {q.options.join(", ")} - Правильный:{" "}
              {q.correctAnswer}
            </li>
          ))}
        </ul>

        <button type="submit" className="selected" >Создать курс</button>
      </form>
    </div>
  );
}
