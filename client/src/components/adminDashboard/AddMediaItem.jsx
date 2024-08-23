import axios from 'axios';
import React, { useState } from 'react';

const AddMediaItem = ({ user, closeAddMedia }) => {
  const [type, setType] = useState('Infographs'); // 'Infographs' or 'VideoGraphs'
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [image, setImage] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [language, setLanguage] = useState('ar'); // Default language is Arabic
  const token = localStorage.getItem("token");

  // Handle file input for image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(file); // Use file object
      reader.readAsDataURL(file);
    }
  };

  // Translate text from Arabic to English
  const translateTextWithLibreTranslate = async (text) => {
    try {
      const response = await axios.post("http://localhost:8000/api/chat", {
        messages: text,
      });
      const translatedText = response.data.translateText;
      setTitleEn(translatedText);
    } catch (error) {
      console.error(
        "Error translating text:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Function to extract YouTube video ID from URL
  const extractYouTubeID = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(u\/w\/)|(embed\/)|(watch\?v=))([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[7] : null;
  };

  const videoID = extractYouTubeID(videoUrl);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", JSON.stringify({ en: titleEn, ar: titleAr }));
    formData.append("category", type);
    formData.append("creator", user._id);
    formData.append("videoUrl", videoUrl);

    if (image) {
      formData.append("image", image); // Append file object directly
    }

    try {
      await axios.post("http://localhost:8000/api/articles/createInfoVideo", formData, {
        headers: {
          Authorization: token, // Ensure Bearer token prefix
          "Content-Type": "multipart/form-data",
        },
      });
      
      closeAddMedia();
      // Handle success (e.g., show a success message or redirect)
    } catch (err) {
      console.error("Failed to create media item. Please try again.", err);
      // Handle error (e.g., show an error message)
    }
  };

  // Determine text direction based on the selected language
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Add Media Item</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Create Form */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          {/* Type Selection */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Media Type</label>
            <select
              className="form-select block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Infographs">Infographs</option>
              <option value="VideoGraphs">VideoGraphs</option>
            </select>
          </div>

          {/* Title Fields */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Title (Arabic)</label>
            <input
              type="text"
              className="form-input block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              dir="rtl"
            />
          </div>
          <button
            type="button"
            className="my-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => translateTextWithLibreTranslate(titleAr)}
          >
            Translate
          </button>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Title (English)</label>
            <input
              type="text"
              className="form-input block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              dir="ltr"
            />
          </div>

          {/* Media Fields */}
          {type === 'Infographs' && (
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Infograph Image</label>
              <input
                type="file"
                accept="image/*"
                className="block w-full mt-1"
                onChange={handleImageChange}
              />
              {image && <img src={URL.createObjectURL(image)} alt="Infograph Preview" className="mt-4 max-w-full h-auto" />}
            </div>
          )}

          {type === 'VideoGraphs' && (
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Video URL</label>
              <input
                type="text"
                className="form-input block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              {videoID && (
                <div className="mt-4">
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${videoID}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          )}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        {/* Live Preview */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Live Preview</h3>
          <div
            className="border border-gray-300 p-4 rounded-lg bg-white shadow-sm"
            dir={textDirection}
          >
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
            <h4 className="text-lg font-bold mb-2">{language === 'ar' ? titleAr : titleEn}</h4>
            {type === 'Infographs' && image && (
              <img src={URL.createObjectURL(image)} alt="Infograph Preview" className="w-full" />
            )}
            {type === 'VideoGraphs' && videoID && (
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
    </div>
  );
};

export default AddMediaItem;
