import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const DayNews = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [items, setIems] = useState([])
  useEffect(() => {
    axios.get("http://srv586727.hstgr.cloud:8000/api/articles/Day/News")
      .then(res => {
        console.log(res.data)
        const lastFourItems = res.data// Get the last 4 items
        console.log(lastFourItems)
        setIems(lastFourItems);
      })
      .catch(err => console.log(err))
  }, [])
  const titles = [
    'Breaking News: Major Event in City!',
    'Local Sports Team Wins Championship!',
    'New Technology Revolutionizing Industry!',
  ];

  return (
    <div className="relative bg-gray-100 p-4 overflow-hidden">
      {/* Label for the news ticker */}
      <div
        className={`absolute inset-0 flex items-center ${isArabic ? 'justify-start' : 'justify-start'} z-10`}
      >
        <span className="text-white px-4 py-2 rounded-lg font-semibold"
          style={{ backgroundColor: '#B80000' }}>
          {isArabic ? 'أخبار اليوم' : 'Day News'}
        </span>
      </div>

      {/* Marquee animation container */}
      <div className="relative overflow-hidden whitespace-nowrap bg-gray-200 py-2">
        <div
          className={`flex ${isArabic ? 'animate-marqueeLtoR' : 'animate-marqueeRtoL'}`}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 mx-2 text-lg font-semibold  "
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {isArabic ? item.title.ar : item.title.en}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayNews;
