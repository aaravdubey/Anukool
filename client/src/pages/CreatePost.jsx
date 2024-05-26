import { useNavigate } from "react-router";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useAlert } from "react-alert";
const API_BASE = 'http://localhost:3000';

const CreatePost = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedOption, setSelectedOption] = useState('public');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const post = async () => {
    alert.show('Posting...')
    const data = await axios.post(`${API_BASE}/post/create`, { title, text, visibility: selectedOption }, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } });
    console.log(data);
    if (data.status === 200) {
      alert.show('Posted successfully')
      navigate('/home');
    } else {
      alert.show('Failed to post! Please try again.')
    }
  }

  return <div className="bg-gradient h-svh">
    <Navbar />
    <div className="heng mt-7 mb-5 mx-auto w-11/12 max-w-3xl font-semibold text-2xl text-logo-green">Create a post</div>
    {/* <hr className="mx-auto w-10/12 max-w-3xl my-6 border-t-2 border-gray-300" /> */}
    <div className="editor mx-auto w-11/12 flex flex-col text-gray-800 p-7 max-w-3xl bg-gray-50 rounded-lg shadow-lg">
      <input className="title bg-gray-100 border border-gray-200 p-2 mb-5 outline-none rounded" spellCheck="false" placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="description bg-gray-100 sec p-3 h-60 border border-gray-200 outline-none rounded" spellCheck="false" placeholder="Describe everything about this post here" value={text} onChange={(e) => setText(e.target.value)}></textarea>

      <div className="icons flex text-gray-500 m-2">
        <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
      </div>

      <div className="flex gap-4 w-max">

        <div className="inline-flex items-center mr-2">
          <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="public">
            <input name="color" type="radio"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 text-my-color transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-my-color checked:before:bg-my-color hover:before:opacity-10"
              id="public"
              value="public"
              checked={selectedOption === 'public'}
              onChange={handleOptionChange} />
            <span
              className="absolute text-my-color transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
              </svg>
            </span>
          </label>

          <label htmlFor="public" className="cursor-pointer text-gray-600">public</label>
        </div>

        <div className="inline-flex items-center mr-2">
          <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="consultant-only">
            <input name="color" type="radio"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 text-my-color transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-my-color checked:before:bg-my-color hover:before:opacity-10"
              id="consultant-only"
              value="consultant"
              checked={selectedOption === 'consultant'}
              onChange={handleOptionChange} />
            <span
              className="absolute text-my-color transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
              </svg>
            </span>
          </label>

          <label htmlFor="consultant-only" className="cursor-pointer text-gray-600">consultant-only</label>
        </div>

        <div className="inline-flex items-center">
          <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="private">
            <input name="color" type="radio"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 text-my-color transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-my-color checked:before:bg-my-color hover:before:opacity-10"
              id="private"
              value="private"
              checked={selectedOption === 'private'}
              onChange={handleOptionChange} />
            <span
              className="absolute text-my-color transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
              </svg>
            </span>
          </label>

          <label htmlFor="private" className="cursor-pointer text-gray-600">private</label>
        </div>

      </div>


      <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-2 justify-end my-1 mt-5">

        <button
          className="inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 "
          onClick={() => navigate('/home')}>
          Cancel
        </button>

        <button
          className="inline-flex items-center justify-center w-full px-5 py-2.5 mb-2 mr-2 text-sm font-medium text-white bg-my-color border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:b-tgeal-900 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200"
          onClick={post}>
          Post Anonymously
        </button>

      </div>
    </div>
  </div>
}

export default CreatePost;