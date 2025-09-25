import React, { useState, useEffect } from 'react';

export default function ChoiceForm({ choice, onSave }) {
  const [text, setText] = useState('');
  const [is_correct, setIsCorrect] = useState(false);

  useEffect(() => {
    if (choice) {
      setText(choice.text);
      setIsCorrect(choice.is_correct);
    }
  }, [choice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ text, is_correct });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Choice Text</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={is_correct}
            onChange={(e) => setIsCorrect(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm">Is Correct?</span>
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save Choice
      </button>
    </form>
  );
}
