import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateArticleComponent from '../CreateArticleComponent';
import Modal from 'react-modal';
import EditArticle from './EditNewComponent';
import ViewArticle from './ViewNew';
import ArticleListEdit from './ArticleListEdit'  // Assuming you have an ArticleList component
import Filter from './Filter'; // Assuming you have a Filter component
import AddMediaItem from './AddMediaItem';
import ViewMediaItem from './ViewMediaItem';

Modal.setAppElement('#root');

const MyNews = ({ user }) => {
  const [myPendingNews, setMyPendingNews] = useState([]);
  const [myConfirmedNews, setMyConfirmedNews] = useState([]);
  const [filter, setFilter] = useState({ category: '', date: '' });
  const [view, setView] = useState('pending');
  const [categories, setCategories] = useState([]);
  const [dates, setDates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(4);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState({});
  const token = localStorage.getItem('token');
  const [addMediaIsOpen, setAddMediaIsOpen]=useState(false)

  const fetchMyNews = async () => {
    if (!user || !user._id) {
      console.error("User or user._id is undefined");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/api/articles/myNews/${user._id}`, {
        headers: { Authorization: token }
      });
      const myNews = response.data;

      const pendingNews = myNews.filter(news => news.status === 'Pending');
      const confirmedNews = myNews.filter(news => news.status === 'confirmed');

      setMyPendingNews(pendingNews);
      setMyConfirmedNews(confirmedNews);

      // Extract unique categories and dates
      const uniqueCategories = [...new Set(myNews.map(news => news.category))];
      const uniqueDates = [...new Set(myNews.map(news => new Date(news.createdAt).toDateString()))];

      setCategories(uniqueCategories);
      setDates(uniqueDates);
    } catch (error) {
      console.error('Error fetching my news:', error);
    }
  };

  useEffect(() => {
    fetchMyNews();
  }, [user]);

  const handleRemoveNews = async (newsId) => {
    try {
      await axios.delete(`http://localhost:8000/api/articles/${newsId}`, { headers: { Authorization: token } });
      fetchMyNews();
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredNews = (view === 'pending' ? myPendingNews : myConfirmedNews)
    .filter(news => {
      const matchesCategory = filter.category ? news.category === filter.category : true;
      const matchesDate = filter.date ? new Date(news.createdAt).toDateString() === new Date(filter.date).toDateString() : true;
      return matchesCategory && matchesDate;
    });
const closeAddMedia =()=>{
  fetchMyNews()
  setAddMediaIsOpen(false) 
}
  // Pagination logic
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  return (
    <div className="p-4 sm:p-4 lg:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <button
          onClick={() => setView('pending')}
          className={`px-4 py-2 rounded-lg text-sm sm:text-base ${view === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Pending News
        </button>
        <button
          onClick={() => setView('confirmed')}
          className={`px-4 py-2 rounded-lg text-sm sm:text-base ${view === 'confirmed' ? 'bg-blue-600 text-white' : 'bg-gray-200'} sm:ml-2 mt-2 sm:mt-0`}
        >
          Confirmed News
        </button>
        <div className="flex justify-end mb-4 gap-3">
        <button
          className="py-2 px-4 bg-green-500 text-white rounded-lg focus:outline-none"
          onClick={() => setAddModalIsOpen(true)}
        >
          Add New
        </button>
        <button
          className="py-2 px-4 bg-green-500 text-white rounded-lg focus:outline-none"
          onClick={() => setAddMediaIsOpen(true)}
        >
          Add Info/Video-graphs
        </button>
      </div>
      </div>
      <Filter
        onFilterChange={handleFilterChange}
        categories={categories}
        dates={dates}
      />
      <ArticleListEdit
        articles={currentNews}
        view={view}
        onPaginationChange={handlePaginationChange}
        currentPage={currentPage}
        totalPages={totalPages}
        fetchArticles={fetchMyNews}
        handleRemoveNews={handleRemoveNews}
        openViewModal={setSelectedNews}
        openEditModal={setSelectedNews}
      />
      

      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={() => {
          setAddModalIsOpen(false);
          fetchMyNews();
        }}
      >
        <CreateArticleComponent user={user} />
      </Modal>
      <Modal
        isOpen={addMediaIsOpen}
        onRequestClose={() => {
          setAddMediaIsOpen(false);
          fetchMyNews();
        }}
      >
        <AddMediaItem user={user} closeAddMedia={closeAddMedia} />
      </Modal>
      
      
    </div>
  );
};

export default MyNews;
