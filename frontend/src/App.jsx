import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {Home} from './pages/Home.jsx'
import { Login } from './pages/Login';
import { Register } from './pages/Register.jsx';
import { UserBlogs } from './pages/UserBlogs.jsx';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';
import { Navbar } from './components/Navbar.jsx';
import { CreateBlog } from './pages/CreateBlog';

function App() {
 
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/login' element = {<Login />} />
        <Route path = '/register' element = {<Register />} />
        <Route path = '/userblogs' element = {<UserBlogs />} />
        <Route path = '/blogs' element = {<Blogs />} />
        <Route path = '/blogs/:id' element = {<Blog />} />
        <Route path = '/blogs/addblog' element = {<CreateBlog />} />
      </Routes>
    </Router>
  )
}

export default App
