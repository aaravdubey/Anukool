import Navbar from "../components/Navbar";
import HomeImage from "../assets/Images/home2.png";
import { useNavigate } from 'react-router-dom';
import HomeBlogCard from "../components/HomeBlogCard";
import HomePostCard from "../components/HomePostCard";
import HomeAudioCard from "../components/HomeAudioCard";
import Music from "../assets/Images/music-notes.svg"
import Podcast from "../assets/Images/headphones.svg"
import Quote from "../assets/Images/quote.png"
// import Call from "../assets/Images/call.png"
import FooterX from "../components/Footer";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import QuestionModal from "../components/QuestionModal";
import Articles from "../assets/JSONS/peace_articles.json";
const Unsplash_API_URL = 'https://api.unsplash.com/search/photos';
import axios from "axios";
import User from "../assets/Images/guy.png"
import AudioPlayerBar from "../components/AudioPlayerBar";
import AudioPlayer from "../components/AudioPlayer";
const API_BASE = 'http://localhost:3000';

const Home = () => {
  // console.log(import.meta.env.VITE_UNSPLASH_API_KEY);
  let isMhiModal = true;
  if (localStorage.getItem('isMhiAsked') === "false")
    isMhiModal = true;

  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(true);
  const [load, setLoad] = useState(true);
  const [isModal, setIsModal] = useState(isMhiModal);
  const [images, setImages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedSong, setSelectedSong] = useState('');

  useEffect(() => {
    getPosts();
    setTimeout(() => {
      if (images.length === 0)
        getImages();

      setIsLoad(false);
      setTimeout(() => {
        setLoad(false);
      }, 1000);
    }, 1000)

  }, [])

  useEffect(() => {
    if (localStorage.getItem('isMhiAsked') === "true")
      setIsModal(false);
  }, [])

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledArticles = shuffleArray(Articles);

  const getImages = async () => {
    try {
      const { data } = await axios.get(`${Unsplash_API_URL}?query=mental%20wellness&page=1&per_page=4&client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}`);
      if (data.results) {
        for (let i = 0; i < 4; i++) {
          setImages((prev) => [...prev, data.results[i].urls.regular]);
        }
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getPosts() {
    try {
      const data = await axios.post(`${API_BASE}/post/get-posts`, {}, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } });
      setPosts(data.data.posts)
      console.log("POSTS");
      console.log(data.data.posts);
    } catch (error) {
      console.log(error);
    }
  }
  const songs = [
    "src\\assets\\Audio\\Neil Cowley TrioGrace - Neil Cowley Trio.mp3",
    "src\\assets\\Audio\\Nils FrahmBecause This Must Be - Nils Frahm.mp3",
    "src\\assets\\Audio\\Nils FrahmSome - Nils Frahm.mp3",
    "src\\assets\\Audio\\OnekeRays of Hope - Oneke.mp3",
    "src\\assets\\Audio\\Oskar SchusterKyiv - Oskar Schuster.mp3",
    "src\\assets\\Audio\\Oskar SchusterTristane - Oskar Schuster.mp3",
    "src\\assets\\Audio\\Ossie WoodsLes Nouveaux Riches - Ossie Woods.mp3",
    "src\\assets\\Audio\\Otto A TotlandPino - Otto A Totland.mp3",
    "src\\assets\\Audio\\Otto WahlAwakening - Otto Wahl.mp3",
    "src\\assets\\Audio\\Otto WahlMoods Of The Valley - Otto Wahl.mp3",
    "src\\assets\\Audio\\OzymandiasI Miss You - Ozymandias.mp3",
    "src\\assets\\Audio\\Peter Bradley AdamsInterlude for Piano - Peter Bradley Adams.mp3",
    "src\\assets\\Audio\\Peter BroderickEyes Closed and Traveling - Peter Broderick.mp3",
    "src\\assets\\Audio\\PhildelQi - Phildel.mp3",
    "src\\assets\\Audio\\Philip WesleyThe Approaching Night - Philip Wesley.mp3",
    "src\\assets\\Audio\\Piano NovelEnchantement - Piano Novel.mp3"
  ]


  return <div className="bg-gray-100">
    {load && <Loading isLoad={isLoad} />}
    <div className="bg-gradient">
      <Navbar />

      {!localStorage.getItem('isMhiAsked') && isModal && <QuestionModal isModal={isModal} setIsModal={setIsModal} />}

      <section className="bg-transparent">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto md:gap-8 xl:gap-0 md:py-0 md:grid-cols-12 md:pt-16">
          <div className="mr-auto place-self-center md:col-span-7">
            <h1
              className="max-w-2xl mb-4 text-4xl text-logo-green font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl ">
              Building healthy <br />minds &amp; lifes.
            </h1>

            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">This
              Read articles, post about yourself & stream peaceful music...
            </p>

            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">

              <a href="#heal"
                className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 ">
                Heal Music
              </a>

              <button
                className="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-white bg-my-color border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-logo-green focus:z-10 focus:ring-4 focus:ring-gray-200"
                onClick={() => navigate('/create')}>
                Create Post
              </button>

            </div>
          </div>

          <div className="hidden md:mt-0 md:col-span-5 md:flex scale-110 relative bottom-10 pr-20">
            <img src={HomeImage} alt="hero image" className="floating" />
          </div>

        </div>
      </section>
    </div>

    {/* Blogs */}
    <section className="lg:px-28 my-16 md:px-3">
      <h2 className="text-4xl font-extrabold text-logo-green mb-5">Blogs</h2>

      <div className="grid md:grid-cols-2  gap-8">
        {shuffledArticles?.map((article, index) => {
          if (index < 4) return <HomeBlogCard key={index} title={article['Heading ']}
            desc={article.Context} imgSrc={images[index]} />
        })}
      </div>

    </section>

    {/* Posts */}
    <section className="lg:px-28 my-20 md:px-3">
      <h2 className="text-4xl font-extrabold text-logo-green mb-5">Posts</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {posts?.map((post, index) => {
          if (index < 4) {
            return <HomePostCard title={post.title} key={index}
              pid={post.postId}
              desc={post.text}
              name={post.anonymousName} ptime={post.datetime} likes={34}
              userImg={User} />
          }
        })}

      </div>
    </section>

    <section className="lg:mx-28 my-16 md:mx-3 bg-gif rounded-2xl p-3 px-8 relative">
      {/* <img className="w-full max-h-full absolute bg-cover" src={GIF} />
      <img className="w-full max-h-full absolute bg-cover" src={GIF} /> */}
      {/* <h2 className="text-4xl font-extrabold text-logo-green mb-5">Audio Heaven</h2> */}

      {/* Heal Music */}
      <section id="heal" className="mt-12 mb-16 relative">
        <h2 className="flex gap-2 text-4xl font-extrabold text-logo-green mb-5">Heal Music <img src={Music} className="h-9" /> </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {songs.map((song, index) => {
            if (index < 3) {
              return <HomeAudioCard key={index} title={song} imgSrc="https://miro.medium.com/v2/resize:fit:1024/1*7yNfuLnBcCwikFwHIttD7g.jpeg" setSelectedSong={setSelectedSong} />
            }
          })}
        </div>
      </section>

      {/* Podcast */}
      <section className="my-16 relative">
        <h2 className="flex gap-2 items-center text-4xl font-extrabold text-logo-green mb-5">Podcasts <img src={Podcast} className="h-9" /></h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" onClick={() => navigate('/blog')}>
          <HomeAudioCard title="The Community Mindfulness Project" imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa4EaDv0UNjwgbBL1hFHYT9NUXM841JhQc2g&usqp=CAU" />
          <HomeAudioCard title="Calm Mind" imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCRYpYGXe6jhuXJNvumEejdgpHy367rqJRS5b1j4jOvH8-ozOuMaKxsoVNoaRjH31gWfI&usqp=CAU" />
          <HomeAudioCard title="Binaural Beats" imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpotlwKAAMbQC3dUtdmGF3Hjnb59yCGA4pxg&usqp=CAU" />
        </div>
      </section>
    </section>

    <div className="flex mx-28 my-5 rounded-xl py-6 px-5 relative">
      {/* <p className="font-semibold text-logo-green">Daily Quote</p> */}
      <img className="quotes" src={Quote} />
      <p className="w-full quote-font text-logo-green text-xl pl-6">"Slow breathing is like an anchor in the midst of an emotional storm: the anchor won't make the storm go away, but it will hold you steady until it passes."
        <p className="pt-2 text-gray-600 font-semibold font-sans text-base">- Russ Harris</p>
      </p>
    </div>

    {/* <div className="flex mx-28 my-5 rounded-xl py-6 px-5 relative z-10">
      <img className="quotes" src={Call} />
      <p className="w-full text-logo-green text-xl pl-6 font-bold"> Toll-free Mental Health Service numbers by Government of India - Tele MANAS (Call or Text)
        <p className="pt-2 font-normal text-gray-600 font-sans text-base">14416</p>
        <p className="pt-2 font-normal text-gray-600 font-sans text-base">1-800 891 4416</p>
      </p>
    </div> */}

    <AudioPlayer selectedSong={selectedSong} />

    <FooterX />
  </div>
}

export default Home;