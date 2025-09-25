import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import ChoiceForm from './ChoiceForm';

export default function QuestionForm({ examId, question, onSave }) {
  const [text, setText] = useState('');
  const [choices, setChoices] = useState([]);
  const [editingChoice, setEditingChoice] = useState(null);
  const [showChoiceForm, setShowChoiceForm] = useState(false);

  useEffect(() => {
    if (question) {
      setText(question.text);
      setChoices(question.choices);
    }
  }, [question]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { text };
    let savedQuestion;
    if (question) {
      savedQuestion = await api.updateQuestion(question.id, payload);
    } else {
      savedQuestion = await api.createQuestion(examId, payload);
    }

    // Now save the choices
    for (const choice of choices) {
      const choicePayload = { ...choice, question: savedQuestion.id };
      if (choice.id) {
        await api.updateChoice(choice.id, choicePayload);
      } else {
        await api.createChoice(savedQuestion.id, choicePayload);
      }
    }

    onSave();
  };

  const handleChoiceSave = (choice) => {
    if (editingChoice) {
      setChoices(choices.map((c) => (c.id === choice.id ? choice : c)));
    } else {
      setChoices([...choices, { ...choice, id: Date.now() }]); // Temporary ID
    }
    setShowChoiceForm(false);
    setEditingChoice(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Question Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Choices</h3>
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={() => {
              setEditingChoice(null);
              setShowChoiceForm(true);
            }}
            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Choice
          </button>
        </div>
        {showChoiceForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">{editingChoice ? 'Edit Choice' : 'Add Choice'}</h2>
              <ChoiceForm choice={editingChoice} onSave={handleChoiceSave} />
              <button
                onClick={() => setShowChoiceForm(false)}
                className="mt-4 w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <ul>
          {choices.map((choice) => (
            <li key={choice.id} className="flex justify-between items-center mb-2 p-2 border rounded-lg">
              <span>{choice.text}</span>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingChoice(choice);
                    setShowChoiceForm(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setChoices(choices.filter((c) => c.id !== choice.id))}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save Question
      </button>
    </form>
  );
}
