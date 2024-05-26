import { useLocation, useNavigate } from "react-router";
import FooterX from "../components/Footer";
import Navbar from "../components/Navbar";
import Articles from "../assets/JSONS/peace_articles.json";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
const Unsplash_API_URL = 'https://api.unsplash.com/search/photos';

const Blog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const title = location.pathname.split("/")[2].replace(/%20/g, " ").replace(/%27/g, "'").replace(/%22/g, `"`);
  const article = Articles.find((article) => article['Heading '] === title);
  const [images, setImages] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [load, setLoad] = useState(true);
  // console.log(title);
  // console.log(article);

  useEffect(() => {
    if (images.length === 0)
      getImages();

    setTimeout(() => {
      setIsLoad(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setLoad(false);
      }, 1000);
    }, 1000)
  }, [])

  useEffect(() => {
    getImages();
  }, [article])

  const getImages = async () => {
    try {
      const { data } = await axios.get(`${Unsplash_API_URL}?query=mental%20wellness&page=2&per_page=5&client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}`);
      if (data.results) {
        const shuffledImages = data.results.map(result => result.urls.regular).sort(() => Math.random() - 0.5);
        setImages(shuffledImages);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }


  return <div className="">
    {load && <Loading isLoad={isLoad} />}
    <Navbar />

    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient antialiased">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue ">
          <header className="mb-4 lg:mb-6 not-format">
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-logo-green lg:mb-6 lg:text-4xl ">{article['Heading ']}</h1>
            {/* <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-logo-green">
                <img className="mr-4 w-16 h-16 rounded-full" src="https://marketplace.canva.com/EAFqNrAJpQs/1/0/1600w/canva-neutral-pink-modern-circle-shape-linkedin-profile-picture-WAhofEY5L1U.jpg" alt="Jese Leos" />
                <div>
                  <a href="#" rel="author" className="text-xl font-bold text-logo-green ">Jese Leos</a>
                  <p className="text-base text-gray-500 ">Mental Well-being Blogger & Licensed Psychologist</p>
                  <p className="text-base text-gray-500 "><time pubdate datetime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time></p>
                </div>
              </div>
            </address> */}
          </header>
          <figure className="my-5">
            <img src={images[0]} className="rounded-2xl max-h-96 w-full object-cover" alt="" />
            <figcaption className="text-gray-500 text-sm p-2">Digital art from Unsplash</figcaption>
          </figure>
          <p className="lead">{article['Content']}</p>

          {/* <section className="not-format mt-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-logo-green ">Discussion (4)</h2>
            </div>
            <form className="mb-6">
              <div className="py-2 px-4 mb-4 bg-gray-50 rounded-lg rounded-t-lg border border-gray-200  ">
                <label for="comment" className="sr-only">Your comment</label>
                <textarea id="comment" rows="6"
                  className="px-0 w-full bg-gray-50 text-sm text-logo-green border-0 focus:ring-0   "
                  placeholder="Write a comment..." required></textarea>
              </div>
              <button type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-primary-800">
                Post comment
              </button>
            </form>
            <article className="p-6 mb-6 text-base bg-gray-50 rounded-lg ">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 font-semibold text-sm text-logo-green "><img
                    className="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael Gough" />Michael Gough</p>
                  <p className="text-sm text-gray-600 "><time pubdate datetime="2022-02-08"
                    title="February 8th, 2022">Feb. 8, 2022</time></p>
                </div>
                <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50  "
                  type="button">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                  <span className="sr-only">Comment settings</span>
                </button>
                <div id="dropdownComment1"
                  className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow">
                  <ul className="py-1 text-sm text-gray-700 "
                    aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100">Edit</a>
                    </li>
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100">Remove</a>
                    </li>
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100">Report</a>
                    </li>
                  </ul>
                </div>
              </footer>
              <p>Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                instruments for the UX designers. The knowledge of the design tools are as important as the
                creation of the design strategy.</p>
              <div className="flex items-center mt-4 space-x-4">
                <button type="button"
                  className="flex items-center font-medium text-sm text-gray-500 hover:underline ">
                  <svg className="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                  </svg>
                  Reply
                </button>
              </div>
            </article>
            <article className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-gray-50 rounded-lg ">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 font-semibold text-sm text-logo-green "><img
                    className="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="Jese Leos" />Jese Leos</p>
                  <p className="text-sm text-gray-600 "><time pubdate datetime="2022-02-12"
                    title="February 12th, 2022">Feb. 12, 2022</time></p>
                </div>
                <button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50  "
                  type="button">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                  <span className="sr-only">Comment settings</span>
                </button>
                <div id="dropdownComment2"
                  className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow">
                  <ul className="py-1 text-sm text-gray-700 "
                    aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100">Edit</a>
                    </li>
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100">Remove</a>
                    </li>
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100">Report</a>
                    </li>
                  </ul>
                </div>
              </footer>
              <p>Much appreciated! Glad you liked it ☺️</p>
              <div className="flex items-center mt-4 space-x-4">
                <button type="button"
                  className="flex items-center font-medium text-sm text-gray-500 hover:underline ">
                  <svg className="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                  </svg>
                  Reply
                </button>
              </div>
            </article>
            <article className="p-6 mb-6 text-base bg-gray-50 border-t border-gray-200  ">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 font-semibold text-sm text-logo-green "><img
                    className="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                    alt="Bonnie Green" />Bonnie Green</p>
                  <p className="text-sm text-gray-600 "><time pubdate datetime="2022-03-12"
                    title="March 12th, 2022">Mar. 12, 2022</time></p>
                </div>
                <button id="dropdownComment3Button" data-dropdown-toggle="dropdownComment3"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50  "
                  type="button">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                  <span className="sr-only">Comment settings</span>
                </button>
                <div id="dropdownComment3"
                  className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow">
                  <ul className="py-1 text-sm text-gray-700 "
                    aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100">Edit</a>
                    </li>
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100">Remove</a>
                    </li>
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100">Report</a>
                    </li>
                  </ul>
                </div>
              </footer>
              <p>The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.</p>
              <div className="flex items-center mt-4 space-x-4">
                <button type="button"
                  className="flex items-center font-medium text-sm text-gray-500 hover:underline ">
                  <svg className="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                  </svg>
                  Reply
                </button>
              </div>
            </article>
            <article className="p-6 text-base bg-gray-50 border-t border-gray-200  ">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 font-semibold text-sm text-logo-green "><img
                    className="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                    alt="Helene Engels" />Helene Engels</p>
                  <p className="text-sm text-gray-600 "><time pubdate datetime="2022-06-23"
                    title="June 23rd, 2022">Jun. 23, 2022</time></p>
                </div>
                <button id="dropdownComment4Button" data-dropdown-toggle="dropdownComment4"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50  "
                  type="button">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
                <div id="dropdownComment4"
                  className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow">
                  <ul className="py-1 text-sm text-gray-700 "
                    aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100">Edit</a>
                    </li>
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100">Remove</a>
                    </li>
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100">Report</a>
                    </li>
                  </ul>
                </div>
              </footer>
              <p>Thanks for sharing this. I do came from the Backend development and explored some of the tools to design my Side Projects.</p>
              <div className="flex items-center mt-4 space-x-4">
                <button type="button"
                  className="flex items-center font-medium text-sm text-gray-500 hover:underline ">
                  <svg className="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                  </svg>
                  Reply
                </button>
              </div>
            </article>
          </section> */}
        </article>
      </div>
    </main>

    <aside aria-label="Related articles" className="pt-8 pb-6 lg:pt-24 lg:pb-16 bg-gray-100 ">
      <div className="px-4 mx-auto max-w-screen-xl">
        <h2 className="mb-8 text-2xl font-bold text-logo-green ">Other articles</h2>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {Articles.map((article, index) => {
            if (index < 4)
              return <button className="max-w-xs flex-col hover:scale-105 transition-all duration-150" onClick={() => {
                navigate(`/blog/${article['Heading ']}`)
                window.location.reload();
              }}>
                <img src={images[index + 1]} className="mb-5 rounded-lg max-h-72 w-full object-cover" alt="Image 4" />
                <h2 className="mb-4 text-xl font-bold leading-tight text-logo-green">
                  <a href="#">{article['Heading ']}</a>
                </h2>
                <p className="mb-4 text-gray-500">{article['Content'].length > 303 ? article['Content'].substring(0, 300) + "..." : article['Content']}</p>
              </button>
          })
          }
        </div>
      </div>
    </aside>

    <FooterX />
  </div>
}

export default Blog;