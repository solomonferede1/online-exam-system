import React from 'react';
import Layout from '../../components/layout/Layout';

export default function InstructorDashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Instructor Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-white border rounded">My Exams</div>
        <div className="p-4 bg-white border rounded">Recent Results</div>
        <div className="p-4 bg-white border rounded">Actions</div>
      </div>
    </Layout>
  );
}



