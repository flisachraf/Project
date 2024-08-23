import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import Modal from 'react-modal';
import ViewArticle from './ViewNew';
import EditArticle from './EditNewComponent'; // Make sure this import path is correct
import ViewMediaItem from './ViewMediaItem';

Modal.setAppElement('#root');

const ArticleList = ({ articles, view, onPaginationChange, currentPage, totalPages, fetchArticles, showEdit = false }) => {
  const token = localStorage.getItem('token');
  const { user } = useAuth();
  const [viewNews, setViewNews] = useState(false);
  const [editNews, setEditNews] = useState(false);
  const [selectedNew, setSelectedNew] = useState({});

  const openViewModal = () => setViewNews(true);
  const closeViewModal = () => setViewNews(false);
  const openEditModalHandler = () => setEditNews(true);
  const closeEditModal = () => {
    setEditNews(false);
    fetchArticles(); // Fetch articles again to get updated list after edit
  };

  // Confirm an article
  const confirm = (id) => {
    axios.put(`http://localhost:8000/api/articles/confirmNews/${id}`, {}, {
      headers: { Authorization: token }
    })
      .then(() => fetchArticles())
      .catch(err => console.log(err));
  };

  // Remove an article
  const remove = (id) => {
    axios.delete(`http://localhost:8000/api/articles/delete/${id}`, {
      headers: { Authorization: token }
    })
      .then(() => fetchArticles())
      .catch(err => console.log(err));
  };

  return (
    <div className="p-4 lg:p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
      <ul className="space-y-2 md:space-y-6">
        {articles.map(article => article._id ? (
          <li key={article._id} className={`relative p-4 sm:p-6 border border-gray-300 rounded-lg shadow-md transition-transform transform hover:translate-y-1 ${article.isUrgent ? 'bg-red-100 border-red-300' : 'bg-gray-100'}`}>
            {article.isUrgent && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                Urgent
              </div>
            )}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{article.title.ar}</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-1">
              <span className="font-medium text-gray-900">Category:</span> {article.category}
            </p>
            <p className="text-sm sm:text-base text-gray-700 mb-1">
              <span className="font-medium text-gray-900">Date:</span> {new Date(article.createdAt).toDateString()}
            </p>
            <p className="text-sm sm:text-base text-gray-700 mb-1">
              <span className="font-medium text-gray-900">Creator:</span> <span className="font-medium text-gray-900">{article.creator?.role || ''}</span> {article.creator?.username || 'Unknown'}
            </p>
            {view === 'confirmed' && (
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                <span className="font-medium text-gray-900">Publisher:</span> <span className="font-medium text-gray-900">{article.publisher?.role || ''}</span> {article.publisher?.username || 'Unknown'}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
                onClick={() => {
                  openViewModal();
                  setSelectedNew(article);
                }}
              >
                View
              </button>
              {view === 'pending' && (
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-300"
                  onClick={() => confirm(article._id)}
                >
                  Confirm
                </button>
              )}
              {(view === 'pending' || user.role === 'super admin' || user._id === article.publisher?._id) && (
                <>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-300"
                    onClick={() => remove(article._id)}
                  >
                    Remove
                  </button>
                  {showEdit && ( // Conditionally render the edit button
                    <button
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition duration-300"
                      onClick={() => {
                        setSelectedNew(article);
                        openEditModalHandler(); // Open edit modal
                      }}
                    >
                      Edit
                    </button>
                  )}
                </>
              )}
            </div>
          </li>
        ) : (
          <li key={article._id || Math.random()} className="p-4 sm:p-6 border border-gray-300 rounded-lg shadow-md bg-gray-100">
            <p className="text-red-500">Article data is missing</p>
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
        <button
          onClick={() => onPaginationChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium mt-2 sm:mt-0">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => onPaginationChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* View Article Modal */}
      {/* <Modal
        isOpen={viewNews}
        onRequestClose={closeViewModal}
      >
        <ViewArticle article={selectedNew} closeViewModal={closeViewModal} />
      </Modal> */}
      <Modal
        isOpen={viewNews}
        onRequestClose={closeViewModal}
      > {selectedNew.category === "Infographs" |selectedNew.category==="VideoGraphs" ? <ViewMediaItem mediaItem={selectedNew} />:<ViewArticle article={selectedNew} closeViewModal={closeViewModal} />}
        
      </Modal>

      {/* Edit Article Modal */}
      <Modal
        isOpen={editNews}
        onRequestClose={closeEditModal}
      >
        <EditArticle article={selectedNew} closeEditModal={closeEditModal} />
      </Modal>
      
    </div>
  );
};

export default ArticleList;
