import React, { useState } from 'react';
import MyNews from './MyNews';
import ArticleDashboard from './ArticleDashboard';

const News = ({ user }) => {
  const [view, setView] = useState('myNews'); // Default view for editors

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {user.role === 'editor' ? (
        <MyNews user={user} />
      ) : user.role === 'admin' || user.role === 'super admin' ? (
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <button
              onClick={() => handleViewChange('myNews')}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base ${view === 'myNews' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              My News
            </button>
            <button
              onClick={() => handleViewChange('articleDashboard')}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base ${view === 'articleDashboard' ? 'bg-blue-600 text-white' : 'bg-gray-200'} sm:ml-2 mt-2 sm:mt-0`}
            >
              Article Dashboard
            </button>
          </div>
          <div>
            {view === 'myNews' && <MyNews user={user} />}
            {view === 'articleDashboard' && <ArticleDashboard />}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-center">You do not have permission to view this content.</p>
        </div>
      )}
    </div>
  );
};

export default News;
