import axios from "axios";
import React, { useEffect, useState } from "react";
import UrgentNews from "../../UrgentNews";
import DayNews from "./DayNews";
import { useTranslation } from 'react-i18next';

const Head = () => {
  const { i18n } = useTranslation(); // Utilisez useTranslation pour accéder à la langue actuelle
  const [sponsors, setSponsors] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8000/api/sponsors/allActiveSponsors")
      .then(res => {
        console.log("*******", res.data);
        setSponsors(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sponsors.length);
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(intervalId);
  }, [sponsors.length]);

  // Vérifiez si la direction est RTL
  const isRTL = i18n.dir() === 'rtl';

  return (
    <section className="bg-gray-50 py-4 lg:py-3">
      <div className="container mx-auto flex-col gap-6">

        {/* Logo and Sponsors Slider */}
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="w-3/12 lg:w-48 flex-shrink-0 container">
            <img src="../images/TULIB.png" alt="Logo" className="w-full h-auto" />
          </div>
          <div className="w-9/12 flex-grow">
            <div className="relative w-full overflow-hidden shadow-lg rounded-lg">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(${isRTL ? currentSlide * 100 : -currentSlide * 100}%)`,
                }}
              >
                {sponsors.map((src, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <img
                      src={`http://localhost:8000/${src.replace("\\", "/")}`}
                      alt={`Slide ${index}`}
                      className=""
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Urgent News Section */}
        <div className="flex-grow">
          <UrgentNews />
        </div>
        <DayNews />
      </div>
    </section>
  );
};

export default Head;
