import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// Ensure you call this method before rendering
Modal.setAppElement('#root');

const SponsorsTable = () => {
  const [sponsors, setSponsors] = useState([]);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [sponsor, setSponsor] = useState({
    name: "",
    email: "",
    password: ""
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchSponsors();
    }
  }, [token]);

  const fetchSponsors = async () => {
    try {
      const res = await axios.get('http://srv586727.hstgr.cloud:8000/api/sponsors/allSponsors', {
        headers: { Authorization: token }
      });
      setSponsors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const openViewModal = (sponsor) => {
    setSelectedSponsor(sponsor);
    setViewModalIsOpen(true);
  };

  const closeViewModal = () => {
    setViewModalIsOpen(false);
  };

  const openAddModal = () => {
    setAddModalIsOpen(true);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
    setSponsor({
      name: "",
      email: "",
      password: ""
    });
  };

  const handleActivate = async (sponsorId) => {
    try {
      await axios.put(`http://srv586727.hstgr.cloud:8000/api/sponsors/activer/${sponsorId}`, {}, {
        headers: { Authorization: token }
      });
      fetchSponsors(); // Refresh sponsors list
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeactivate = async (sponsorId) => {
    try {
      await axios.put(`http://srv586727.hstgr.cloud:8000/api/sponsors/desactiver/${sponsorId}`, {}, {
        headers: { Authorization: token }
      });
      fetchSponsors(); // Refresh sponsors list
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (sponsorId) => {
    try {
      await axios.delete(`http://srv586727.hstgr.cloud:8000/api/sponsors/${sponsorId}`, {
        headers: { Authorization: token }
      });
      fetchSponsors(); // Refresh sponsors list
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSponsor = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const res = await axios.post('http://srv586727.hstgr.cloud:8000/api/sponsors/register', sponsor, {
        headers: { Authorization: token }
      });
      console.log(res);
      closeAddModal();
      fetchSponsors(); // Refresh sponsors list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <button
        onClick={openAddModal}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md mb-6 focus:outline-none"
      >
        Add Sponsor
      </button>

      <h2 className="text-3xl font-bold mb-6">Sponsors</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="py-3 px-6 text-center">Name</th>
              <th className="py-3 px-6 text-center">Email</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {sponsors.map((sponsor) => (
              <tr key={sponsor._id} className="border-b border-gray-200 hover:bg-gray-50 text-center">
                <td className="py-4 px-6">{sponsor.name}</td>
                <td className="py-4 px-6">{sponsor.email}</td>
                <td className="py-4 px-6 flex gap-6 justify-center items-center">
                  <button
                    onClick={() => openViewModal(sponsor)}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleRemove(sponsor._id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    Remove
                  </button>
                  {sponsor.status === "Active" ? (
                    <button
                      onClick={() => handleDeactivate(sponsor._id)}
                      className="text-yellow-500 hover:text-yellow-700 focus:outline-none"
                    >
                      Desactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleActivate(sponsor._id)}
                      className="text-green-500 hover:text-green-700 focus:outline-none"
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Sponsor Modal */}
      <Modal
        isOpen={viewModalIsOpen}
        onRequestClose={closeViewModal}
        className="modal w-full max-w-lg mx-auto my-8 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div>
          <h2 className="text-2xl font-semibold mb-4">{selectedSponsor?.name}</h2>
          <p className="text-gray-700 mb-4"><strong>Email:</strong> {selectedSponsor?.email}</p>
          {selectedSponsor?.sponsoringFile && (
            <div className="mb-4">
              <p>File:</p>
              <img src={selectedSponsor.sponsoringFile} alt="Sponsor File" className="mt-2 rounded-lg" />
            </div>
          )}
          <button
            onClick={closeViewModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none"
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Add Sponsor Modal */}
      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={closeAddModal}
        className="modal w-full max-w-lg mx-auto my-8 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add Sponsor</h2>
          <form onSubmit={handleAddSponsor} className="flex flex-col">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={sponsor.name}
              onChange={(e) => setSponsor({ ...sponsor, name: e.target.value })}
              className="border border-gray-300 px-3 py-2 mb-3 rounded focus:outline-none"
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={sponsor.email}
              onChange={(e) => setSponsor({ ...sponsor, email: e.target.value })}
              className="border border-gray-300 px-3 py-2 mb-3 rounded focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={sponsor.password}
              onChange={(e) => setSponsor({ ...sponsor, password: e.target.value })}
              className="border border-gray-300 px-3 py-2 mb-3 rounded focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none"
            >
              Submit
            </button>
          </form>
          <button
            onClick={closeAddModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mt-4 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SponsorsTable;
