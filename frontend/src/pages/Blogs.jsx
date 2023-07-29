import { useEffect } from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import { useRecoilState } from "recoil"
import { blogState } from './../store/atoms/blogAtom';

export const Blogs = () => {
    const [blogs,setBlogs] = useRecoilState(blogState);
    useEffect(() => {
        async function getBlogs() {
            try {
                const blogsObj = await axios.get("http://localhost:3000/blogs");
                const getBlogs = blogsObj?.data;
                setBlogs(getBlogs)
            } catch(err) {
                console.log(err);
            }
        }
        getBlogs();
    },[]);
    const navigate = useNavigate();
    return (
        <div>
            {blogs?.map(blog => (
                <div key = {blog._id}>
                    <p>{blog.title}</p>
                    <button onClick={() => navigate(`/blogs/${blog._id}`)}>Check Blog</button>
                </div>
            ))}
            <br />
            <button onClick={() => navigate("/blogs/addblog")}>Add blog</button>
        </div>
    )
}
