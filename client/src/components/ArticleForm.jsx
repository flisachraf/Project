import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { htmlToText } from 'html-to-text';

function ArticleForm() {
  const [title, setTitle] = useState({ ar: "", en: "" });
  const [contentArabic, setContentArabic] = useState('');
  const [contentEnglish, setContentEnglish] = useState('');
  const [category, setCategory] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const translateTitle =  (message) => {
    console.log(message)
  
      axios.post('http://localhost:8000/api/chat', {
        messages: message,
      })
      .then (res=>{console.log(res.data.translateText)
      setTitle({ ...title, en:res.data.translateText});})
    .catch (error => {
      console.error('Error translating title:', error)});
    
  };

  const translateContent =  (content) => {
    
      console.log(content)
      const plainTextContent = htmlToText(content, { ignoreImage: true, ignoreHref: true });
      console.log(plainTextContent)
      axios.post('http://localhost:8000/api/chat', { messages: content })
        .then(response=>{
          console.log(response.data.translateText)
          setContentEnglish(response.data.translateText)
          })
        .catch (error=>{
      console.error('Error translating content:', error);
      setError('Error translating content.');
    }) 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newArticle = {
      title,
      content: {
        arabic: contentArabic,
        english: contentEnglish,
      },
      category,
      isUrgent,
      isConfirmed,
      media: {
        images: [],
        videos: [],
      },
    };
    console.log("*********",newArticle)

    try {
      await axios.post('http://localhost:5000/api/articles', newArticle);
      setMessage('Article saved successfully!');
      setError('');
      // Reset form fields
      setTitle({ ar: "", en: "" });
      setContentArabic('');
      setContentEnglish('');
      setCategory('');
      setIsUrgent(false);
      setIsConfirmed(false);
    } catch (error) {
      setError('Error saving article.');
      setMessage('');
    }
  };

  const module1 = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': '1' }, { 'header': '2' }, { 'header': [3, 4, 5, 6] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      [{ 'direction': 'rtl' }],
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Create New</h1>

        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-300 text-green-800 rounded-lg shadow-md">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-800 rounded-lg shadow-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="titleAr" className="block text-gray-800 font-medium mb-2 text-lg">Title (ar)</label>
            <input
              type="text"
              id="titleAr"
              value={title.ar}
              onChange={(e) => setTitle({ ...title, ar: e.target.value })}
              required
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            />
          </div>
          <button 
            type="button"
            className="text-blue-500 mt-2 block"
            onClick={() => translateTitle(title.ar)}
          >
            Translate Title
          </button>
          <div>
            <label htmlFor="titleEn" className="block text-gray-800 font-medium mb-2 text-lg">Title (en)</label>
            <input
              type="text"
              id="titleEn"
              value={title.en}
              onChange={(e) => setTitle({ ...title, en: e.target.value })}
              required
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              dir="ltr"
            />
          </div>
          <div>
            <label htmlFor="contentArabic" className="block text-gray-800 font-medium mb-2 text-lg text-center">Arabic Content</label>
            <ReactQuill
              value={contentArabic}
              onChange={setContentArabic}
              modules={module1}
              className="border border-gray-300 rounded-lg shadow-sm mb-11"
              placeholder="Write Arabic content here..."
              style={{ direction: 'rtl' }}
            />
          </div>
          <button
            type="button"
            className="text-blue-500 mt-2 block"
            onClick={() => translateContent(contentArabic)}
          >
            Translate Content
          </button>
          <div>
            <label htmlFor="contentEnglish" className="block text-gray-800 font-medium mb-2 text-lg text-center">English Content</label>
            <ReactQuill
              value={contentEnglish}
              onChange={setContentEnglish}
              modules={module1}
              className="border border-gray-300 rounded-lg shadow-sm mb-11"
              placeholder="Write English content here..."
              style={{ direction: 'ltr' }} // Ensure left-to-right text direction

            />
          </div>
         
          <div>
            <label htmlFor="category" className="block text-gray-800 font-medium mb-2 text-lg">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            />
          </div>

          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isUrgent"
                checked={isUrgent}
                onChange={() => setIsUrgent(!isUrgent)}
                className="h-6 w-6 text-blue-600 border-gray-300 rounded-lg focus:ring-blue-500"
              />
              <label htmlFor="isUrgent" className="ml-3 text-gray-700 text-lg">Urgent</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isConfirmed"
                checked={isConfirmed}
                onChange={() => setIsConfirmed(!isConfirmed)}
                className="h-6 w-6 text-blue-600 border-gray-300 rounded-lg focus:ring-blue-500"
              />
              <label htmlFor="isConfirmed" className="ml-3 text-gray-700 text-lg">Confirmed</label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ArticleForm;
