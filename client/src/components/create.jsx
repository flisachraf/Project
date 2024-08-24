import React, { useState, useRef } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateArticleComponentt = ({ user }) => {
  const [fields, setFields] = useState({
    title: { en: '', ar: '' },
    mainParagraph: { en: '', ar: '' },
    subtitles: [
      { subtitle: { ar: '', en: '' }, paragraph: { ar: '', en: '' } }
    ]
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [category, setCategory] = useState('Politics');
  const [error, setError] = useState('');
  const [editor, setEditor] = useState(null); // Track ReactQuill editor instances

  const Categories = ['Politics', 'Economic', 'Social', 'Security', 'Health', 'Tourist', 'Limits'];

  const handleEditorChange = (value, field, language) => {
    setFields(prevFields => ({
      ...prevFields,
      [field]: {
        ...prevFields[field],
        [language]: value
      }
    }));
  };
  
  
  const handleFieldTranslate = async (path, language) => {
    try {
      const response = await axios.post(
        'http://srv586727.hstgr.cloud:8000/api/chat',
        {
          messages: fields[path][language],
          language
        }
      );
      const translatedText = response.data.translateText;
      
      setFields(prevFields => {
        const updatedFields = { ...prevFields };
        const pathArray = path.split('.');
        let currentField = updatedFields;
        for (let i = 0; i < pathArray.length - 1; i++) {
          currentField = currentField[pathArray[i]];
        }
        currentField[pathArray[pathArray.length - 1]].en = translatedText;
        return updatedFields;
      });
    } catch (error) {
      console.error('Error translating text:', error.response ? error.response.data : error.message);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', JSON.stringify(fields.title));
    formData.append('mainParagraph', JSON.stringify(fields.mainParagraph));
    formData.append('subtitles', JSON.stringify(fields.subtitles));
    formData.append('category', category);
    formData.append('creator', user._id);

    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://srv586727.hstgr.cloud:8000/api/articles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFields({
        title: { en: '', ar: '' },
        mainParagraph: { en: '', ar: '' },
        subtitles: [
          { subtitle: { ar: '', en: '' }, paragraph: { ar: '', en: '' } }
        ]
      });
      setError('');
      setCategory('Politics');
      setImage(null);
      setImagePreview('');
    } catch (err) {
      setError('Failed to create article. Please try again.');
      console.error(err);
    }
  };

  const handleSubtitleChange = (index, field, language, value) => {
    const newSubtitles = [...fields.subtitles];
    newSubtitles[index][field][language] = value;
    setFields(prevFields => ({ ...prevFields, subtitles: newSubtitles }));
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

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create New Article</h1>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            {Categories.map((item, idx) => (
              <option key={idx} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 max-h-48" />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Title (Arabic)</label>
          <ReactQuill
            value={fields.title.ar}
            onChange={(value) => handleEditorChange(value, 'title', 'ar')}
            className="border border-gray-300 p-2 rounded"
            theme="snow"
            ref={(el) => setEditor({ ...editor, title_ar: el })}
          />
          <button
            type="button"
            className="text-blue-500 mt-2 block"
            onClick={() => handleFieldTranslate('title', 'ar')}
          >
            Translate
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Title (English)</label>
          <ReactQuill
            value={fields.title.en}
            onChange={(value) => handleEditorChange(value, 'title', 'en')}
            className="border border-gray-300 p-2 rounded"
            theme="snow"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Main Paragraph (Arabic)</label>
          <ReactQuill
            value={fields.mainParagraph.ar}
            onChange={(value) => handleEditorChange(value, 'mainParagraph', 'ar')}
            className="border border-gray-300 p-2 rounded"
            theme="snow"
            ref={(el) => setEditor({ ...editor, mainParagraph_ar: el })}
          />
          <button
            type="button"
            className="text-blue-500 mt-2 block"
            onClick={() => handleFieldTranslate('mainParagraph', 'ar')}
          >
            Translate
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Main Paragraph (English)</label>
          <ReactQuill
            value={fields.mainParagraph.en}
            onChange={(value) => handleEditorChange(value, 'mainParagraph', 'en')}
            className="border border-gray-300 p-2 rounded"
            theme="snow"
            readOnly
          />
        </div>

        {fields.subtitles.map((subtitle, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Subtitle {index + 1}</h2>

            <div className="mb-2">
              <label className="block text-sm font-semibold mb-2">Subtitle (Arabic)</label>
              <ReactQuill
                value={subtitle.subtitle.ar}
                onChange={(value) => handleSubtitleChange(index, 'subtitle', 'ar', value)}
                className="border border-gray-300 p-2 rounded"
                theme="snow"
                ref={(el) => setEditor({ ...editor, subtitle_ar: el })}
              />
              <button
                type="button"
                className="text-blue-500 mt-2 block"
                onClick={() => handleFieldTranslate(`subtitles.${index}.subtitle`, 'ar')}
              >
                Translate
              </button>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-semibold mb-2">Subtitle (English)</label>
              <ReactQuill
                value={subtitle.subtitle.en}
                onChange={(value) => handleSubtitleChange(index, 'subtitle', 'en', value)}
                className="border border-gray-300 p-2 rounded"
                theme="snow"
                readOnly
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-semibold mb-2">Paragraph (Arabic)</label>
              <ReactQuill
                value={subtitle.paragraph.ar}
                onChange={(value) => handleSubtitleChange(index, 'paragraph', 'ar', value)}
                className="border border-gray-300 p-2 rounded"
                theme="snow"
                ref={(el) => setEditor({ ...editor, paragraph_ar: el })}
              />
              <button
                type="button"
                className="text-blue-500 mt-2 block"
                onClick={() => handleFieldTranslate(`subtitles.${index}.paragraph`, 'ar')}
              >
                Translate
              </button>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-semibold mb-2">Paragraph (English)</label>
              <ReactQuill
                value={subtitle.paragraph.en}
                onChange={(value) => handleSubtitleChange(index, 'paragraph', 'en', value)}
                className="border border-gray-300 p-2 rounded"
                theme="snow"
                readOnly
              />
            </div>

            <button
              type="button"
              className="text-red-500 mt-2 block"
              onClick={() => handleRemoveSubtitle(index)}
            >
              Remove Subtitle
            </button>
          </div>
        ))}

        <button
          type="button"
          className="text-green-500 mt-2 mb-4 block"
          onClick={handleAddSubtitle}
        >
          Add Subtitle
        </button>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Article
        </button>
      </form>
    </div>
  );
};

export default CreateArticleComponentt;
