import { useLocation } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import axios from "axios";
import User from "../assets/Images/guy.png"

import { useState } from "react";

const Post = () => {
  const location = useLocation();
  const [pid, setPid] = useState(location.pathname.split('/').pop());
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPost();
    console.log("XZY");
    // getComments();
  }, [])

  async function getPost() {
    try {
      const data = await axios.post(`${import.meta.env.VITE_API_BASE}/post/get-post`, { pid }, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } });
      setPost(data.data.post)
      setComments(data.data.comments)
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  // async function getComments() {
  //   try {
  //     const data = await axios.post(`${import.meta.env.VITE_API_BASE}/post/get-comments`, { pid }, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } });
  //     setComments(data.data.commentObject);
  //     console.log(data.data);
  //   } catch (error) {
  //     setComments([]);
  //     console.log(error);
  //   }
  // }

  async function handleComment(e) {
    e.preventDefault();

    const data = await axios.post(`${import.meta.env.VITE_API_BASE}/post/comment`, { pid, comment }, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } });
    console.log(data.data);
  }

  return <div className="bg-gradient min-h-svh">
    <Navbar />
    <div className="wrapper pt-10 px-0 flex flex-col items-center ">
      <article className="mb-4 break-inside p-6 rounded-xl bg-gray-50 flex flex-col bg-clip-border sm:w-3/6 w-full shadow-lg">
        <div className="flex pb-6 items-center justify-between">
          <div className="flex items-center">
            <a className="inline-block mr-4" href="#">
              <img className="rounded-full max-w-none w-10 h-10" src={User} />
            </a>
            <div className="flex flex-col">
              <div>
                <a className="inline-block text-sm font-bold text-logo-green" href="#">@{post?.anonymousName}</a>
              </div>
              <div className="text-slate-500 text-xs">
                {post?.datetime}
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-logo-green">
          {post?.title}
        </h2>
        <p className="mt-3">
          {post?.text}
        </p>
        {/* <div className="py-4">
          <a className="inline-flex items-center" href="#">
            <span className="mr-2">
              <svg className="fill-rose-600" style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                <path
                  d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                </path>
              </svg>
            </span>
            <span className="text-lg font-bold text-logo-green">{post?.likes} Helps</span>
          </a>
        </div> */}

        {/* Comments */}
        <section className="bg-transparent py-7 lg:py-14 antialiased">
          <div className="mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-xl font-bold text-logo-green">Helpful Responses (20)</h2>
            </div>
            <form className="mb-6" onSubmit={handleComment}>
              <div className="py-2 px-4 mb-4 bg-transparent rounded-lg rounded-t-lg border border-gray-200">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea id="comment" rows="1"
                  className="px-0 w-full text-sm text-logo-green border-0 focus:ring-0 focus:outline-none bg-transparent"
                  value={comment} onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..." required></textarea>
              </div>
              <button type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-logo-green text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800">
                Post comment
              </button>
            </form>

            {comments.length > 0 ? comments?.map((comment, index) =>
              <article className="p-6 text-base bg-gray-100 rounded-lg mb-2" key={index}>
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-logo-green font-semibold"><img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                      alt="Helene Engels" />@{comment.name}</p>
                    <p className="text-sm text-gray-600"><time pubdate datetime="2022-06-23"
                      title="June 23rd, 2022">{comment.datetime}</time></p>
                  </div>
                  {/* <button id="dropdownComment4Button" data-dropdown-toggle="dropdownComment4"
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                      type="button">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                      </svg>
                    </button>
                    <div id="dropdownComment4"
                      className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow">
                      <ul className="py-1 text-sm text-gray-700"
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
                    </div> */}
                </footer>
                <p className="text-gray-500">{comment.text}</p>
              </article>
            )
              :
              <div>
                No Comments.
              </div>
            }

          </div>
        </section>

      </article>
    </div>
  </div>
}

export default Post;