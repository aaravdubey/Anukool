import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const cardVariants = {
  offscreen: {
    y: 200
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

const HomePostCard = ({ title, pid, desc, name, ptime, likes, userImg }) => {
  const navigate = useNavigate();

  return <motion.div initial="offscreen"
    whileInView="onscreen"
    viewport={{ once: true, amount: 0.8 }} className="w-full bg-gray-100 flex items-center justify-center cursor-pointer"
    onClick={() => navigate(`/post/${pid}`)}>
    <motion.div variants={cardVariants} className="w-full h-full" >
      <div className="w-full h-full bg-white rounded-2xl px-10 py-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-500">
        <div className="">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 mt-1">
              <div className="">
                <img className="w-7 h-7 rounded-full" src={userImg} alt="" />
              </div>
              <div className="text-sm font-semibold">{name}</div>
              <span className="font-normal text-xs text-gray-500">&#9679; {ptime} </span>
            </div>
            {/* <div className="flex gap-1 mt-4">
              <svg className="fill-rose-600" style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                <path
                  d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                </path>
              </svg>
              34
            </div> */}
          </div>
          <h1 className="text-xl text-logo-green font-bold mt-3">{title}</h1>
          <p className=" text-md text-gray-600 mt-1">{desc.length > 303 ? desc.substring(0, 300) + "..." : desc}.</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
}

export default HomePostCard;