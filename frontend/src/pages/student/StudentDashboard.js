import React from 'react';
import Layout from '../../components/layout/Layout';

export default function StudentDashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Student Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-white border rounded">Upcoming Exams</div>
        <div className="p-4 bg-white border rounded">Recent Scores</div>
        <div className="p-4 bg-white border rounded">Profile</div>
      </div>
    </Layout>
  );
}

