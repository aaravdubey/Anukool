import { useLocation } from "react-router";
import Logo from "../assets/Images/logo.png"
import LogoWhite from "../assets/Images/logo-white.png"
import User from "../assets/Images/guy.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
const API_BASE = 'http://localhost:3000';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname == '/home';

  async function verifyLogin() {
    try {
      const data = await axios.post(`${API_BASE}/account/verifyUser`, {}, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } });

      console.log(data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('anonymousName');
        navigate('/login');
      } else {
        console.error('An error occurred:', error);
      }
    }
  }

  useEffect(() => {
    verifyLogin();
  }, [])

  return <nav className={isHome ? "bg-transparent" : "bg-logo-green shadow"}>
    <div className={`max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ${isHome ? "py-5" : "py-3"}`}>
      <a href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={isHome ? Logo : LogoWhite} className="h-7" alt="Flowbite Logo" />
      </a>
      <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div className="hidden w-full md:flex md:w-auto hover:bg-gray-50 justify-center rounded-full cursor-pointer pl-4 pr-2 py-1 transition-all duration-150" id="navbar-default" onClick={() => navigate("/profile")}>
        <div className="w-full inline-flex justify-between items-center mr-3 text-sm text-logo-green ">
          <img className="mr-2 w-9 h-9 rounded-full" src={User} alt={localStorage.getItem('username')} />
          <div>
            <a href="#" rel="author" className={isHome ? "text-sm text-logo-green" : "text-sm text-gray-100"}>{localStorage.getItem('username')}</a>
            <p className={isHome ? "text-sm text-gray-500 cursor-pointer" : "text-sm text-gray-400 cursor-pointer"}>@{localStorage.getItem('anonymousName')}</p>
          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default Navbar;