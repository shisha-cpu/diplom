import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './skillsModal.css';

const SkillsModal = ({ isOpen, onClose, userSkills, onSave }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const [error, setError] = useState('');

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
      { label: 'Копирайтинг', value: 'Копирайтинг' }
    ];
    setSkillOptions(allSkills);
    
    // Set initial selected skills
    if (userSkills) {
      const initialSkills = userSkills.map(skill => ({
        label: skill,
        value: skill
      }));
      setSelectedSkills(initialSkills);
    }
  }, [userSkills]);

  const handleSkillsChange = (newValue) => {
    if (newValue.length > 3) {
      setError('Можно выбрать максимум 3 навыка');
      return;
    }
    setError('');
    setSelectedSkills(newValue);
  };

  const handleSave = () => {
    if (selectedSkills.length > 3) {
      setError('Можно выбрать максимум 3 навыка');
      return;
    }
    const skills = selectedSkills.map(skill => skill.value);
    onSave(skills);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'active' : ''}`}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h1>Редактирование навыков</h1>
        <p className="skills-limit">Можно выбрать максимум 3 навыка</p>
        {error && <p className="error-message">{error}</p>}
        <div className="skills-select">
          <Select
            isMulti
            value={selectedSkills}
            onChange={handleSkillsChange}
            options={skillOptions}
            className="skills-select-input"
            classNamePrefix="skills-select"
            placeholder="Выберите навыки..."
            noOptionsMessage={() => "Нет доступных навыков"}
            maxMenuHeight={200}
          />
        </div>
        <div className="modal-buttons">
          <button className="save-button" onClick={handleSave}>Сохранить</button>
          <button className="cancel-button" onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default SkillsModal; 