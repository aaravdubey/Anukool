import { motion, useScroll } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";

const cardVariants = {
  offscreen: {
    y: 150
  },
  onscreen: {
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.6
    }
  }
};

const HomeAudioCard = ({ imgSrc, title, setSelectedSong }) => {
  let current = localStorage.getItem('current');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (current == title)
      setIsPlaying(true);
  }, [current])

  return <motion.div initial="offscreen"
    whileInView="onscreen"
    viewport={{ once: true, amount: 0.8 }} variants={cardVariants} onClick={() => setSelectedSong(title)}>
    <div className="group grid md:grid-cols-3 items-center bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-400 md:max-w-xl h-full">
      <img className="object-cover w-full h-full rounded-t-lg md:w-32 md:rounded-none md:rounded-s-lg" src={imgSrc} alt="" />
      <div className="col-span-2 flex justify-between items-center p-4 leading-normal">
        <h5 className="flex items-center mb-2 sm:text-sm font-bold tracking-tight text-logo-green md:text-base">{title.split('\\').pop().split('.')[0]}</h5>
        <button className="flex bg-logo-green w-min p-0.5 h-14 rounded-full group-hover:bg-teal-200 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="play" height="50" ><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" fill="#ffffff"></path></svg>
        </button>
      </div>
    </div>
  </motion.div>
}

export default HomeAudioCard;