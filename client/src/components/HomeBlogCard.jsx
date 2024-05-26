import { useNavigate } from "react-router";

const HomeBlogCard = ({ title, desc, author, bdate, imgSrc, userImg }) => {
  const navigate = useNavigate();

  return <button className="flex flex-col items-center bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-500 md:flex-row" onClick={() => navigate(`/blog/${title}`)}>
    <img className="object-cover w-full h-full rounded-t-lg md:w-48 md:rounded-none md:rounded-s-lg" src={imgSrc} alt="" />
    <div className="flex flex-col justify-between p-4 leading-normal text-left">
      <h5 className="mb-2 lg:text-xl font-bold tracking-tight text-logo-green md:text-base">{title.length > 68 ? title.substring(0, 65) + "..." : title}</h5>
      <p className="hidden mb-3 text-sm font-normal text-gray-700 md:hidden lg:block">{desc.length > 303 ? desc.substring(0, 300) + "..." : desc}</p>

      {/* <div className="inline-flex items-center mr-3 text-sm text-logo-green">
        <img className="mr-4 w-10 h-10 rounded-full" src={userImg} alt={author} />
        <div>
          <a href="#" rel="author" className="text-sm font-bold text-logo-green ">{author}</a>
          <p className="text-xs text-gray-500 "><time pubdate datetime="2022-02-08" title={bdate}>{bdate}</time></p>
        </div>
      </div> */}
    </div>
  </button>
}

export default HomeBlogCard;