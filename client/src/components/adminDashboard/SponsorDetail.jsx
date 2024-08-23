import React, { useEffect, useState } from 'react';
import SponsorEditModal from './SponsorEditModal';
import axios from 'axios';

const SponsorDetail = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [sponsor, setSponsor] = useState({});
  const token = localStorage.getItem('token');

  const fetchSponsor =()=>{axios.get(`http://localhost:8000/api/sponsors/onesponsor/${user.id}`, {
    headers: { Authorization: token }
  })
  .then(res => {
    setSponsor(res.data);
  })
  .catch(err => console.log(err));
}
  useEffect(() => {
    
  fetchSponsor();
}, [token, user.id]);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchSponsor();
  };

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Sponsor Details</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col mb-4">
          <strong className="text-gray-700 text-lg">Name:</strong>
          <p className="text-gray-900">{sponsor.name}</p>
        </div>
        <div className="flex flex-col mb-4">
          <strong className="text-gray-700 text-lg">Email:</strong>
          <p className="text-gray-900">{sponsor.email}</p>
        </div>
        {sponsor.sponsoringFile && (
          <div className="flex flex-col mb-4">
            <strong className="text-gray-700 text-lg">Sponsoring File:</strong>
            <img src={sponsor.sponsoringFile} alt="Sponsoring File" className="w-full h-40 object-cover rounded-lg mt-2" />
          </div>
        )}
        <button
          onClick={handleEditClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Edit
        </button>
      </div>

      {showModal && (
        <SponsorEditModal
          sponsor={sponsor}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default SponsorDetail;
