import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <Navbar user={user} />
        <div className="p-6">
          <h1 className="text-2xl font-bold">Your Profile 👤</h1>
          <div className="mt-6">
            <h3 className="text-xl font-medium">Personal Information</h3>
            <div className="bg-white shadow-md rounded-md p-4">
              {user ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="font-semibold">Name:</p>
                    <p className="text-gray-700">{user.name}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Email:</p>
                    <p className="text-gray-700">{user.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Joined:</p>
                    <p className="text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
