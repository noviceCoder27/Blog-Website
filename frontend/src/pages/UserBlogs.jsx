import axios from "axios";
import { useEffect, useState } from "react"

export const UserBlogs = () => {
  const [userBlogs,setUserBlogs] = useState([]);
  useEffect(() => {
    async function getUserBlogs() {
      try {
        const userBlogsObj = await axios.get("https://blog-website-f31m.onrender.com/blogs/getBlogs/me", {
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
