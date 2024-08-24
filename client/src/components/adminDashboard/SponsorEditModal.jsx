import React, { useState } from 'react';
import axios from 'axios';

const SponsorEditModal = ({ sponsor, onClose }) => {
  const [formData, setFormData] = useState({
    name: sponsor.name,
    oldPassword: '',
    newPassword: '',
    sponsoringFile: null
  });
  const token = localStorage.getItem('token')

  const handleFileChange = (e) => {
    setFormData({ ...formData, sponsoringFile: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('oldPassword', formData.oldPassword);
    data.append('newPassword', formData.newPassword);
    if (formData.sponsoringFile) {
      data.append('sponsoringFile', formData.sponsoringFile);
    }

    try {
      await axios.put(`http://srv586727.hstgr.cloud:8000/api/sponsors/editSPonsor/${sponsor._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token')
        }
      });
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating sponsor:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Sponsor</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border border-gray-300 px-3 py-2 mb-3 rounded"
            required
          />

          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            placeholder="Current Password"
            className="border border-gray-300 px-3 py-2 mb-3 rounded"
          />
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            className="border border-gray-300 px-3 py-2 mb-3 rounded"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-3"
          />
          <h2>:Image size
            <br/>
            Height: 224 px (5.92 cm)
            <br/>
            Width: 1024 px (27.09 cm)
            <br/>
            Resolution: 150 ppp (minimum)</h2>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </form>
        <button
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SponsorEditModal;
