import { useEffect } from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from "recoil"
import { blogState } from './../store/atoms/blogAtom';
import { Blog } from "./Blog";
import { SearchBar } from './../components/SearchBar';
import { searchState } from './../store/atoms/searchAtom';

export const Blogs = () => {
    const setBlogs = useSetRecoilState(blogState);
    const search = useRecoilValue(searchState);
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
        <>  
            {!search && 
            <>
                 <section className="flex flex-wrap justify-center gap-5 mt-20">
                <Blog />
                </section>
                <button onClick={() => navigate("/blogs/addblog")}>Add blog</button>
            </>}
            {search && <SearchBar />}
        </>
       
    )
}
