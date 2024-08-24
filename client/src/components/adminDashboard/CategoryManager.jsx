// src/components/CategoryManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import CategoryEditModal from './CategoryEditModal';

// Ensure you call this method before rendering
Modal.setAppElement('#root');

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [token] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetchCategories();
    }
  }, [token]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://srv586727.hstgr.cloud:8000/api/categories/all');
      
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const openViewModal = (category) => {
    setSelectedCategory(category);
    setViewModalIsOpen(true);
  };

  const closeViewModal = () => {
    setViewModalIsOpen(false);
  };

  const openAddModal = () => {
    setSelectedCategory(null);
    setAddModalIsOpen(true);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

  const handleRemove = async (categoryId) => {
    try {
      await axios.delete(`http://srv586727.hstgr.cloud:8000/api/categories/deletCategory/${categoryId}`, {
        headers: { Authorization: token }
      });
      fetchCategories(); // Refresh categories list
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = () => {
    fetchCategories(); // Refresh categories list
    closeAddModal();
  };

  return (
    <div className="container mx-auto p-8">
      <button
        onClick={openAddModal}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md mb-6 focus:outline-none"
      >
        Add Category
      </button>

      <h2 className="text-3xl font-bold mb-6">Categories</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="py-3 px-6 text-center">Name</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {categories.map((category) => (
              <tr key={category._id} className="border-b border-gray-200 hover:bg-gray-50 text-center">
                <td className="py-4 px-6">{category.name}</td>
                <td className="py-4 px-6 flex gap-6 justify-center items-center">
                  <button
                    onClick={() => openViewModal(category)}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleRemove(category._id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Category Modal */}
      <Modal
        isOpen={viewModalIsOpen}
        onRequestClose={closeViewModal}
        className="modal w-full max-w-lg mx-auto my-8 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div>
          <h2 className="text-2xl font-semibold mb-4">{selectedCategory?.name}</h2>
          {/* Add additional details here if needed */}
          <button
            onClick={closeViewModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none"
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Add/Edit Category Modal */}
      {addModalIsOpen && (
        <CategoryEditModal
          category={selectedCategory}
          onClose={closeAddModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default CategoryManager;
