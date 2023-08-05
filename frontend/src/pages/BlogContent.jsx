import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios'
import { FaCalendarAlt } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";





export const BlogContent = () => {
  const {id} = useParams();
  const [blog,setBlog] = useState({});
  const [user,setUser] = useState({});
  const months = ["Jan", "Feb", "March", "April", "May","Jun", "Jul", "Aug","Sept","Oct","Nov","Dec"];
  let createdAt;

  
  async function getUserDetails() {
    const userObj = await axios.post('http://localhost:3000/user/userdetails',{blog_id: String(blog._id)});
    setUser(userObj.data);
  }

  useEffect(() => {
    async function getBlogContent() {
      const content = await axios.get(`http://localhost:3000/blogs/${id}`);
      setBlog(content.data);
    }
    getBlogContent();
  },[])
  
  useEffect(() => {
    if(Object.keys(blog).length !== 0) {
      getUserDetails();
    }
   
  },[blog]);


  const date = new Date(blog?.createdAt);
  const day = date.getDay();
  const monthNum = date.getMonth();
  const year = date.getFullYear()
  const month = months[monthNum];
  createdAt = `${month}-${day} ${year}`;
  
  return (
    <div className="flex justify-between w-full gap-12 p-10 px-20 overflow-hidden">
        <section className="border-4 border-black rounded-[40px] w-full h-fit flex flex-col px-10 pb-5 bg-white font-monsterrat">
          <div className="w-full mt-10 border-4 border-black h-[70vh] rounded-[40px] ml-auto mr-auto"></div>
          <h1 className="mt-5 text-4xl font-extrabold text-center">{blog?.title}</h1>
          <div className="flex items-center justify-center gap-5 text-xl font-bold">
            <FaCalendarAlt className="text-2xl mr-[-8px] mb-1"/>
            <h3>{createdAt}</h3>
            <div className="w-10 h-[5px] bg-[#f16363]"></div>
            <p className="my-5">{blog.category}</p>
          </div>
          <p>{blog?.content}</p>
        </section>
        <section className="sticky border-4 border-black rounded-[40px] min-w-[25vw] h-fit min-h-[70vh] flex flex-col items-center bg-white px-5 ">
          <div className="p-2 px-20 text-sm font-bold text-white bg-black rounded-b-3xl font-monsterrat">ABOUT ME</div>
          <div className="mt-5 border-4 border-black rounded-full h-52 w-52">
            <img />
          </div>
          <h1 className="mt-5 text-3xl font-extrabold">{user?.name || user?.email}</h1>
          <p className="self-start mt-4 mb-2 font-semibold break-all">{user?.description || "asdasdfafsnfksjafnksfnksfnksnfksnfksjfkasfnksaffskafsajfksafsfasffsfsfsfsf"}</p>
          <div className="flex gap-2 mt-auto mb-5 text-2xl">
            <BiLogoFacebook className="cursor-pointer"/>
            <BsTwitter className="cursor-pointer"/>
            <AiFillInstagram className="cursor-pointer"/>
            <AiFillLinkedin className="cursor-pointer"/>
          </div>
        </section>
     
    </div>
  )
}
