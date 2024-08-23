import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const categories = [
  'Politics', 'Economy', 'Security', 'Borders', 'Sport', 'Libyan In Tunisia', 'Tunisian In Libya'
];

const Popular = () => {
  const [categoryArticles, setCategoryArticles] = useState({});
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const responses = await Promise.all(
          categories.map(category => 
            axios.get('http://localhost:8000/api/articles/latest', {
              params: { category: category }
            }).then(res => res.data.articles)
          )
        );

        const articlesData = {};
        categories.forEach((category, index) => {
          articlesData[category] = responses[index];
        });
        setCategoryArticles(articlesData);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section className="p-4 md:p-10 bg-gray-100">
      
      <div className="space-y-8 md:space-y-16">
        {categories.map(category => (
          <div 
            key={category} 
            className="group bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105"
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="p-4 md:p-6 bg-[#b80000] text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-center md:mb-4">
                {i18n.t(category)}
              </h3>
            </div>
            <div className="flex flex-col md:flex-row justify-between overflow-x-auto space-y-4 space md:space-y-0 md:space-x-6 p-4 md:p-6 bg-gray-50 group-hover:bg-gray-100 transition-all">
              {categoryArticles[category]?.slice(0, 3).map(article => (
                <Link 
                  key={article._id} 
                  to={`/singlepage/${article._id}`}
                  className="flex-none w-full md:w-72 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:scale-105"
                >
                  <img 
                    src={`http://localhost:8000/${article.image.replace("\\", "/")}`} 
                    alt={i18n.language === "ar" ? article.title.ar : article.title.en} 
                    className="w-full h-40 object-cover rounded-t-lg " 
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-700">
                      {i18n.language === "ar" ? article.title.ar : article.title.en}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(article.createdAt).toLocaleDateString(i18n.language)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="p-4 md:p-6 text-center bg-gray-200">
              <Link 
                to={`/category/${category}`} 
                className="inline-block text-gray-800 hover:text-gray-900 text-lg font-semibold"
              >
                {i18n.t('See All Articles')}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Popular;
