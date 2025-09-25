import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import ExamForm from './ExamForm';

export default function Exams() {
  const [exams, setExams] = useState([]);
  const [editingExam, setEditingExam] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    const response = await api.getExams();
    setExams(response);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingExam(null);
    fetchExams();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      await api.deleteExam(id);
      fetchExams();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Exam Management</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEditingExam(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Exam
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingExam ? 'Edit Exam' : 'Create Exam'}</h2>
            <ExamForm exam={editingExam} onSave={handleSave} />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="bg-white border rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Duration</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id} className="border-b">
                <td className="px-4 py-2">
                  <Link to={`/admin/exams/${exam.id}`} className="text-blue-600 hover:underline">
                    {exam.title}
                  </Link>
                </td>
                <td className="px-4 py-2">{exam.description}</td>
                <td className="px-4 py-2">{exam.duration_minutes}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => {
                      setEditingExam(exam);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exam.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



