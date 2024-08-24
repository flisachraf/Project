import React, { useState } from 'react';
import axios from 'axios';

function ProfileForm({ user }) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.image ? `http://srv586727.hstgr.cloud:8000/${user.image.replace("\\", "/")}` : '');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem("token");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!image) {
      setError('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.put('http://srv586727.hstgr.cloud:8000/api/updateProfileImage', formData, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Profile image updated:', response.data);

      if (response.data && response.data.image) {
        const updatedFilePath = response.data.image.replace(/\\/g, '/'); // Normalize file path
        setImagePreview(`http://srv586727.hstgr.cloud:8000/uploads/${updatedFilePath}`);
        setSuccess('Profile image updated successfully.');
      }
    } catch (error) {
      setError('Error updating profile image.');
      console.error('Error updating profile image:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-9">
      {/* Header */}
      <div className="bg-gray-800 text-white py-4 text-center">
        <h2 className="text-2xl font-bold">Update Profile Image</h2>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center items-center p-4">
        <label htmlFor="image" className="relative cursor-pointer">
          <div className="rounded-full overflow-hidden border-4 border-white w-40 h-40">
            <img
              src={imagePreview || 'http://srv586727.hstgr.cloud:8000/default-image.png'} // Fallback image
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </label>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 pb-4">
        {/* Submit button */}
        <div className="flex flex-col items-center">
          {success && <div className="text-green-500 mb-4">{success}</div>}
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Update Image
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
