import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {Home} from './pages/Home.jsx'
import { Login } from './pages/Login';
import { Register } from './pages/Register.jsx';
import { UserBlogs } from './pages/UserBlogs.jsx';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';

function App() {
 

  return (
    <Router>
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/login' element = {<Login />} />
        <Route path = '/register' element = {<Register />} />
        <Route path = '/userblogs' element = {<UserBlogs />} />
        <Route path = '/blogs' element = {<Blogs />} />
        <Route path = '/blogs/:id' element = {<Blog />} />
      </Routes>
    </Router>
  )
}

export default App
