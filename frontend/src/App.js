import './App.css';
import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { api } from './services/api';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ExamList from './pages/ExamList';
import TakeExam from './pages/TakeExam';
import RoleRoute from './components/RoleRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import Users from './pages/admin/Users';
import AdminExams from './pages/admin/Exams';
import AdminResults from './pages/admin/Results';
import Settings from './pages/admin/Settings';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import MyExams from './pages/instructor/MyExams';
import ExamDetails from './pages/instructor/ExamDetails';
import InstructorResults from './pages/instructor/Results';
import StudentDashboard from './pages/student/StudentDashboard';
import MyResults from './pages/student/MyResults';
import Profile from './pages/student/Profile';

function Home() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Welcome {user?.username || 'User'}</h2>
      <div className="flex items-center gap-3">
        <button className="bg-blue-600 text-white px-3 py-2 rounded" onClick={async () => alert(JSON.stringify(await api.health()))}>Ping API</button>
        <button className="border px-3 py-2 rounded" onClick={logout}>Logout</button>
      </div>
      <p className="text-gray-600 mt-4">Use the left sidebar to navigate.</p>
    </div>
  );
}

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div>
      {isAuthenticated ? (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/exams" element={<ProtectedRoute><ExamList /></ProtectedRoute>} />
          <Route path="/exams/:id" element={<ProtectedRoute><TakeExam /></ProtectedRoute>} />
          {/* Admin */}
          <Route path="/admin" element={<ProtectedRoute><RoleRoute roles={["ADMIN"]}><AdminDashboard /></RoleRoute></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><RoleRoute roles={["ADMIN"]}><Users /></RoleRoute></ProtectedRoute>} />
          <Route path="/admin/exams" element={<ProtectedRoute><RoleRoute roles={["ADMIN"]}><AdminExams /></RoleRoute></ProtectedRoute>} />
          <Route path="/admin/results" element={<ProtectedRoute><RoleRoute roles={["ADMIN"]}><AdminResults /></RoleRoute></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><RoleRoute roles={["ADMIN"]}><Settings /></RoleRoute></ProtectedRoute>} />
          {/* Instructor */}
          <Route path="/instructor" element={<ProtectedRoute><RoleRoute roles={["ADMIN","INSTRUCTOR"]}><InstructorDashboard /></RoleRoute></ProtectedRoute>} />
          <Route path="/instructor/exams" element={<ProtectedRoute><RoleRoute roles={["ADMIN","INSTRUCTOR"]}><MyExams /></RoleRoute></ProtectedRoute>} />
          <Route path="/instructor/exams/:id" element={<ProtectedRoute><RoleRoute roles={["ADMIN","INSTRUCTOR"]}><ExamDetails /></RoleRoute></ProtectedRoute>} />
          <Route path="/instructor/results" element={<ProtectedRoute><RoleRoute roles={["ADMIN","INSTRUCTOR"]}><InstructorResults /></RoleRoute></ProtectedRoute>} />
          {/* Student */}
          <Route path="/student" element={<ProtectedRoute><RoleRoute roles={["ADMIN","STUDENT"]}><StudentDashboard /></RoleRoute></ProtectedRoute>} />
          <Route path="/student/results" element={<ProtectedRoute><RoleRoute roles={["ADMIN","STUDENT"]}><MyResults /></RoleRoute></ProtectedRoute>} />
          <Route path="/student/profile" element={<ProtectedRoute><RoleRoute roles={["ADMIN","STUDENT"]}><Profile /></RoleRoute></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
