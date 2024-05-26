import { useState } from 'react'
import LoginImage from "../assets/Images/login.jpg"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_BASE = 'http://localhost:3000';

const Login = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [anonymousName, setAnonymousName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [email1, setEmail1] = useState('');
  const [password1, setPassword1] = useState('');

  const [isLogin, setIslogin] = useState(true);
  const [visible, setVisible] = useState(true);

  const switchSection = () => {
    setVisible(false);

    setTimeout(() => {
      setIslogin(!isLogin);
      setVisible(true);
    }, 250);
  };

  const signUp = async () => {
    const data = await axios.post(`${API_BASE}/account/signup`, { name, anonymousName, email, password });

    console.log(data);
    if (data.status == 201) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('username', data.data.username);
      localStorage.setItem('anonymousName', data.data.anonymousName);
      localStorage.setItem('mhiResponse', data.data.mhiResponse);
      localStorage.setItem('isMhiAsked', false);
      navigate('/home');
    }
  }
  const signIn = async (e) => {
    e.preventDefault();
    const data = await axios.post(`${API_BASE}/account/signin`, { email1, password1 });

    console.log(data);
    if (data.status == 200) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('username', data.data.username);
      localStorage.setItem('anonymousName', data.data.anonymousName);
      localStorage.setItem('mhiResponse', data.data.mhiResponse);
      localStorage.setItem('isMhiAsked', false);
      if (data.data.mhiResponse.indexOf('') == -1)
        localStorage.setItem('isMhiAsked', true);
      navigate('/home');
    }
  }

  return <>
    <div className={visible ? "fade-in flex items-center justify-center min-h-screen bg-gradient opacity-0" : "fade-out flex items-center justify-center min-h-screen bg-gradient"} >
      <div
        className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 text-gray-500"
      >
        {isLogin ?
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold">Welcome back</span>
            <span className="font-light text-gray-400 mb-8">
              Welcom back! Please enter your details
            </span>
            <form>
              <div className="py-4">
                <span className="mb-2 text-md">Email</span>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="email1"
                  id="email1"
                  value={email1}
                  onChange={(e) => setEmail1(e.target.value)}
                />
              </div>
              <div className="py-4">
                <span className="mb-2 text-md">Password</span>
                <input
                  type="password"
                  name="pass1"
                  id="pass1"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                />
              </div>
              <div className="flex justify-center w-full py-4">
                <span className="font-bold text-md">Forgot password</span>
              </div>
              <button
                className="w-96 bg-gray-500 text-white p-2 rounded-lg mb-6 border hover:border-gray-300 hover:bg-white hover:text-black"
                type='submit'
                onClick={(e) => signIn(e)}
              >
                Sign in
              </button>
            </form>
            <div className="text-center text-gray-400">
              Dont have an account?
              <button className="font-bold text-gray-500" onClick={switchSection}> Sign up</button>
            </div>
          </div> :

          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold">New here?</span>
            <span className="font-light text-gray-400 mb-8">
              Sign up now and lets get started!
            </span>
            <div className="py-2">
              <span className="mb-2 text-md">Name</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="py-2">
              <span className="mb-2 text-md">Anonymous Name <span className='text-sm'>(dont include your actual name for anonymity)</span></span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                value={anonymousName}
                onChange={(e) => setAnonymousName(e.target.value)}
              />
            </div>
            <div className="py-2">
              <span className="mb-2 text-md">Email</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="py-2 pb-10">
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                name="pass"
                id="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <button
              className="w-full bg-gray-500 text-white p-2 rounded-lg mb-6 border hover:border-gray-300 hover:bg-white hover:text-black"
              onClick={signUp}
            >
              Sign up
            </button>
            <div className="text-center text-gray-400">
              Dont have an account?
              <button className="font-bold text-gray-500" onClick={switchSection}> Log In</button>
            </div>
          </div>
        }

        <div className="relative">
          <img
            src={LoginImage}
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          <div
            className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
          >
            <span className="text-white text-xl"
            >We have been uesing Untitle to kick<br />start every new project
              and cant <br />imagine working without it.
            </span>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Login;