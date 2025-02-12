import { useEffect } from 'react';
import './modal.css';

function Modal({ course, onClose }) {

  useEffect(() => {
    if (course) {
      // Блокируем скролл при открытии модального окна
      document.body.style.overflow = 'hidden';
    } else {
      // Восстанавливаем скролл при закрытии модального окна
      document.body.style.overflow = 'auto';
    }

    // Очистка эффекта: восстанавливаем скролл при размонтировании компонента
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [course]);

  if (!course) return null;

  return (
    <div className={`modal ${course ? 'active' : ''}`}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h1 style={{textAlign : 'center'}}>{course.title}</h1>
        <p>Цена: {course.price}</p>
        <p>Длительность: {course.duration}</p>
        <div className="tags">
          {course.tags ? course.tags.map((tag, id) => (
            <span key={id}>{tag}</span>
          )) : ''}
        </div>
        <p>{course.description}</p>
      </div>
    </div>
  );
}

export default Modal;