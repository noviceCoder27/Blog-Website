import { ImCross } from "react-icons/im";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { searchState } from "../store/atoms/searchAtom";
import { blogState } from "../store/atoms/blogAtom";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SiMicrodotblog } from "react-icons/si";




export const SearchBar = () => {
  const [searchInput,setSearchInput] = useState("");
  const [filteredBlogs,setFilteredBlogs] = useState([]);
  const setSearchState = useSetRecoilState(searchState);
  const currentBlogs = useRecoilValue(blogState);
  useEffect(() => {
    const newFilteredBlogs = currentBlogs.filter(blog =>
      blog.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredBlogs(newFilteredBlogs);
  }, [searchInput, currentBlogs]);
  
  const displayBlogs = useMemo(() => filteredBlogs?.map(blog => (
    <div key ={blog._id} className="flex items-center gap-2 p-4 bg-white border-4 border-black rounded-full p w-fit">
      <Link to = {`/blogs/${blog._id}`} className="font-bold font-monsterrat hover:text-[#f16363]">{blog.title}</Link>
      <SiMicrodotblog />
    </div>
  )),[filteredBlogs]);
  
  return (
    <div className="absolute top-0 bg-[#fff5cf] w-full min-h-screen ">
        <div className="flex p-10 max-lg:justify-center max-lg:flex-col lg:items-center">
            <ImCross className="absolute text-2xl cursor-pointer right-10 top-10 hover:text-gray-500 " onClick={() => setSearchState(prev => !prev)}/>
            <input type="text" value = {searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Type atlest one character to search" className="text-center bg-[#eeeeee] mt-16 p-2 py-3 border-black border-4 rounded-[50px]  font-monsterrat text-lg font-bold mb-4 lg:flex-1"/>
            <button className="p-2 py-3 rounded-[50px] lg:mt-16 border-4 border-black lg:border-b-2 lg:border-t-2 font-monsterrat font-extrabold text-lg bg-[#ffcc00] hover:bg-gray-300 lg:absolute lg:right-0 lg:mr-10 lg:mb-4 lg:px-10">SEARCH</button>
        </div>
        <div className="flex flex-wrap gap-4 mx-10">
          {displayBlogs}
        </div>
        
    </div>
  )
}
