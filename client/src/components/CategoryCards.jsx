import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CategoryCards = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const articlesPerPage = 9;
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/articles/news/category', {
          params: {
            category,
            page: currentPage,
            limit: articlesPerPage,
          },
        });
        setArticles(response.data.articles);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [category, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [sponsors, setSponsors] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/sponsors/allActiveSponsors')
      .then((res) => {
        setSponsors(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sponsors.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [sponsors.length]);

  const isRTL = i18n.dir() === 'rtl';

  return (
    <div className="container mx-auto p-6 bg-gradient-to-b from-gray-100 to-gray-200 mt-4 rounded-xl shadow-lg">
      <div>
        <h2 className="lg:text-5xl sm:text-2xl font-bold mb-10 text-gray-800 text-center uppercase tracking-widest border-b-4 border-custom-dark-blue pb-2 animate-borderPulse"
        style={{ letterSpacing: 'normal', wordSpacing: 'normal' }}>
          {t(category)}
        </h2>
        <div className="w-full lg:w-2/3 mx-auto mb-10">
          <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(${isRTL ? currentSlide * 100 : -currentSlide * 100}%)`,
              }}
            >
              {sponsors.map((src, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img
                    src={`http://localhost:8000/${src.replace("\\", "/")}`}
                    alt={`Slide ${index}`}
                    className="w-full  object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link to={`/singlepage/${article._id}`} key={article._id}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col h-full tracking-widest border-b-4 border-custom-dark-blue pb-2 animate-borderPulse">
              {category === 'VideoGraphs' ? (
                <div className="relative pb-56.25 h-0 mb-4">
                  <iframe
                    className="absolute inset-0 w-full h-full object-cover"
                    src={article.videoUrl}
                    frameBorder="0"
                    allowFullScreen
                    title={i18n.language === 'ar' ? article.title.ar : article.title.en}
                  ></iframe>
                </div>
              ) : (
                <img
                  src={article.image ? `http://localhost:8000/${article.image.replace("\\", "/")}` : ""}
                  alt={i18n.language === 'ar' ? article.title.ar : article.title.en}
                  className="w-full h-48 object-cover mb-4"
                />
              )}
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-semibold text-gray-800"
                  style={{ letterSpacing: 'normal', wordSpacing: 'normal' }}>
                  {i18n.language === 'ar' ? article.title.ar : article.title.en}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center mt-12 space-x-3">
        <button
          className={`px-5 py-3 border rounded-lg transition-all duration-200 ${currentPage === 1
              ? 'border-gray-300 text-gray-400 cursor-not-allowed'
              : 'border-blue-500 text-blue-500 hover:bg-blue-100 hover:border-blue-600'
            }`}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {t('previous')}
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`px-5 py-3 border rounded-lg transition-all duration-200 ${currentPage === index + 1
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-gray-400 text-gray-700 hover:bg-gray-100'
              }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`px-5 py-3 border rounded-lg transition-all duration-200 ${currentPage === totalPages
              ? 'border-gray-300 text-gray-400 cursor-not-allowed'
              : 'border-blue-500 text-blue-500 hover:bg-blue-100 hover:border-blue-600'
            }`}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
};

export default CategoryCards;
