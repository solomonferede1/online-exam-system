import './App.css';
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
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
import DepartmentDashboard from './pages/department/DepartmentDashboard';
import DepartmentResults from './pages/department/DepartmentResults';
import HRDashboard from './pages/hr/HRDashboard';
import ExportResults from './pages/hr/ExportResults';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={<ProtectedRoute><MainLayout /></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

function MainLayout() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/exams" element={<ExamList />} />
        <Route path="/exams/:id" element={<TakeExam />} />
        {/* Admin */}
        <Route path="/admin" element={<RoleRoute roles={['ADMIN']}><AdminDashboard /></RoleRoute>} />
        import './App.css';
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
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
import ExamDetails from './pages/admin/ExamDetails';
import InstructorResults from './pages/instructor/Results';
import StudentDashboard from './pages/student/StudentDashboard';
import MyResults from './pages/student/MyResults';
import Profile from './pages/student/Profile';
import DepartmentDashboard from './pages/department/DepartmentDashboard';
import DepartmentResults from './pages/department/DepartmentResults';
import HRDashboard from './pages/hr/HRDashboard';
import ExportResults from './pages/hr/ExportResults';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={<ProtectedRoute><MainLayout /></ProtectedRoute>}
      />
    </Routes>
  );
}

function MainLayout() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/exams" element={<ExamList />} />
        <Route path="/exams/:id" element={<TakeExam />} />
        {/* Admin */}
        <Route path="/admin" element={<RoleRoute roles={['ADMIN']}><AdminDashboard /></RoleRoute>} />
        <Route path="/admin/users" element={<RoleRoute roles={['ADMIN']}><Users /></RoleRoute>} />
        <Route path="/admin/exams" element={<RoleRoute roles={['ADMIN']}><AdminExams /></RoleRoute>} />
        <Route path="/admin/exams/:id" element={<RoleRoute roles={['ADMIN', 'INSTRUCTOR']}><ExamDetails /></RoleRoute>} />
        <Route path="/admin/results" element={<RoleRoute roles={['ADMIN']}><AdminResults /></RoleRoute>} />
        <Route path="/admin/settings" element={<RoleRoute roles={['ADMIN']}><Settings /></RoleRoute>} />
        {/* Instructor */}
        <Route path="/instructor" element={<RoleRoute roles={['ADMIN', 'INSTRUCTOR']}><InstructorDashboard /></RoleRoute>} />
        <Route path="/instructor/exams" element={<RoleRoute roles={['ADMIN', 'INSTRUCTOR']}><MyExams /></RoleRoute>} />
        <Route path="/instructor/exams/:id" element={<RoleRoute roles={['ADMIN', 'INSTRUCTOR']}><ExamDetails /></RoleRoute>} />
        <Route path="/instructor/results" element={<RoleRoute roles={['ADMIN', 'INSTRUCTOR']}><InstructorResults /></RoleRoute>} />
        {/* Student */}
        <Route path="/student" element={<RoleRoute roles={['ADMIN', 'STUDENT']}><StudentDashboard /></RoleRoute>} />
        <Route path="/student/results" element={<RoleRoute roles={['ADMIN', 'STUDENT']}><MyResults /></RoleRoute>} />
        <Route path="/student/profile" element={<RoleRoute roles={['ADMIN', 'STUDENT']}><Profile /></RoleRoute>} />
        {/* Department Head */}
        <Route path="/department" element={<RoleRoute roles={['DEPARTMENT_HEAD']}><DepartmentDashboard /></RoleRoute>} />
        <Route path="/department/results" element={<RoleRoute roles={['DEPARTMENT_HEAD']}><DepartmentResults /></RoleRoute>} />
        {/* HR */}
        <Route path="/hr" element={<RoleRoute roles={['HR']}><HRDashboard /></RoleRoute>} />
        <Route path="/hr/results" element={<RoleRoute roles={['HR']}><ExportResults /></RoleRoute>} />
      </Routes>
    </Layout>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  );
}

        <Route path="/admin/exams" element={<RoleRoute roles={['ADMIN']}><AdminExams /></RoleRoute>} />
        <Route path="/admin/results" element={<RoleRoute roles={['ADMIN']}><AdminResults /></RoleRoute>} />
        <Route path="/admin/settings" element={<RoleRoute roles={['ADMIN']}><Settings /></RoleRoute>} />
        {/* Instructor */}
        <Route path="/instructor" element={<RoleRoute roles={['ADMIN', 'INSTRUCTOR']}><InstructorDashboard /></RoleRoute>} />
        <Route path="/instructor/exams" element={<RoleRoute roles={['ADMIN', 'INSTRUCTOR']}><MyExams /></RoleRoute>} />
        <Route path="/instructor/exams/:id" element={<RoleRoute roles={['ADMIN', 'INSTRUCTOR']}><ExamDetails /></RoleRoute>} />
        <Route path="/instructor/results" element={<RoleRoute roles={['ADMIN', 'INSTRUCTOR']}><InstructorResults /></RoleRoute>} />
        {/* Student */}
        <Route path="/student" element={<RoleRoute roles={['ADMIN', 'STUDENT']}><StudentDashboard /></RoleRoute>} />
        <Route path="/student/results" element={<RoleRoute roles={['ADMIN', 'STUDENT']}><MyResults /></RoleRoute>} />
        <Route path="/student/profile" element={<RoleRoute roles={['ADMIN', 'STUDENT']}><Profile /></RoleRoute>} />
        {/* Department Head */}
        <Route path="/department" element={<RoleRoute roles={['DEPARTMENT_HEAD']}><DepartmentDashboard /></RoleRoute>} />
        <Route path="/department/results" element={<RoleRoute roles={['DEPARTMENT_HEAD']}><DepartmentResults /></RoleRoute>} />
        {/* HR */}
        <Route path="/hr" element={<RoleRoute roles={['HR']}><HRDashboard /></RoleRoute>} />
        <Route path="/hr/results" element={<RoleRoute roles={['HR']}><ExportResults /></RoleRoute>} />
      </Routes>
    </Layout>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
