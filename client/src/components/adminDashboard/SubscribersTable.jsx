// src/Components/SubscribersTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const itemsPerPage = 5; // Number of items per page

const SubscribersTable = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/subscriber/allSubscribers',{headers: {
            'Authorization': token}}); // Replace with your API endpoint
        setSubscribers(response.data);
      } catch (error) {
        console.error('Error fetching subscribers:', error);
      }
    };

    fetchSubscribers();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/subscriber/deleteSubscriber/${id}`,{headers: {
        'Authorization': token}}); // Replace with your API endpoint
      setSubscribers(subscribers.filter(subscriber => subscriber._id !== id));
    } catch (error) {
      console.error('Error removing subscriber:', error);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(subscribers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubscribers = subscribers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h1 className='text-2xl'>Subscribers</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentSubscribers.map(subscriber => (
              <tr key={subscriber.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subscriber.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                  <button
                    onClick={() => handleRemove(subscriber._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-3 bg-gray-50 flex justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribersTable;
