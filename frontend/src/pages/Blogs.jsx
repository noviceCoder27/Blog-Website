import { useEffect } from "react"
import axios from "axios"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { blogState } from './../store/atoms/blogAtom';
import { Blog } from "./Blog";
import { SearchBar } from './../components/SearchBar';
import { searchState } from './../store/atoms/searchAtom';
import { Loader } from "../components/Loader";



export const Blogs = () => {
    const setBlogs = useSetRecoilState(blogState);
    const search = useRecoilValue(searchState);
    const blogs = useRecoilValue(blogState);
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
    
    if(blogs.length === 0) {
        return (
            <div className="flex justify-center mt-10">
                <Loader />
            </div>
        )
    }
    return (
        <>  
            {!search && 
            <>
            
                 <section className="flex flex-wrap justify-center gap-5 mt-20 mb-5">
                    {blogs.map((blog,index) => (
                    <article key = {blog._id} className="mx-4 bg-white max-sm:w-full lg:w-[30vw] min-h-[600px] border-4 border-black border-b-[12px] rounded-[40px] flex flex-col">
                        <Blog index = {index} blog = {blog} id = {blog._id}/>
                    </article>
                ))}
                </section>
            </>}
            {search && <SearchBar />}
        </>
       
    )
}
