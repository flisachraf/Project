import React, { useState, useEffect } from 'react';

const ViewArticle = ({ article, closeViewModal }) => {
  const [fields, setFields] = useState({
    title: { en: '', ar: '' },
    mainParagraph: { en: '', ar: '' },
    subtitles: []
  });
  const [imagePreview, setImagePreview] = useState('');
  const [viewLanguage, setViewLanguage] = useState('ar');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setFields({
        title: article.title,
        mainParagraph: article.mainParagraph,
        subtitles: article.subtitles
      });
      setImagePreview(article.image || '');
      setLoading(false);
    };

    fetchArticle();
  }, [article]);

  const formatParagraphs = (text) => {
    return text.split('\n').map((para, index) => (
      <p key={index} className="text-base mb-4 leading-relaxed">{para}</p>
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div> {/* Add your loader styling here */}
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 bg-gray-100 rounded-lg shadow-lg"
    dir={viewLanguage === 'en' ? 'ltr' : 'rtl'}
>
      {/* Article Content */}
      <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md ">
      <button
          type="button"
          onClick={() => setViewLanguage(viewLanguage === 'en' ? 'ar' : 'en')}
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Switch to {viewLanguage === 'en' ? 'Arabic' : 'English'}
        </button>

        <h1 className="text-3xl font-semibold mb-4">{fields.title[viewLanguage]}</h1>

        
        {imagePreview && (
          <div className="mb-6">
            <img
              src={imagePreview}
              alt="Article Preview"
              className="w-full h-auto rounded-lg shadow-sm"
            />
          </div>
        )}

        <div className="mb-6">
          {formatParagraphs(fields.mainParagraph[viewLanguage])}
        </div>

        {fields.subtitles.map((subtitle, index) => (
          <div key={index} className="mb-6">
            <h4 className="text-xl font-semibold mb-2">{subtitle.subtitle[viewLanguage]}</h4>
            {formatParagraphs(subtitle.paragraph[viewLanguage])}
          </div>
        ))}

        <button
          type="button"
          onClick={closeViewModal}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewArticle;
