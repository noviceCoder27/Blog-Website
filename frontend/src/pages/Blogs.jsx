import { useEffect } from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import { useSetRecoilState } from "recoil"
import { blogState } from './../store/atoms/blogAtom';
import { Blog } from "./Blog";

export const Blogs = () => {
    const setBlogs = useSetRecoilState(blogState);
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
            <Blog />
            <button onClick={() => navigate("/blogs/addblog")}>Add blog</button>
        </div>
    )
}
