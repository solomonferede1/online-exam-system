/**
 * Exams listing page (authenticated).
 *
 * Fetches exams from the API and renders a simple Tailwind list.
 */
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

export default function ExamList() {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .health() // test connectivity
      .then(() => fetch(`${process.env.REACT_APP_API_BASE || 'http://localhost:8000/api/v1'}/exams/`, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }))
      .then((r) => r.json())
      .then(setExams)
      .catch((e) => setError(e.message || 'Failed to load exams'));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Exams</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <ul className="space-y-3">
        {exams.map((e) => (
          <li key={e.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <div className="font-medium">{e.title}</div>
              <div className="text-sm text-gray-600">{e.description}</div>
            </div>
            <Link className="text-blue-600" to={`/exams/${e.id}`}>Open</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


