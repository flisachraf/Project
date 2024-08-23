// src/components/CategoryEditModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

// Ensure you call this method before rendering
Modal.setAppElement('#root');

const CategoryEditModal = ({ category, onClose, onSave }) => {
  const [formData, setFormData] = useState({ name: '' });
  const [token] = useState(localStorage.getItem('token'));


  useEffect(() => {
    setFormData(category || { name: '' });
  }, [category]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (category?._id) {
        await axios.put(`http://localhost:8000/api/categories/${category._id}`, formData);
      } else {
        await axios.post('http://localhost:8000/api/categories/addCategory', formData,{
          headers: { Authorization: token }
        });
      }
      onSave();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className="modal w-full max-w-lg mx-auto my-8 bg-white p-6 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-semibold mb-4">{category?._id ? 'Edit Category' : 'Add Category'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 mb-3 rounded focus:outline-none"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none"
        >
          {category?._id ? 'Update Category' : 'Add Category'}
        </button>
      </form>
      <button
        onClick={onClose}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mt-4 focus:outline-none"
      >
        Cancel
      </button>
    </Modal>
  );
};

export default CategoryEditModal;
