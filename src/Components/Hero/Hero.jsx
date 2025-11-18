import React, { useState, useEffect, use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Hero.css";
import { useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
import Loader from "../Loader";

export default function Hero() {
    const {user} = use(AuthContext)
  const [featuredChallenges, setFeaturedChallenges] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
const [loading,setLoading] = useState(true)
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get("https://tera-connect-server.vercel.app/challenges");
        const featured = res.data
          .filter(ch => ch.featured) 
        setFeaturedChallenges(featured);
      } catch (err) {
        console.error("Error fetching featured challenges:", err);
      }finally {
        setLoading(false); 
      }
    };
    fetchFeatured();
  }, []);
const handleView = (id) => {
    if (user) {
      navigate(`/challenges/join/${id}`);
    } else {
      navigate("/login");
    }
  };
  if (loading) return <Loader/>
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
    >
      {featuredChallenges.map((item, index) => (
        <SwiperSlide key={item._id}>
          <div className="relative w-full h-[90vh]">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4">
              <motion.div
                key={`content-${index}-${activeIndex}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center text-white max-w-2xl"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                  {item.title}
                </h2>
                <p className="text-lg md:text-xl mb-6 opacity-90">
                  {item.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleView(item._id)}
                  className="px-6 py-3 bg-[#22577a] text-white font-semibold rounded-full shadow-md hover:bg-secondary transition-colors"
                >
                  View Challenge
                </motion.button>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
