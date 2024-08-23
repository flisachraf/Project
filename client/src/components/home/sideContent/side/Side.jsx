import React, { useState } from "react"
import "./side.css"
import Slider from "react-slick"
import Heading from "../../../common/heading/Heading"
import { gallery } from "../../../../dummyData"
import Tpost from "../Tpost/Tpost"
import SocialMedia from "../social/SocialMedia"
import axios from "axios"

import { useTranslation } from "react-i18next"

//const allCat = [...new Set(popular.map((curEle) => curEle.catgeory))]
//console.log(allCat)



const Side = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  const [email,setEmail]=useState("")
  const subscribe = (e) => {
    e.preventDefault();
    console.log('***********', email);
    axios.post("http://localhost:8000/api/subscriber", { email })
      .then(res => {
        console.log(res);
        alert("Subscription sent with success");
      })
      .catch(err => {
        console.error("Error subscribing:", err.response ? err.response.data : err.message);
        alert("Failed to subscribe");
        
      });
      
  };
  const { t } = useTranslation();
  const catgeory = ["world", "travel", "sport", "fun", "health", "fashion", "business", "technology"]
  return (
    <>
      <Heading title={t('Stay Connected')} />
      <SocialMedia />

      <Heading title={t('Subscribe')} />

      <section className='subscribe'>
        <h1 className='title' style={{textAlign:"start"}}> {t('Subscribe to receive all the news')} </h1>
        <form onSubmit={subscribe}>
      <input type='email' placeholder={t('Email Address')} onChange={(e) => setEmail(e.target.value)} />
      <button type="{t('Email Address')}">
        <i className='fa fa-paper-plane'></i> {t('Submit')}
      </button>
    </form>
      </section>

      {/* <section className='banner'>
        <img src='./images/sidebar-banner-new.jpg' alt='' />
      </section> */}

      {/* <Tpost /> */}

      

      {/* <section className='gallery'>
        <Heading title='Gallery' />
        <Slider {...settings}>
          {gallery.map((val) => {
            return (
              <div className='img'>
                <img src={val.cover} alt='' />
              </div>
            )
          })}
        </Slider>
      </section> */}
    </>
  )
}

export default Side
