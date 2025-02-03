import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSeminars, setLoading, setError, updateSeminar, deleteSeminar } from '../store/seminarSlice';
import SeminarItem from './SeminarItem';
import EditModal from './EditModal';

const API_BASE_URL = 'http://localhost:3000';

const SeminarList = () => {
  const dispatch = useDispatch();
  const { seminars, loading, error } = useSelector(state => state.seminars);
  const [editingSeminar, setEditingSeminar] = React.useState(null);

  useEffect(() => {
    fetchSeminars();
  }, [dispatch]);

  // Функция для загрузки списка семинаров с сервера
  const fetchSeminars = async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`${API_BASE_URL}/seminars`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch(setSeminars(data));
    } catch (err) {
      console.error('Ошибка при загрузке:', err);
      dispatch(setError(`Ошибка при загрузке данных: ${err.message}`));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Функция для удаления семинара по ID
  const handleDelete = async (id) => {
    if (window.confirm('Вы действительно хотите удалить семинар?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/seminars/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        await response.json(); // DELETE so'rovi javobini kutish
        dispatch(deleteSeminar(id));
      } catch (err) {
        console.error('Ошибка при удалении:', err);
        dispatch(setError(`Ошибка при удалении: ${err.message}`));
      }
    }
  };

  const handleEdit = (seminar) => {
    setEditingSeminar(seminar);
  };

  // Функция для обновления семинара
  const handleUpdate = async (updatedSeminar) => {
    try {
      const response = await fetch(`${API_BASE_URL}/seminars/${updatedSeminar.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSeminar),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(updateSeminar(data));
      setEditingSeminar(null);
    } catch (err) {
      console.error('Ошибка при обновлении:', err);
      dispatch(setError(`Ошибка при обновлении: ${err.message}`));
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="seminar-list">
      <h2>Список семинаров</h2>
      {seminars.map(seminar => (
        <SeminarItem
          key={seminar.id}
          seminar={seminar}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
      {editingSeminar && (
        <EditModal
          seminar={editingSeminar}
          onUpdate={handleUpdate}
          onClose={() => setEditingSeminar(null)}
        />
      )}
    </div>
  );
};

export default SeminarList;
