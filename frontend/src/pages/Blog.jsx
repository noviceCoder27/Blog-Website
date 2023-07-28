import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios'

export const Blog = () => {
  const {id} = useParams();
  const [blog,setBlog] = useState({});
  useEffect(() => {
    async function getBlogContent() {
      const content = await axios.get(`http://localhost:3000/blogs/${id}`);
      const getBlog = content.data;
      setBlog(getBlog);
    }
    getBlogContent();
  })
  return (
    <>
      {blog.title}<br />
      {blog.content}<br />
      {blog.category}<br />
    </>
  )
}
