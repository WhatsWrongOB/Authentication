import React from 'react'
import '../styles/dashboard.css'
import Sidebar from '../components/Sidebar'
import DashboardComment from '../components/DashboardComment'
import DashboardPost from '../components/DashboardPost'
import DashboardUser from '../components/DashboardUser'
import DashboardStats from '../components/DashboardStat'

const Dashboard = () => {
  return (
    <main className="dashboard">
      <aside>
        <Sidebar />
      </aside>
      <div className="dash_container">
        <div className="dash_upper_container">
          <DashboardStats />
        </div>
        <div className="dash_lower_container">
          <DashboardUser />
          <DashboardComment />
        </div>
        <DashboardPost />
      </div>
    </main>
  )
}

export default Dashboard