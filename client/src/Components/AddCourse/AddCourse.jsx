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
      .post("http://localhost:4444/course", {
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
          onChange={setTags} // Устанавливает выбранные теги
          placeholder="Выберите теги курса"
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
                  {q.questionText} - Ответы: {q.options.join(", ")} - Правильный:{" "}
                  {q.correctAnswer}
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
          Добавить вопрос в тест модуля
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
