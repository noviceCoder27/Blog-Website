import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {Home} from './pages/Home.jsx'
import { Login } from './pages/Login';
import { Regisater } from './pages/Regisater';
import { UserBlogs } from './pages/UserBlogs.jsx';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';

function App() {
 

  return (
    <Router>
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/login' element = {<Login />} />
        <Route path = '/register' element = {<Regisater />} />
        <Route path = '/userblogs' element = {<UserBlogs />} />
        <Route path = '/blogs' element = {<Blogs />} />
        <Route path = '/blogs/:id' element = {<Blog />} />
      </Routes>
    </Router>
  )
}

export default App
