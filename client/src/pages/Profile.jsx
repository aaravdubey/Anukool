import { useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState } from "react";
const API_BASE = 'http://localhost:3000';
import User from "../assets/Images/guy.png"

const Profile = () => {
  const [mhi, setMhi] = useState({});
  const [userData, setUserData] = useState({});

  async function getUserData() {
    try {
      const data = await axios.post(`${API_BASE}/account/userdata`, {}, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } });
      setMhi(data.data.userData.mhiState);
      setUserData(data.data.userData);
      console.log(data.data.userData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, [])

  const getColorClass = (value) => {
    switch (value) {
      case 'high':
        return 'bg-green-100';
      case 'medium':
        return 'bg-orange-100';
      case 'low':
        return 'bg-red-100';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="pb-20 bg-gradient ">
      <Navbar />
      <div className="flex justify-center  
              ">

        <div className="card bg-gray-100 w-full  
                rounded-xl shadow-lg flex flex-col mt-28 mx-56 items-center h-min px-10">

          <div className="profile-image">
            <img src=
              {User}
              alt=""
              className="z-10 w-32 h-32 relative mx-auto -mt-16  
                        block rounded-full  
                        transition-transform duration-400  
                        transform hover:scale-110 saturate-50" />
          </div>
          <div className="card-content text-center py-4 mt-6 text-gray-600 font-semibold">
            <h3 className="text-3xl font-bold">{localStorage.getItem('username')}</h3>
            <h3 className="text-xl mt-1">@{localStorage.getItem('anonymousName')}</h3>
            <p className="text-xl mt-4">&#9993; {userData.email}</p>
          </div>
          <div className="w-full mt-10 pt-10 pb-14 border-t-2 border-blueGray-200 text-center text-gray-600">
            <h3 className="text-2xl font-semibold">Mental Health Inventory (MHI) Test Score</h3>
            <h4 className="text-lg font-semibold mt-6">Mental Health Index</h4>
            <div className={`p-4 mt-4 rounded-lg ${userData.mhiRange ? getColorClass(userData.mhiRange.index) : 'bg-gray-200'}`}>
              Index: {userData.mhiRange ? mhi.index : ''}
            </div>
            <h4 className="text-lg font-semibold mt-6">Global Mental Health Scales</h4>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className={`p-4 rounded-lg ${userData.mhiRange ? getColorClass(userData.mhiRange.psychologicalDistress) : 'bg-gray-200'}`}>
                Psychological Distress: {userData.mhiRange ? mhi.psychologicalDistress : ''}
              </div>
              <div className={`p-4 rounded-lg ${userData.mhiRange ? getColorClass(userData.mhiRange.psychologicalWellBeing) : 'bg-gray-200'}`}>
                Psychological Well-being: {userData.mhiRange ? mhi.psychologicalWellBeing : ''}
              </div>
            </div>
            <h4 className="text-lg font-semibold mt-6">Subscales</h4>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className={`p-4 rounded-lg ${userData.mhiRange ? getColorClass(userData.mhiRange.anxiety) : 'bg-gray-200'}`}>Anxiety: {userData.mhiRange ? mhi.anxiety : ''}</div>
              <div className={`p-4 rounded-lg ${userData.mhiRange ? getColorClass(userData.mhiRange.depression) : 'bg-gray-200'}`}>Depression: {userData.mhiRange ? mhi.depression : ''}</div>
              <div className={`p-4 rounded-lg ${userData.mhiRange ? getColorClass(userData.mhiRange.lossOfBehavioralEmotionalControl) : 'bg-gray-200'}`}>
                Loss of Emotional Control: {userData.mhiRange ? mhi.lossOfBehavioralEmotionalControl : ''}
              </div>
              <div className={`p-4 rounded-lg ${userData.mhiRange ? getColorClass(userData.mhiRange.generalPositiveAffect) : 'bg-gray-200'}`}>
                General Positive Effect: {userData.mhiRange ? mhi.generalPositiveAffect : ''}
              </div>
              <div className={`p-4 rounded-lg ${userData.mhiRange ? getColorClass(userData.mhiRange.emotionalTies) : 'bg-gray-200'}`}>Emotional Ties: {userData.mhiRange ? mhi.emotionalTies : ''}</div>
              <div className={`p-4 rounded-lg ${userData.mhiRange ? getColorClass(userData.mhiRange.lifeSatisfaction) : 'bg-gray-200'}`}>
                Life Satisfaction: {userData.mhiRange ? mhi.lifeSatisfaction : ''}
              </div>
            </div>
            <div className="flex gap-4 justify-center mt-6">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full mr-2 bg-green-200" />
                <span>Good</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full mr-2 bg-orange-200" />
                <span>Okay</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full mr-2 bg-red-200" />
                <span>Not good</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile;