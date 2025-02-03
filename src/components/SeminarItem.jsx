import React from 'react';

// Компонент принимает пропсы seminar, onDelete, onEdit и отображает карточку семинара
const SeminarItem = ({ seminar, onDelete, onEdit }) => {
  return (
    <div className="seminar-item">
      <div className="seminar-image">
        <img src={seminar.photo} alt={seminar.title} />
      </div>
      <div className="seminar-content">
        <h3>{seminar.title}</h3>
        <p>{seminar.description}</p>
        <div className="seminar-details">
          <span>Sana: {seminar.date}</span>
          <span>Vaqt: {seminar.time}</span>
        </div>
        <div className="seminar-actions">
          <button onClick={() => onEdit(seminar)} className="edit-btn">
            Tahrirlash
          </button>
          <button onClick={() => onDelete(seminar.id)} className="delete-btn">
            O'chirish
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeminarItem;
