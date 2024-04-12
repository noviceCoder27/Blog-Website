import axios from "axios";
import { useEffect, useState } from "react"
const backend_url = import.meta.env.VITE_BACKEND_URL



export const UserBlogs = () => {
  const [userBlogs,setUserBlogs] = useState([]);
  useEffect(() => {
    async function getUserBlogs() {
      try {
        const userBlogsObj = await axios.get(`${backend_url}/blogs/getBlogs/me`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });
        const getUserBlogs = userBlogsObj?.data;
        setUserBlogs(getUserBlogs); 
      } catch(err) {
        console.log(err);
      }  
    }
    getUserBlogs();
  },[]);
  return (
    <>{userBlogs?.map(blog => (
      <div key = {blog._id}>
        {blog.title}<br />
        {blog.content}<br />
        {blog.category}<br />
      </div>
    ))}</>
  )
}
