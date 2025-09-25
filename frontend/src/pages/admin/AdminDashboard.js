import React from 'react';
import Layout from '../../components/layout/Layout';

export default function AdminDashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-white border rounded">Users</div>
        <div className="p-4 bg-white border rounded">Exams</div>
        <div className="p-4 bg-white border rounded">Results</div>
      </div>
    </Layout>
  );
}



