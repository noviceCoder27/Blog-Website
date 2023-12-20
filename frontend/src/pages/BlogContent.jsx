import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios'
import { FaCalendarAlt } from "react-icons/fa"
import { Loader } from "../components/Loader";
import { BsPencilSquare } from "react-icons/bs";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { SiGooglelens } from "react-icons/si";
import { MdCloudUpload } from "react-icons/md";
import { getFromLocalStorage } from "../utils/getFromLocalStorage";
import parse from 'html-react-parser'





export const BlogContent = () => {
  const {id} = useParams();
  const [blog,setBlog] = useState(null);
  const [user,setUser] = useState(null);
  const [currentUser,setCurrentUser] = useState(null);
  const [userDetials,setUserDetails] = useState({userName: "", userDescription: ""});
  const [toggleUserName,setToggleUsername] = useState(false);
  const [toggleUserDescription,setToggleUserDescription] = useState(false);
  const [selectedFile,setSelectedFile] = useState(null);
  const [uploadFileToggle,setUploadFileToggle] = useState(false);
  const months = ["Jan", "Feb", "March", "April", "May","Jun", "Jul", "Aug","Sept","Oct","Nov","Dec"];
  let createdAt;


  useEffect(() => {
    async function getBlogContent() {
      try {
        const content = await axios.get(`http://localhost:3000/blogs/${id}`);
        setBlog(content.data);
      } catch(err) {
        console.log(err);
      }
    }
    getBlogContent();
  },[])
  
  useEffect(() => {
    if(blog) {
      getUserDetails();
      if(localStorage.getItem("token")) {
        getCurrentUser();
      }
    }
  },[blog]);


  
  async function getUserDetails() {
    try {
      const userObj = await axios.post('http://localhost:3000/user/userdetails',{blog_id: String(blog._id)});
      setUser(userObj.data);
      setUserDetails({userName: user?.name, userDescription: user?.description})
    } catch(err) {
      console.log(err);
    }
  }

  const getCurrentUser = async() => {
    try {
      const userObj = await axios.get('http://localhost:3000/user/getUser',{
        headers: {
          "Authorization": "Bearer " + getFromLocalStorage()
        }
      });
      if(blog.user_id === userObj.data._id) {
        setCurrentUser(userObj.data); 
      }
    } catch(err) {
      console.log("Failed to fetch current user", err);
    }
  }
    
  async function updateCredentials() {
   
    try {
      const userObj = await axios.put("http://localhost:3000/user/updateCredentials",userDetials, {
        headers: {
          "Authorization": "Bearer "+ getFromLocalStorage()
        }
      });
      const getUser = userObj.data;
      if(getUser) {
        setUser(prev => ({name: getUser.updatedUsername,description: getUser.updatedDescription,email: prev.email}));
      }
    } catch(err) {
      console.log(err);
    }
   
  }

  const handleFileChange = async (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadFileToggle(true);
}

const fileUpload = async () => {
    if (!selectedFile) {
        setUploadFileToggle(false);
        return;
      }

    // Create form data object and append file
    const formData = new FormData();
    formData.append('profilePicture', selectedFile);

    // Send PUT request to server with form data
    try {
      await axios.put(`http://localhost:3000/user/profilePic`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": "Bearer " + getFromLocalStorage() 
        }
      });
      console.log('Profile picture updated successfully');
    } catch (err) {
      console.error(err);
    }
    setUploadFileToggle(false);
}


  const date = new Date(blog?.createdAt);
  const day = date.getDay();
  const monthNum = date.getMonth();
  const year = date.getFullYear()
  const month = months[monthNum];
  createdAt = `${month}-${day} ${year}`;

  if(!blog || !user) {
    return (
      <div className="flex justify-center mt-10">
        <Loader />  
      </div>
      
    )
  }

  
  return (
    <div className="flex justify-between w-full gap-12 p-10 px-20 overflow-visible max-lg:flex-col">
        <section className="border-4 border-black rounded-[40px] w-full h-fit flex flex-col px-10 pb-5 bg-white font-monsterrat border-b-8">
          <div className="w-full mt-10 border-4 border-black h-[70vh] rounded-[40px] ml-auto mr-auto flex">
            {blog?.blogImage && <img src = {blog?.blogImage} alt = "Blog image" className="rounded-[35px] w-full"/>}
            {!blog?.blogImage && <img src = "https://www.appliedart.com/assets/images/blog/blogging-SMB.png" alt = "Blog image" className="rounded-[35px]"/>}
          </div>
          <h1 className="mt-5 text-4xl font-extrabold text-center">{blog?.title}</h1>
          <div className="flex items-center justify-center gap-5 text-xl font-bold">
            <FaCalendarAlt className="text-2xl mr-[-8px] mb-1"/>
            <h3>{createdAt}</h3>
            <div className="w-10 h-[5px] bg-[#f16363]"></div>
            <p className="my-5">{blog.category}</p>
          </div>
          <p className="border-none tiptap">{parse(blog?.content)}</p>
        </section>
        <section className="lg:sticky lg:top-5 border-4 border-black rounded-[40px] min-w-[25vw] h-fit min-h-[60vh] flex flex-col items-center bg-white px-5 border-b-8">
          <div className="p-2 px-20 text-sm font-bold text-white bg-black rounded-b-3xl font-monsterrat">ABOUT ME</div>
          <div className={`relative flex flex-col items-center justify-center mt-5 border-4 border-black rounded-full h-52 w-52 ${currentUser && "hover:opacity-50"}`}>
            <img src = {user?.profilePicture || 'https://i0.wp.com/365webresources.com/wp-content/uploads/2016/09/FREE-PROFILE-AVATARS.png?resize=502%2C494&ssl=1'} alt = "Profile Picture" className="w-full h-full rounded-full"/>
            {currentUser && !uploadFileToggle && 
              <div className="absolute text-3xl opacity-0 cursor-pointer hover:opacity-100">
                  <SiGooglelens className="translate-x-5 translate-y-10"/>
                  <input type="file" onChange={(e) => handleFileChange(e)} className="file:cursor-pointer text-white text-[1px] file:text-[5px] file:p-3 ml-2 opacity-0"/>
              </div>
            }
            {uploadFileToggle && <MdCloudUpload onClick={fileUpload} className="absolute text-3xl cursor-pointer"/>}
          </div>
          <div className="flex items-center">
            {!toggleUserName && <h1 className="mt-5 text-3xl font-extrabold" >{user?.name || user?.email}</h1>}
            {toggleUserName && <input type="text" className="p-2 px-6 mt-5 ml-6 border-2 border-gray-500 rounded-md" onChange={(e) => setUserDetails(prev => ({userName: e.target.value, userDescription: prev.userDescription}))}/>}
            {!toggleUserName && currentUser && <BsPencilSquare className="cursor-pointer hover:text-[#f16363]" onClick={() => setToggleUsername(true)}/>}
            {toggleUserName && <button className="mt-10 ml-2 text-xl hover:text-[#f16363]" onClick={() => {
              setToggleUsername(false);
              updateCredentials();
              }}><BsFillHandThumbsUpFill /></button>}
          </div>
          <div className="flex items-center w-full">
            <div className="flex justify-center w-full bg-red">
              {user?.description && !toggleUserDescription && localStorage.getItem("token") && <p className="self-start mt-4 mb-2 font-semibold break-all">{user?.description}</p>}
              {user?.description && !toggleUserDescription && !localStorage.getItem("token") &&  <p className="self-start mt-4 mb-2 font-semibold break-all">{user?.description}</p>}
              {!user?.description && !toggleUserDescription && localStorage.getItem("token") && <p className="mt-5 font-monsterrat">Add a description</p>}
              {!user?.description && !toggleUserDescription && !localStorage.getItem("token") && <i className="mt-5 font-monsterrat ">No description</i>}
              {!toggleUserDescription && currentUser && <BsPencilSquare className="min-w-[20px] min-h-[20px] cursor-pointer hover:text-[#f16363] " onClick={() => setToggleUserDescription(true)}/>}
              {toggleUserDescription && <textarea className="w-full mt-5 mb-4 ml-6 border-2 border-gray-500 rounded-md zw-full h-52" onChange={(e) => setUserDetails(prev => ({userName: prev.userName, userDescription: e.target.value}))}></textarea>}
              {toggleUserDescription && <button className="ml-2 text-xl mt-auto mb-5 hover:text-[#f16363]" onClick={() => {
                setToggleUserDescription(false);
                updateCredentials();
                }}><BsFillHandThumbsUpFill /></button>}
            </div>
          </div>
        </section>       
    </div>
  )
}
