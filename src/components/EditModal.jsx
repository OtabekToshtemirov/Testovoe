import React, { useState } from 'react';

const EditModal = ({ seminar, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    id: seminar?.id || '',
    title: seminar?.title || '',
    description: seminar?.description || '',
    date: seminar?.date || '',
    time: seminar?.time || '',
    speaker: seminar?.speaker || '',
    photo: seminar?.photo || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Редактирование семинара</h3>
        {/* Форма для редактирования семинара */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Описание:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Дата:</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="DD.MM.YYYY"
              required
            />
          </div>
          <div className="form-group">
            <label>Время:</label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="HH:MM"
              required
            />
          </div>
          <div className="form-group">
            <label>Докладчик:</label>
            <input
              type="text"
              name="speaker"
              value={formData.speaker}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Ссылка на изображение:</label>
            <input
              type="url"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onClose}>Отмена</button>
          </div>
          {/* При сабмите вызываем onUpdate для отправки данных формы */}
        </form>
      </div>
    </div>
  );
};

export default EditModal;
