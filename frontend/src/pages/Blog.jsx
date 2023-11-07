/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { blogState } from './../store/atoms/blogAtom';
import { FaCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";




export const Blog = ({index,blog,id,url}) => {
    const months = ["Jan", "Feb", "March", "April", "May","Jun", "Jul", "Aug","Sept","Oct","Nov","Dec"];
    const navigate = useNavigate();
    const blogs = useRecoilValue(blogState);
    const [user,setUser] = useState({});
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
        try {
            const userObj = await axios.post("http://localhost:3000/user/userdetails", {blog_id: String(id)});
            const getUser = userObj.data;
            setUser(getUser);
        } catch(err) {
            console.log(err);
        }
       }
       getUser(); 
    },[])
    
    
    return (
        <>
            <div className="flex items-center justify-center gap-5 font-bold border-b-4 border-black font-monsterrat">
                <FaCalendarAlt className="text-2xl mr-[-8px] mb-1"/>
                <p className="my-5">{createdAt[index]}</p>
                <div className="w-10 h-[5px] bg-[#f16363]"></div>
                <p className="my-5">{blog.category}</p>
                </div>
                <div className="flex flex-col p-8">
                    <div className=" border-4 border-black rounded-[40px] flex ">
                    {!url && <img src = "https://www.appliedart.com/assets/images/blog/blogging-SMB.png" alt = "Blog Image" className="w-full rounded-[35px] "/>}
                     {url && <img src = {url} alt = "Blog Image" className="w-full rounded-[35px] "/>}
                    </div>
                         
                    <div className="m-5 text-center">
                        <h2 className="text-2xl font-extrabold font-monsterrat">{blog.title}</h2>
                        <h3 className="font-extrabold font-monsterrat">{user.name || user.email}</h3>
                        <p className="font-semibold font-monsterrat">{blog.content.slice(0,50)}</p>
                    </div>
                    <div className="flex items-center self-center gap-5">
                        <div className="w-20 h-[5px] bg-black"></div>
                        <button onClick={() => navigate(`/blogs/${blog._id}`)} className="bg-[#ffcc00] p-2 px-6 rounded-3xl font-bold font-monsterrat border-4 border-black hover:bg-gray-200">
                                    READ MORE
                        </button>
                    <div className="w-20 h-[5px] bg-black"></div>
                    </div>
            </div>
            
        </>
    )
}
