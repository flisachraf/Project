import React, { useState } from 'react';

const ViewMediaItem = ({ mediaItem }) => {
  const [language, setLanguage] = useState('ar');

  const extractYouTubeID = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(u\/w\/)|(embed\/)|(watch\?v=))([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[7] : null;
  };

  const videoID = extractYouTubeID(mediaItem.videoUrl);

  const textDirection = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">View Media Item</h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <button
              type="button"
              className={`px-4 py-2 ${language === 'ar' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-l`}
              onClick={() => setLanguage('ar')}
            >
              Arabic
            </button>
            <button
              type="button"
              className={`px-4 py-2 ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-r`}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
          </div>
          <h4 className="text-lg font-bold mb-2" dir={textDirection}>{language === 'ar' ? mediaItem.title.ar : mediaItem.title.en}</h4>
          {mediaItem.category === 'Infographs' && mediaItem.image && (
            <img src={mediaItem.image} alt="Infograph Preview" className="w-full" />
          )}
          {mediaItem.category === 'VideoGraphs' && videoID && (
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${videoID}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMediaItem;
