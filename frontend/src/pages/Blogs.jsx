import { useEffect } from "react"
import axios from "axios"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { blogState } from './../store/atoms/blogAtom';
import { Blog } from "./Blog";
import { SearchBar } from './../components/SearchBar';
import { searchState } from './../store/atoms/searchAtom';
import { Loader } from "../components/Loader";



export const Blogs = () => {
    const search = useRecoilValue(searchState);
    const blogs = useRecoilValue(blogState);
    const setBlogs = useSetRecoilState(blogState);
    useEffect(() => {
        async function getBlogs() {
            try {
                const blogsObj = await axios.get("http://localhost:3000/blogs");
                const getBlogs = blogsObj?.data;
                setBlogs(getBlogs);
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
                 <section className="flex gap-5 py-6 max-xl:flex-wrap md:m-10 max-md:m-4 max-md:justify-center">
                    {blogs.map((blog,index) => (
                    <article key = {blog._id} className="mx-4 min-sm:min-w-[450px] bg-white max-sm:w-full lg:w-[35vw] lg:max-w-[500px] min-h-[500px] border-4 border-black border-b-[12px] rounded-[40px] flex flex-col">
                        <Blog index = {index} blog = {blog} id = {blog._id} url = {blog.blogImage}/>
                    </article>
                ))}
                </section>
            </>}
            {search && <SearchBar />}
        </>
       
    )
}
