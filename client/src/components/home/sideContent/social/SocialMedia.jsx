import React from "react"
import { useTranslation } from "react-i18next"


const SocialMedia = () => {
  const { t } = useTranslation();
  return (
    <>

      <section className='social'>
        <a href="https://www.facebook.com/profile.php?id=61563274497074" target="_blank" rel="noopener noreferrer">
          <div className='socBox'>
            <i className='fab fa-facebook-f'></i>
            <span>{t('Facebook Page')}</span>
          </div>
        </a>

      <a href="https://x.com/Tulib_news" target="_blank" rel="noopener noreferrer">
        <div className='socBox' style={{ backgroundColor: 'black' }}>
          <i className='fab fa-x'></i>
          <span>{t('X')}</span>
        </div>
      </a>


      <a href="https://www.youtube.com/channel/UCBfJt2Xx4fIvsYqnbhzXDEw" target="_blank" rel="noopener noreferrer">
        <div className='socBox' style={{ backgroundColor: 'red' }}>
          <i className='fab fa-youtube' ></i>
          <span>{t('Youtube Page')}</span>
        </div>
      </a>
      {/* <div className='socBox'>
          <i className='fab fa-instagram'></i>
          <span>22,700 Followers</span>
        </div> */}

    </section >
    </>
  )
}

export default SocialMedia
