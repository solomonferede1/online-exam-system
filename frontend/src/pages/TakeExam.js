/**
 * Take Exam page with periodic autosave.
 *
 * Loads exam details, starts (or resumes) an attempt, stores local answer
 * selections, autosaves every 5 seconds, and allows submit to compute score.
 */
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const API = (process.env.REACT_APP_API_BASE || 'http://localhost:8000/api/v1').replace(/\/$/, '');

export default function TakeExam() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    fetch(`${API}/exams/${id}/`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setExam)
      .catch((e) => setError(e.message || 'Failed to load exam'));
  }, [id, token]);

  useEffect(() => {
    if (!exam) return;
    fetch(`${API}/exams/${id}/start/`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setAttempt)
      .catch(() => {});
  }, [exam, id, token]);

  const [answers, setAnswers] = useState({});
  const questions = useMemo(() => exam?.questions || [], [exam]);

  function selectChoice(qId, choiceId) {
    setAnswers((prev) => ({ ...prev, [qId]: { question: qId, selected_choice: choiceId } }));
  }

  // autosave every 5s
  useEffect(() => {
    if (!exam) return;
    const i = setInterval(() => {
      const payload = { answers: Object.values(answers) };
      fetch(`${API}/exams/${id}/autosave/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }, 5000);
    return () => clearInterval(i);
  }, [answers, exam, id, token]);

  async function submit() {
    try {
      await fetch(`${API}/exams/${id}/autosave/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ answers: Object.values(answers) }),
      });
      const res = await fetch(`${API}/exams/${id}/submit/`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      alert(`Score: ${data.score} (${data.correct}/${data.total})`);
    } catch (e) {
      setError('Failed to submit');
    }
  }

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!exam) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">{exam.title}</h1>
      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="border rounded p-4">
            <div className="font-medium mb-2">{q.text}</div>
            <div className="space-y-2">
              {q.choices.map((c) => (
                <label key={c.id} className="block">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    onChange={() => selectChoice(q.id, c.id)}
                    className="mr-2"
                  />
                  {c.text}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={submit}>Submit</button>
      </div>
    </div>
  );
}


