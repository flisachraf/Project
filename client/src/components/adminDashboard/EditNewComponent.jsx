import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResizableTextarea from '../ResizableTextarea'; // Adjust the import path as necessary

const EditArticle = ({ user, article, closeEditModal }) => {
  const [fields, setFields] = useState({
    title: { en: '', ar: '' },
    mainParagraph: { en: '', ar: '' },
    subtitles: []
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [category, setCategory] = useState('Politics');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [viewLanguage, setViewLanguage] = useState('en');
  const token = localStorage.getItem('token');
  const Categories = ['Politics', 'Economy', 'Security','Borders','Sport','Libyan In Tunisia','Tunisian In Libya']
  const [isUrgent, setIsUrgent] = useState(false);
  const [isNews,setIsNews]= useState(false);
 
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setFields({
          title: article.title,
          mainParagraph: article.mainParagraph,
          subtitles: article.subtitles
        });
        setCategory(article.category);
        setImagePreview(article.image || '');
        setIsUrgent(article.isUrgent || false); // Initialize urgency status
        setIsNews(article.isNews || false);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch article data.');
      }
    };

    fetchArticle();
  }, [article]);

  const handleFieldTranslate = async (textPath, language) => {
    try {
      const field = textPath.split('.').reduce((acc, part) => acc[part], fields);
      const response = await axios.post('http://srv586727.hstgr.cloud:8000/api/chat', {
        messages: field[language],
        language
      });
      const translatedText = response.data.translateText;
      const updatedFields = { ...fields };
      const pathArray = textPath.split('.');
      let currentField = updatedFields;

      for (let i = 0; i < pathArray.length - 1; i++) {
        currentField = currentField[pathArray[i]];
      }

      // Set the translation to the English field when translating from Arabic
      if (language === 'ar') {
        currentField[pathArray[pathArray.length - 1]].en = translatedText;
      } else {
        currentField[pathArray[pathArray.length - 1]].ar = translatedText;
      }

      setFields(updatedFields);
    } catch (error) {
      console.error('Error translating text:', error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('title', JSON.stringify(fields.title));
    formData.append('mainParagraph', JSON.stringify(fields.mainParagraph));
    formData.append('subtitles', JSON.stringify(fields.subtitles));
    formData.append('category', category);
    formData.append('creator', user._id);
    formData.append('isUrgent', isUrgent);
    formData.append("isNews",isNews)


    if (image) {
      formData.append('image', image);
    }
    console.log(fields.subtitles)
    try {
      await axios.put(`http://srv586727.hstgr.cloud:8000/api/articles/edit/${article._id}`, formData, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data'
        }
      });
      closeEditModal();
    } catch (err) {
      setError('Failed to update article. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubtitleChange = (index, field, language, value) => {
    const newSubtitles = [...fields.subtitles];
    newSubtitles[index][field][language] = value;
    setFields({ ...fields, subtitles: newSubtitles });
  };

  const handleAddSubtitle = () => {
    setFields(prevState => ({
      ...prevState,
      subtitles: [
        ...prevState.subtitles,
        { subtitle: { ar: '', en: '' }, paragraph: { ar: '', en: '' } }
      ]
    }));
  };

  const handleRemoveSubtitle = (index) => {
    setFields(prevState => ({
      ...prevState,
      subtitles: prevState.subtitles.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const formatParagraphs = (text) => {
    return text.split('\n').map((para, index) => (
      <p key={index} className="text-lg mb-4">{para}</p>
    ));
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Edit Article Form */}
      <div className="w-full lg:w-1/2 p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-start">
            <div className="mb-4 w-1/3">
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              >
                {Categories.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label className="inline-flex items-center">
                <span className="ml-2 text-gray-700">Urgent</span>
              </label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={isNews}
                onChange={(e) => setIsNews(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label className="inline-flex items-center">
                <span className="ml-2 text-gray-700">News</span>
              </label>
            </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 max-h-48 w-full object-cover" />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Title (Arabic)</label>
            <input
              type="text"
              value={fields.title.ar}
              onChange={(e) => setFields({ ...fields, title: { ...fields.title, ar: e.target.value } })}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <button
              type="button"
              onClick={() => handleFieldTranslate('title', 'ar')}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Translate to English
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Title (English)</label>
            <input
              type="text"
              value={fields.title.en}
              onChange={(e) => setFields({ ...fields, title: { ...fields.title, en: e.target.value } })}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <button
              type="button"
              onClick={() => handleFieldTranslate('title', 'en')}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Translate to Arabic
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Main Paragraph (Arabic)</label>
            <ResizableTextarea
              value={fields.mainParagraph.ar}
              onChange={(e) => setFields({ ...fields, mainParagraph: { ...fields.mainParagraph, ar: e.target.value } })}
            />
            <button
              type="button"
              onClick={() => handleFieldTranslate('mainParagraph', 'ar')}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Translate to English
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Main Paragraph (English)</label>
            <ResizableTextarea
              value={fields.mainParagraph.en}
              onChange={(e) => setFields({ ...fields, mainParagraph: { ...fields.mainParagraph, en: e.target.value } })}
            />
            
          </div>

          {fields.subtitles.map((subtitle, index) => (
            <div key={index} className="mb-4 border border-gray-300 p-4 rounded">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Subtitle {index + 1}</h2>
                <button
                  type="button"
                  onClick={() => handleRemoveSubtitle(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Subtitle (Arabic)</label>
                <input
                  type="text"
                  value={subtitle.subtitle.ar}
                  onChange={(e) => handleSubtitleChange(index, 'subtitle', 'ar', e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => handleFieldTranslate(`subtitles.${index}.subtitle`, 'ar')}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Translate to English
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Subtitle (English)</label>
                <input
                  type="text"
                  value={subtitle.subtitle.en}
                  onChange={(e) => handleSubtitleChange(index, 'subtitle', 'en', e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Paragraph (Arabic)</label>
                <ResizableTextarea
                  value={subtitle.paragraph.ar}
                  onChange={(e) => handleSubtitleChange(index, 'paragraph', 'ar', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => handleFieldTranslate(`subtitles.${index}.paragraph`, 'ar')}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Translate to English
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Paragraph (English)</label>
                <ResizableTextarea
                  value={subtitle.paragraph.en}
                  onChange={(e) => handleSubtitleChange(index, 'paragraph', 'en', e.target.value)}
                />
                
              </div>
            </div>
          ))}

          <div className="mb-4">
            <button
              type="button"
              onClick={handleAddSubtitle}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Subtitle
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {submitting ? 'Submitting...' : 'Update Article'}
            </button>
          </div>
        </form>
      </div>
       {/* Live Preview */}
       <div className="w-full lg:w-1/2 p-4 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Live Preview</h2>
        <button
          type="button"
          onClick={() => setViewLanguage(viewLanguage === "en" ? "ar" : "en")}
          className="mb-4 px-4 py-2 bg-gray-300 rounded"
        >
          Switch to {viewLanguage === "en" ? "Arabic" : "English"}
        </button>

        <div
          className="p-4 border border-gray-300 rounded bg-white mb-4"
          style={{ textAlign: viewLanguage === "en" ? "left" : "right" }}
          dir={viewLanguage === "en" ? "ltr" : "rtl"}
        >
          <h3 className="text-2xl font-bold mb-2">
            {}
            {fields.title[viewLanguage]}
          </h3>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="my-4 w-full h-auto mx-auto"
            />
          )}
          {formatParagraphs(fields.mainParagraph[viewLanguage])}

          {fields.subtitles.map((subtitle, index) => (
            <div key={index} className="mt-4">
              <h4 className="text-lg font-semibold mb-2">
                {subtitle.subtitle[viewLanguage]}
              </h4>
              {formatParagraphs(subtitle.paragraph[viewLanguage])}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
