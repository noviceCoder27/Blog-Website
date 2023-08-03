import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { blogState } from './../store/atoms/blogAtom';
import { FaCalendarAlt } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";




export const Blog = () => {
    const months = ["Jan", "Feb", "March", "April", "May","Jun", "Jul", "Aug","Sept","Oct","Nov","Dec"];
    const navigate = useNavigate();
    const blogs = useRecoilValue(blogState);
    const createdAt = [];
    for(const blog of blogs) {
        createdAt.push(blog.createdAt);
    }
    if(createdAt.length !== 0) {
        for(let i = 0; i < createdAt.length; i++) {
            const date = new Date(createdAt[i]);
            const day = date.getDay();
            const monthNum = date.getMonth();
            const year = date.getFullYear()
            const month = months[monthNum];
            createdAt[i] = `${month}-${day} ${year}`;
        }
    }

    useEffect(() => {
       async function getUser() {
        const user = await axios.get("http://localhost:3000/user/getUser");
        console.log(user);
       }
       getUser(); 
    },[])



    
    return (
        <>
            {blogs.map((blog,index) => (
                <article key = {blog._id} className="mx-4 bg-white max-sm:w-full lg:w-[30vw] min-h-[600px] border-4 border-black border-b-[12px] rounded-[40px] flex flex-col">
                    <div className="flex items-center justify-center gap-5 font-bold border-b-4 border-black font-monsterrat">
                        <FaCalendarAlt className="text-2xl mr-[-8px] mb-1"/>
                        <p className="my-5">{createdAt[index]}</p>
                        <div className="w-10 h-[5px] bg-[#f16363]"></div>
                        <p className="my-5">{blog.category}</p>
                    </div>
                    <div className="flex flex-col p-8">
                        <img src = "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt = "Blog Image" className="border-4 border-black rounded-[40px] ml-auto mr-auto"/>
                    
                    <div className="m-5 text-center">
                            <h2 className="text-2xl font-extrabold font-monsterrat">{blog.title}</h2>
                            <h3 className="font-extrabold font-monsterrat">MUGDHA</h3>
                            <p className="font-semibold font-monsterrat">{blog.content}</p>
                    </div>
                    <div className="flex items-center self-center gap-5">
                        <div className="w-20 h-[5px] bg-black"></div>
                        <button onClick={() => navigate(`/blogs/${blog._id}`)} className="bg-[#ffcc00] p-2 px-6 rounded-3xl font-bold font-monsterrat border-4 border-black hover:bg-gray-200">
                            READ MORE
                        </button>
                        <div className="w-20 h-[5px] bg-black"></div>
                    </div>
                        
                    </div>
                    
                </article>
            ))}
            
        </>
    )
}
