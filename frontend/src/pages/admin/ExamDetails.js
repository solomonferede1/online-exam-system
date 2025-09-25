import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import QuestionForm from './QuestionForm';

export default function ExamDetails() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  useEffect(() => {
    fetchExam();
  }, [id]);

  const fetchExam = async () => {
    const response = await api.getExam(id);
    setExam(response);
  };

  const handleQuestionSave = () => {
    setShowQuestionForm(false);
    setEditingQuestion(null);
    fetchExam();
  };

  const handleQuestionDelete = async (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      await api.deleteQuestion(questionId);
      fetchExam();
    }
  };

  return (
    <div>
      {exam && (
        <div>
          <h1 className="text-2xl font-semibold mb-4">{exam.title}</h1>
          <p className="text-gray-600 mb-4">{exam.description}</p>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                setEditingQuestion(null);
                setShowQuestionForm(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Question
            </button>
          </div>
          {showQuestionForm && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{editingQuestion ? 'Edit Question' : 'Add Question'}</h2>
                <QuestionForm examId={id} question={editingQuestion} onSave={handleQuestionSave} />
                <button
                  onClick={() => setShowQuestionForm(false)}
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
                  <th className="px-4 py-2 text-left">Question</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {exam.questions.map((question) => (
                  <tr key={question.id} className="border-b">
                    <td className="px-4 py-2">{question.text}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => {
                          setEditingQuestion(question);
                          setShowQuestionForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleQuestionDelete(question.id)}
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
      )}
    </div>
  );
}
