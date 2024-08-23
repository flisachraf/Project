import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './urgent.css'; // Ensure Tailwind CSS is imported correctly
import { useTranslation } from 'react-i18next';

const UrgentNews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionState, setTransitionState] = useState('enter');
  const [newsList, setNewsList] = useState([]);
  const { i18n } = useTranslation();

  useEffect(() => {
    axios.get("http://localhost:8000/api/articles/urgent/News")
      .then(res => {
        const lastFourItems = res.data.slice(-4).reverse(); // Get the last 4 items
        setNewsList(lastFourItems);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (newsList.length === 0) return; // Avoid setting up interval if there are no news items

    const interval = setInterval(() => {
      setTransitionState('exit');
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % newsList.length);
        setTransitionState('enter');
      }, 600); // Duration of the animation
    }, 8000); // Interval to change news

    return () => clearInterval(interval);
  }, [newsList]);

  return (
    <div className="relative flex items-center bg-gray-100 p-4 rounded-lg shadow-md h-20 m-5 w-full max-w-9xl mx-auto">
      <div className="absolute inset-0 flex items-center gap-5  p-4 rounded-lg shadow-md" style={{ backgroundColor: 'rgb(184, 0, 0)'}}>
        <div className={`w-1/12 bg-gradient-to-b from-gray-100 to-white text-red text-center flex items-center justify-center font-bold text-lg ${i18n.language==='ar' ?'rounded-l-lg':'rounded-r-lg'} `}>
          <span>{i18n.t('Breaking')}</span>
        </div>
        <div className="flex-1 pl-4 overflow-hidden">
          {newsList.length > 0 ? (
            <div
              className={`transition-transform duration-700 ${transitionState === 'enter' ? 'animate-slide-in' : 'animate-slide-out'}`}
            >
              <p className="text-2xl text-white text-center">{i18n.language==='ar' ?newsList[currentIndex].title.ar :newsList[currentIndex].title.en }</p>
            </div>
          ) : (
            <p className="text-2xl text-white text-center">No news available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UrgentNews;
