import React from "react";
import "./stepList.css"; // Подключение стилей

const steps = [
  { icon: "fa-list", title: "Нывыки", descr: "Определи, какие навыки хочешь развить, и находи подходящие курсы " },
  { icon: "fa-user-plus", title: "Вход", descr: "Создай аккаунт, чтобы получить доступ к курсам и возможностям платформы." },
  { icon: "fa-book-open", title: "Курсы", descr: "Проходи курсы в удобное время, изучай материалы и выполняй задания." },
  { icon: "fa-pencil-alt", title: "Создать", descr: "Разрабатывай свои курсы, делись знаниями и помогай другим обучаться." },
  { icon: "fa-chart-line", title: "Анализ", descr: "Анализируй прогресс студентов, получай данные об их успеваемости и вовлечённости." },
  { icon: "fa-coins", title: "Валюта", descr: "Зарабатывай внутреннюю валюту за прохождение и создание курсов." }
];

const StepList = () => {
  return (
    <div className="step-list">
        <h1 className="advantages-title center title">Инструкиця по шагам </h1>
      <ol>
        {steps.map((step, index) => (
          <li key={index}>
            <div className="icon"><i className={`fa-solid ${step.icon}`}></i></div>
            <div className="title">{step.title}</div>
            <div className="descr">{step.descr}</div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default StepList;
