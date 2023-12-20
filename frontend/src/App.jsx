import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {Home} from './pages/Home.jsx'
import { Login } from './pages/Login';
import { Register } from './pages/Register.jsx';
import { UserBlogs } from './pages/UserBlogs.jsx';
import { BlogContent } from './pages/BlogContent';
import { Navbar } from './components/Navbar.jsx';
import { CreateBlog } from './pages/CreateBlog';
import { ProtectedRoutes } from './middleware/ProtectedRoutes';
import './index.css'

function App() {
  return (
    <div className='min-h-screen bg-[#fff5cf] flex flex-col'>
      <Router>
        <Navbar />
        <Routes>
          <Route path = '/' element = {<Home />} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/register' element = {<Register />} />
          <Route path = '/userblogs' element = {<ProtectedRoutes><UserBlogs /></ProtectedRoutes>} />
          <Route path = '/blogs/:id' element = {<BlogContent />} />
          <Route path = '/blogs/addblog' element = {<ProtectedRoutes><CreateBlog/></ProtectedRoutes>} />
        </Routes>
      </Router>
    </div>
    
  )
}

export default App
