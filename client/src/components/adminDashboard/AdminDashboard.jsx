import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ProfileForm from './ProfileForm';
import { useAuth } from '../AuthContext';
import Users from './Users';
import { Navigate } from 'react-router-dom';
import MyNews from './MyNews';
import SponsorsTable from './SponsorsTable';
import SponsorDetail from './SponsorDetail';
import CategoryManager from './CategoryManager';
import SubscribersTable from './SubscribersTable';
import ArticleDashboard from './News';
import News from './News';

function AdminDashboard() {
  const [content, setContent] = useState(0); // Default to null
  const { user } = useAuth(); // Access role using useAuth hook
  const token=localStorage.getItem("token")
  // Initialize content based on user role
  useEffect(() => {
    if (user) {
      if (user.role === 'editor') {
        setContent(2); // Set content to 5 for editor role
      } else if(user.role === 'sponsor')  {
        setContent(7); // Set content to 0 for other roles
      }
      else if (user.role==="admin") setContent(3);
    }
  }, [user]); // Dependency array includes user

  if (!token) return <Navigate to="/" />

  // Display loading message if user is not available yet
  if (user === null) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setContent={setContent} content={content} />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto mx-4 md:mx-10 lg:mx-52 transition-all duration-500">
        <div className="p-4 flex-1 overflow-y-auto">
          {content === 0 && <Users role={user.role}/>}
          {content === 2 && (
            <div className="text-center">
              <ProfileForm user={user} />
            </div>
          )}
          {content === 3 && (
            <div className="text-center">
              <News user={user} />              
            </div>
          )}
          {content === 1 && (
            <div className="text-center">
              <SponsorsTable/>
            </div>
          )}
          {content === 6 && (
            <div className="text-center">
              <SubscribersTable/>
            </div>
          )}
          {content === 7 && (
            <div className="text-center">
              <SponsorDetail user={user}/>
            </div>
          )}
          {content === 8 && (
            <div className="text-center">
              <CategoryManager user={user}/>
            </div>
          )}


          {/* Add other content based on 'content' state */}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
