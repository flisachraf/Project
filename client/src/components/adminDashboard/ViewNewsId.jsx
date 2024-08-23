import React, { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaLink } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const ViewNewsId = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const viewLanguage = i18n.language;
    const extractYouTubeID = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(u\/w\/)|(embed\/)|(watch\?v=))([^"&?\/\s]{11})/;
        const match = url.match(regExp);
        return match ? match[7] : null;
    };

    const [fields, setFields] = useState({
        title: { en: '', ar: '' },
        mainParagraph: { en: '', ar: '' },
        subtitles: [],
        creator: { name: '', image: '' },
        videoUrl: '',
        createdAt: '',
        category: ''
    });
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(true);
    const [randomArticles, setRandomArticles] = useState([]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/articles/getNew/${id}`);
                const article = await response.json();
                setFields({
                    title: article.title,
                    mainParagraph: article.mainParagraph,
                    subtitles: article.subtitles,
                    creator: article.creator,
                    createdAt: article.createdAt,
                    videoUrl: article.videoUrl,
                    category: article.category
                });
                setImagePreview(article ? `http://localhost:8000/${article.image.replace('\\', '/')}` : '');
                setLoading(false);
                
                // Fetch random articles from the same category and week
                const weekStart = new Date(article.createdAt);
                weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of the week
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekEnd.getDate() + 6); // End of the week
                
                const randomResponse = await axios.get('http://localhost:8000/api/articles/random', {
                    params: {
                        category: article.category,
                        startDate: weekStart.toISOString(),
                        endDate: weekEnd.toISOString()
                    }
                });
                setRandomArticles(randomResponse.data.articles);
            } catch (error) {
                console.error('Failed to fetch article:', error);
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    const formatParagraphs = (text) => {
        return text.split('\n').map((para, index) => (
            <p key={index} className="text-2xl mb-4 leading-relaxed">{para}</p>
        ));
    };

    if (fields.videoUrl) {
        var videoID = extractYouTubeID(fields.videoUrl);
    }

    const shareOnSocialMedia = (platform) => {
        const url = window.location.href;
        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'instagram':
                window.open(`https://www.instagram.com/share?url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(fields.title[viewLanguage])}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(fields.title[viewLanguage])}`, '_blank');
                break;
            case 'tiktok':
                window.open(`https://www.tiktok.com/share?url=${encodeURIComponent(url)}`, '_blank');
                break;
            default:
                break;
        }
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loader"></div> {/* Add your loader styling here */}
            </div>
        );
    }

    return (
        <div className={`flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 bg-gray-100 rounded-lg shadow-lg`} dir={viewLanguage === 'en' ? 'ltr' : 'rtl'}>
            {/* Article Content */}
            <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold mb-4" dir={viewLanguage === 'en' ? 'ltr' : 'rtl'}>
                    {t(`title.${viewLanguage}`, { defaultValue: fields.title[viewLanguage] })}
                </h1>
                {fields.creator.image && (
                    <div className="flex gap-4 items-center mb-6">
                        <img
                            src={fields.creator.image ? `http://localhost:8000/${fields.creator.image.replace('\\', '/')}` : ''}
                            alt="Creator"
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <span className="text-xl font-bold color text-gray-600" dir={viewLanguage === 'en' ? 'ltr' : 'rtl'}>
                            {t(fields.creator.username)}
                        </span>
                    </div>
                )}
                <div className="author flex">
                    <span>{new Date(fields.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-3 flex-wrap mt-6 mb-6">
                    <button onClick={() => shareOnSocialMedia('facebook')} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
                        <FaFacebookF className="mx-2"/> Share 
                    </button>
                    <button onClick={() => shareOnSocialMedia('twitter')} className="flex items-center px-4 py-2 bg-black text-white rounded hover:bg-blue-500 transition duration-200">
                        < FaXTwitter className="mx-2" /> Share 
                    </button>
                  
                    <button onClick={() => shareOnSocialMedia('linkedin')} className="flex items-center px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition duration-200">
                        <FaLinkedinIn className="mx-2" /> Share 
                    </button>
                    <button onClick={() => shareOnSocialMedia('instagram')} className="flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded hover:opacity-80 transition duration-200">
                        <FaInstagram className="mx-2" /> Share 
                    </button>
                    <button onClick={() => shareOnSocialMedia('tiktok')} className="flex items-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition duration-200">
                        <FaTiktok className="mx-2" /> Share 
                    </button>
                    <button onClick={() => copyLink()} className="flex items-center px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-200">
                        <FaLink className="mx-2" /> Copy Link 
                    </button>
             
                </div>
                {imagePreview && (
                    <div className="mb-6">
                        <img src={imagePreview} alt="Article Preview" className="w-full h-auto rounded-lg shadow-sm" />
                    </div>
                )}
                {fields.videoUrl && videoID && (
                    <iframe width="100%" height="315" src={`https://www.youtube.com/embed/${videoID}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                )}
                {fields.mainParagraph && <div className="mb-6" dir={viewLanguage === 'en' ? 'ltr' : 'rtl'}>
                    {formatParagraphs(t(`mainParagraph.${viewLanguage}`, { defaultValue: fields.mainParagraph[viewLanguage] }))}
                </div>}
                {fields.subtitles && fields.subtitles.map((subtitle, index) => (
                    <div key={index} className="mb-6" dir={viewLanguage === 'en' ? 'ltr' : 'rtl'}>
                        <h4 className="text-xl font-semibold mb-2">
                            {t(`subtitle.${index}.${viewLanguage}`, { defaultValue: subtitle.subtitle[viewLanguage] })}
                        </h4>
                        {formatParagraphs(t(`paragraph.${index}.${viewLanguage}`, { defaultValue: subtitle.paragraph[viewLanguage] }))}
                    </div>
                ))}
            </div>

            {/* Read More Section */}
            <div className="w-full lg:w-1/3 p-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">{t('Read more')}</h2>
                <div className="grid grid-cols-1 gap-4">
                    {randomArticles.length === 0 ? (
                        <p className="text-gray-600">{t('noMoreArticles')}</p>
                    ) : (
                        randomArticles.map((article) => (
                            <div key={article._id} className="bg-white rounded-lg shadow-md p-4">
                                <img src={`http://localhost:8000/${article.image.replace('\\', '/')}`} alt={article.title[viewLanguage]} className="w-full h-40 object-cover rounded-lg mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{article.title[viewLanguage]}</h3>
                                <p className="text-sm text-gray-600">{new Date(article.createdAt).toLocaleDateString()}</p>
                                <Link to={`/singlepage/${article._id}`} className="text-blue-500 hover:underline mt-2 block">{t('Read more')}</Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewNewsId;
