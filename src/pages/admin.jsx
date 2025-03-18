import React, { useState } from 'react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New message from Jane", read: false },
    { id: 2, text: "Project deadline approaching", read: false },
    { id: 3, text: "System update completed", read: true }
  ]);

  const stats = [
    { title: "Total Users", value: "24,521", change: "+12%", up: true },
    { title: "Revenue", value: "$13,245", change: "+18%", up: true },
    { title: "Active Projects", value: "12", change: "-2%", up: false },
    { title: "Conversion Rate", value: "3.24%", change: "+5%", up: true }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-indigo-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        <div className="flex items-center justify-between px-3">
          <span className="text-2xl font-semibold">Dashboard</span>
          <button onClick={toggleSidebar} className="md:hidden p-2 rounded-md hover:bg-indigo-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav>
          <a 
            href="#" 
            className={`block py-2.5 px-4 rounded transition duration-200 ${activeTab === 'dashboard' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </a>
          <a 
            href="#" 
            className={`block py-2.5 px-4 rounded transition duration-200 ${activeTab === 'analytics' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </a>
          <a 
            href="#" 
            className={`block py-2.5 px-4 rounded transition duration-200 ${activeTab === 'projects' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </a>
          <a 
            href="#" 
            className={`block py-2.5 px-4 rounded transition duration-200 ${activeTab === 'settings' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md p-4">
          <div className="flex items-center justify-between">
            <button onClick={toggleSidebar} className="md:hidden p-2 rounded-md hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="relative flex items-center ml-auto">
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100 flex items-center">
                  <span className="sr-only">Notifications</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500"></span>
                  )}
                </button>
              </div>
              <div className="border-l pl-3 ml-3">
                <button className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                    <span>JD</span>
                  </div>
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600 mb-6">Welcome back, John Doe</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{stat.title}</span>
                  <span className={`text-sm ${stat.up ? 'text-green-500' : 'text-red-500'}`}>{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
            </div>
            <div className="space-y-4">
              {notifications.map(notification => (
                <div key={notification.id} className="flex items-center p-3 bg-gray-50 rounded">
                  <div className={`h-2 w-2 rounded-full ${notification.read ? 'bg-gray-300' : 'bg-indigo-500'} mr-3`}></div>
                  <p className="text-gray-700">{notification.text}</p>
                </div>
              ))}
            </div>
            {notifications.some(n => !n.read) && (
              <button 
                onClick={markAllAsRead}
                className="mt-4 w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded hover:bg-gray-100 transition duration-200">
                <svg className="h-8 w-8 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm">New Project</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded hover:bg-gray-100 transition duration-200">
                <svg className="h-8 w-8 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm">Add User</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded hover:bg-gray-100 transition duration-200">
                <svg className="h-8 w-8 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm">Reports</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded hover:bg-gray-100 transition duration-200">
                <svg className="h-8 w-8 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">Settings</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;