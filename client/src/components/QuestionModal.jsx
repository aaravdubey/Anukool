import { useState } from "react";
import QuestionGif from "../assets/Images/questiongif.gif"
import QuestionData from "../assets/JSONS/mhi.json"
import axios from "axios";
import { useEffect } from "react";
const API_BASE = 'http://localhost:3000';

const QuestionModal = ({ isModal, setIsModal }) => {
  const [toClose, setToClose] = useState(false);
  const [currOption, setCurrOption] = useState(0);
  console.log(localStorage.getItem('mhiResponse').split(','));
  let mhiIndex = localStorage.getItem('mhiResponse').split(',').indexOf('');
  console.log(mhiIndex);

  async function Close() {
    try {
      const data = await axios.post(`${API_BASE}/questionnaire/mhi`, { answers }, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } });
    } catch (error) {
      console.log(error);
    }
    localStorage.setItem('isMhiAsked', true);
    setToClose(true);
    setTimeout(() => {
      setIsModal(false);
    }, 300)
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(mhiIndex);
  const [answers, setAnswers] = useState(localStorage.getItem('mhiResponse').split(','));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = currOption;
    setAnswers(updatedAnswers);
    console.log(updatedAnswers);
    if (currentQuestionIndex < QuestionData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      try {
        let xarray = ['4', '2', '3', '4', '3', '5', '5', '5', '3', '1', '3', '4', '3', '4', '5', '4', '5', '4', '2', '4', '2', '2', '2', '2', '1', '3', '1', '3', '4', '1', '1', '3', '3', '1', '2', '4', '1', '5']
        const data = await axios.post(`${API_BASE}/questionnaire/mhi`, { answers: updatedAnswers }, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } });
        // console.log("POSTS");
        // console.log(data.data.posts);
        Close();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return <div id="popup-modal" tabIndex="-1" className={toClose ? "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-10 w-full max-h-full inset-0 flex justify-center items-center md:inset-0 opacity-0 transition-all duration-300" : "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-10 w-full max-h-full inset-0 flex justify-center items-center md:inset-0 opacity-100 transition-all duration-300 bg-black bg-opacity-35"}>
    {/* <div className="w-lvw h-lvh bg-black opacity-50 fixed z-20 flex justify-center items-center"></div> */}
    <div className="relative p-4 w-full max-w-xl max-h-full z-30">
      <div className="relative bg-gray-50 rounded-xl shadow-xl">
        <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal" onClick={Close}>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <form className="py-4 px-8 md:py-5 text-center" onSubmit={handleSubmit}>
          <div className="bg-gray-200 inline-block rounded-full p-5">
            <img src={QuestionGif} className="w-24" />
          </div>
          <h3 className="text-lg font-semibold text-gray-500">{QuestionData[currentQuestionIndex].question}</h3>

          <div className="py-5">
            {QuestionData[currentQuestionIndex].options.map((option, index) => (
              <div className="relative flex items-start py-2" key={index}>
                <input
                  id={index}
                  type="radio"
                  className="hidden"
                  name="preferred_activities[]"
                  value={option.score}
                  checked={currOption == option.score}
                  onChange={(e) => setCurrOption(e.target.value)}
                />
                <label
                  htmlFor={index}
                  className={`text-base inline-flex items-center justify-between w-full p-2 py-3 font-medium tracking-tight border rounded cursor-pointer ${currOption == option.score
                    ? 'bg-teal-700 text-white border-teal-700 font-normal decoration-brand-dark'
                    : 'bg-brand-light text-gray-600 font-normal border-teal-700 hover:bg-teal-100'
                    }`}
                >
                  <div className="flex items-center justify-center w-full">
                    <div className="text-sm text-brand-black">{option.option}</div>
                  </div>
                </label>
              </div>
            ))}
          </div>


          {/* <div className="pt-4 flex justify-center">
            <button type="button" className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-4 text-center me-2">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"></path>
              </svg>
              <span className="sr-only">Icon description</span>
            </button>
            <button type="button" className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-4 text-center me-2">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
              <span className="sr-only">Icon description</span>
            </button>
          </div> */}


          <button type="submit" className="text-white w-full bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-base p-4 text-center" >Submit</button>

          <p className="mt-3 mb-4 text-sm text-gray-500">{currentQuestionIndex + 1}/{QuestionData.length}</p>

          <p className="text-gray-500 hover:underline cursor-pointer text-sm" onClick={Close}>I will answer this some other time...</p>
        </form>
      </div>
    </div>
  </div>

}

export default QuestionModal;