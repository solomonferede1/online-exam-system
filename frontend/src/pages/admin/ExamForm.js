import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function ExamForm({ exam, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration_minutes, setDurationMinutes] = useState(60);

  useEffect(() => {
    if (exam) {
      setTitle(exam.title);
      setDescription(exam.description);
      setDurationMinutes(exam.duration_minutes);
    }
  }, [exam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, description, duration_minutes };
    if (exam) {
      await api.updateExam(exam.id, payload);
    } else {
      await api.createExam(payload);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Duration (minutes)</label>
        <input
          type="number"
          value={duration_minutes}
          onChange={(e) => setDurationMinutes(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save
      </button>
    </form>
  );
}
