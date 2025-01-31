import React from 'react';
import './about.css'; // Подключаем наш CSS файл

const About = () => {
  return (
    <section className="about-section py-20 px-4 sm:px-6 lg:px-8">
      {/* Геометрические фигуры */}
      <div className="about-shape about-shape-purple" />
      <div className="about-shape about-shape-blue" />
      <div className="about-shape about-shape-pink" />

      <div className="max-w-7xl mx-auto relative">
        {/* Заголовок */}
        <h1 className="about-title">
        <span className="text-purple-600">EdVentura</span>
        </h1>

        {/* Секция с описанием и изображением */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Текст */}
          <div className="space-y-6">
            <p className="about-text about-fade-in-left">
              EdVentura — это инновационная платформа для создания, размещения и прохождения онлайн-курсов. Мы объединяем лучшие технологии и методики обучения, чтобы сделать процесс образования увлекательным и эффективным.
            </p>
            <p className="about-text about-fade-in-left">
              Наша миссия — вдохновлять людей на обучение и помогать им достигать своих целей с помощью современных инструментов и подходов.
            </p>
          </div>

          {/* Изображение */}
          <div className="about-image about-fade-in-right">
            <img
              src="https://via.placeholder.com/600x400" // Замените на ваше фото
              alt="EdVentura"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Секция с преимуществами */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Интерактивность",
              description: "Курсы с интерактивными элементами: тесты, видео, задания.",
              icon: "🎯",
            },
            {
              title: "Простота",
              description: "Удобный интерфейс для преподавателей и студентов.",
              icon: "✨",
            },
            {
              title: "Аналитика",
              description: "Подробная аналитика успеваемости и прогресса.",
              icon: "📊",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="about-card about-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="about-card-icon">{item.icon}</div>
              <h3 className="about-card-title">{item.title}</h3>
              <p className="about-card-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;