import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './layout/DashboardSidebar'
import DashboardHeader from './layout/DashboardHeader';



function Dashboard() {
  return (
    <>
    <div className="dashboard-background d-flex">
      <DashboardSidebar />
      
      <div className="flex-grow-1">
       <DashboardHeader /> 
       <Outlet />

      </div>
    </div>
    </>
     
  
  )
}

export default Dashboard


