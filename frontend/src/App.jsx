import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar';
import Createblog from './pages/Createblog';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Routes,Route} from 'react-router-dom'
import ViewBlogs from './pages/ViewBlogs'
import UserPage from './pages/MyBlogs'
import AdminPage from './pages/AdminPage'
import MyBlogs from './pages/MyBlogs'
import ViewBlog from './pages/ViewBlog'
import EditBlog from './pages/EditBlog'
function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div>
      <Navbar/>
  
        <Routes>
          <Route path ="/" element={<Home/>}/>
          <Route path ="/a" element={<Login/>}/>
          <Route path ="/s" element={<Signup/>}/>
          <Route path ="/c" element={<Createblog/>}/>
          <Route path ="/b" element={<ViewBlogs/>}/>
          <Route path ="/u" element={<MyBlogs/>}/>
          <Route path ="/d" element={<AdminPage/>}/>
          <Route path="/blog/:id" element={<ViewBlog/>}/>
          <Route path="/edit/:id" element={<EditBlog/>}/>
        </Routes>
    
    </div>
    
  );
}

export default App
