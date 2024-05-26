import Load from "../assets/Images/load.svg";

const Loading = ({ isLoad }) => {
  return <div className={isLoad ? "w-lvw h-lvh bg-black opacity-50 fixed z-20 flex justify-center items-center" : "w-lvw h-lvh bg-black opacity-0 fixed z-20 flex justify-center items-center transition-all duration-1000"}>
    <img src={Load} className="w-72" />
  </div>
}

export default Loading;