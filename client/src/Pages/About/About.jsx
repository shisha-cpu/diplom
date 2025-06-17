import React, { Suspense, lazy } from 'react';
import './about.css'; // Подключаем наш CSS файл
import photo from './main.png'
import Card from '../../Components/Card/Card';
import StepList from '../../Components/StepList/StepList';
import ButtonWithArrow from '../../Components/Button/ButtonWithArrow';
import gif from '../../img/about.gif'

// Lazy load non-critical components
const LazyStepList = lazy(() => import('../../Components/StepList/StepList'));

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center ">
          {/* Текст */}
          <div className="space-y-6 center">
          <p className="about-text about-fade-in-left">
            EdVentura — это инновационная платформа для создания, размещения и прохождения онлайн-курсов. Мы объединяем лучшие технологии и методики обучения, чтобы сделать процесс образования увлекательным и эффективным.
          </p><br />
          <p className="about-text about-fade-in-left">
             Наша миссия — вдохновлять людей на обучение и помогать им достигать своих целей с помощью современных инструментов и подходов.
          </p><br />
          <p className="about-text about-fade-in-left">
            Главное преимущество EdVentura — это возможность не только обучаться, но и создавать собственные курсы. Пользователи могут делиться своими знаниями, зарабатывать внутреннюю валюту за прохождение их курсов и использовать её для приобретения новых знаний. Таким образом, обучение становится самодостаточным процессом, где знания обмениваются на знания.
          </p>

        <img 
          src={gif} 
          alt="EdVentura platform demonstration" 
          className="about-gif"
          loading="lazy"
          width="100%"
          height="auto"
        />
          </div>

 
        </div>
        <hr />
    <div className="about-advantages about-container about-container" >
      <h1 className="advantages-title center title">Наши приемущества </h1>
    <div className="card-container">
    <Card title='Создавай и обучайся' 
      description='EdVentura — это не только платформа для обучения, но и инструмент для создания курсов. Делись знаниями, создавай авторские программы и зарабатывай!' />

<Card title='Геймификация процесса' 
      description='Проходи курсы, зарабатывай внутреннюю валюту и используй её для новых знаний. Обучение превращается в увлекательный и мотивирующий процесс!' />

<Card title='Современные технологии' 
      description='Мы используем передовые методики и технологии, чтобы обучение было интерактивным, доступным и эффективным.' />

<Card title='Гибкость и доступность' 
      description='Обучайся в удобное время и в удобном формате — на смартфоне, планшете или компьютере. EdVentura доступна везде!' />

    </div>
    </div>
      </div>


      <div className="steps-list about-container center-around">
      <hr />
        <Suspense fallback={<div>Loading...</div>}>
          <LazyStepList />
        </Suspense>
      </div>

      <div className="button-container">
        <ButtonWithArrow />
      </div>

    </section>
  );
};

export default About;