import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = ({ role }) => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showAdminOrEditor, setShowAdminOrEditor] = useState(true);
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        
        axios.get('http://localhost:8000/api/all', {
            headers: { Authorization: token }
        })
        .then((res) => {
            // Filter users based on role
            setUsers(res.data);
            filterUsers(res.data, showAdminOrEditor);
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
        });
    }, [role, token, showAdminOrEditor]);

    const filterUsers = (users, showAdminOrEditor) => {
        const filtered = users.filter(user => {
            if (showAdminOrEditor) {
                return user.role === 'admin' || user.role === 'editor';
            } else {
                return !user.role || user.role === '';
            }
        });
        setFilteredUsers(filtered);
    };

    const handleRemove = (id) => {
        axios.delete(`http://localhost:8000/api/${id}`, {
            headers: { Authorization: token }
        })
        .then(() => {
            setUsers(users.filter(user => user._id !== id));
            filterUsers(users.filter(user => user._id !== id), showAdminOrEditor);
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
        });
    };

    const handleRoleChange = (id, newRole) => {
        axios.patch(`http://localhost:8000/api/${id}`, { role: newRole }, {
            headers: { Authorization: token }
        })
        .then(() => {
            // Update the user role locally
            setUsers(users.map(user => user._id === id ? { ...user, role: newRole } : user));
            filterUsers(users.map(user => user._id === id ? { ...user, role: newRole } : user), showAdminOrEditor);
        })
        .catch((error) => {
            console.error('Error updating user role:', error);
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl text-center font-bold mb-4">Users</h2>
            <div className="mb-4 text-center">
                <button
                    onClick={() => setShowAdminOrEditor(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mx-2"
                >
                    Show Admin & Editor
                </button>
                <button
                    onClick={() => setShowAdminOrEditor(false)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mx-2"
                >
                    Show Users Without Role
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700 text-center">
                        <tr>
                            <th className="py-3 px-4 border-b border-gray-300">Username</th>
                            <th className="py-3 px-4 border-b border-gray-300">Email</th>
                            <th className="py-3 px-4 border-b border-gray-300">Role</th>
                            <th className="py-3 px-4 border-b border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="text-gray-700 text-center">
                                <td className="py-3 px-4 border-b border-gray-300">{user.username}</td>
                                <td className="py-3 px-4 border-b border-gray-300">{user.email}</td>
                                <td className="py-3 px-4 border-b border-gray-300">{user.role}</td>

                                <td className="py-3 px-4 border-b border-gray-300">
                                    <button
                                        onClick={() => handleRemove(user._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mx-1"
                                    >
                                        Remove
                                    </button>
                                    {!user.role && (
                                        <>
                                            <button
                                                onClick={() => handleRoleChange(user._id, 'admin')}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mx-1"
                                            >
                                                Set Admin
                                            </button>
                                            <button
                                                onClick={() => handleRoleChange(user._id, 'editor')}
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mx-1"
                                            >
                                                Set Editor
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
