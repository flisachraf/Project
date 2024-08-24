import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleList from './ArticleList';
import Filter from './Filter';

const ArticleDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [pendingArticles, setPendingArticles] = useState([]);
  const [confirmedArticles, setConfirmedArticles] = useState([]);
  const [filter, setFilter] = useState({ category: '', date: '' });
  const [view, setView] = useState('pending'); // Can be 'pending' or 'confirmed'
  const [categories, setCategories] = useState([]);
  const [dates, setDates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(4);

  const fetch = () => {
    axios.get("http://srv586727.hstgr.cloud:8000/api/articles/allNews")
      .then(res => {
        const articleList = res.data;
        setArticles(articleList);
        setPendingArticles(articleList.filter(article => article.status === "Pending"));
        setConfirmedArticles(articleList.filter(article => article.status === "confirmed"));

        // Extract unique categories
        const uniqueCategories = [...new Set(articleList.map(article => article.category))];
        setCategories(uniqueCategories);

        // Extract unique dates
        const uniqueDates = [...new Set(articleList.map(article => new Date(article.createdAt).toDateString()))];
        setDates(uniqueDates);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredArticles = (view === 'pending' ? pendingArticles : confirmedArticles)
    .filter(article => {
      const matchesCategory = filter.category ? article.category === filter.category : true;
      const matchesDate = filter.date ? new Date(article.createdAt).toDateString() === new Date(filter.date).toDateString() : true;
      return matchesCategory && matchesDate;
    });

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  return (
    <div className="p-4 sm:p-4 lg:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <button
          onClick={() => setView('pending')}
          className={`px-4 py-2 rounded-lg text-sm sm:text-base ${view === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Pending Articles
        </button>
        <button
          onClick={() => setView('confirmed')}
          className={`px-4 py-2 rounded-lg text-sm sm:text-base ${view === 'confirmed' ? 'bg-blue-600 text-white' : 'bg-gray-200'} sm:ml-2 mt-2 sm:mt-0`}
        >
          Confirmed Articles
        </button>
      </div>
      <Filter
        onFilterChange={handleFilterChange}
        categories={categories}
        dates={dates}
      />
      <ArticleList
        articles={currentArticles}
        view={view}
        onPaginationChange={handlePaginationChange}
        currentPage={currentPage}
        totalPages={totalPages}
        fetchArticles={fetch}
      />
    </div>
  );
};

export default ArticleDashboard;
