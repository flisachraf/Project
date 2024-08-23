import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  // Construct the full URL for the image
  const imageUrl = item.image ? `http://localhost:8000/${item.image.replace('\\', '/')}` : '';
  const { i18n } = useTranslation();
  const title = i18n.language === 'ar' ? item.title.ar : item.title.en;

  return (
    <div className='box'>
      <div className='img'>
        {/* Check if imageUrl exists and is valid */}
        {imageUrl ? (
          <img src={imageUrl} alt='Article' />
        ) : (
          <p>Image not available</p> // Placeholder text if image URL is invalid
        )}
      </div>
      <div className='text'>
        <span className='category'>{i18n.t(`${item.category}`)}</span>
        <Link to={`/SinglePage/${item._id}`}>
          <div className="relative ">
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
            <h1 className="relative text-white">{title}</h1>
          </div>


        </Link>
        <div className='author flex'>
          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
