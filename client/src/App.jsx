import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Post from './pages/Post'
import CreatePost from './pages/CreatePost'
import Profile from './pages/Profile'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path='login' element={<Login />} /> */}
          <Route index path='*' element={<Login />} />
          <Route index path='/home' element={<Home />} />
          <Route index path='/blog/*' element={<Blog />} />
          <Route index path='/post/*' element={<Post />} />
          <Route index path='/create' element={<CreatePost />} />
          <Route index path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
