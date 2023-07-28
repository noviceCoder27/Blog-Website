import { useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios'

export const Blog = () => {
  const {id} = useParams();
  useEffect(() => {
    async function getBlogContent() {
      const content = await axios.get(`http://localhost:3000/blogs/${id}`);
    }
    getBlogContent();
  })
  return (
    <div>Blog</div>
  )
}
