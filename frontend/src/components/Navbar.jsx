import { useNavigate,useLocation } from "react-router-dom"
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/userAtom";
import { blogState } from './../store/atoms/blogAtom';
import Logo from '../public/logo.png'
import Underline from '../public/bg.svg'
import { FaSearch } from "react-icons/fa"
import { FaBars } from "react-icons/fa"
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import { useState } from "react";
import { searchState } from './../store/atoms/searchAtom';
import axios from "axios";
import { getFromLocalStorage } from "../utils/getFromLocalStorage";

const backend_url = import.meta.env.VITE_BACKEND_URL


export const Navbar = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const setUser = useSetRecoilState(userState);
    const setBlogs = useSetRecoilState(blogState);
    const [showNav,setShowNav] = useState(false);
    const [mobileNav,setMobileNav] = useState({category: false, account: false});
    const [categoryNav,setCategoryNav] = useState(false);
    const [accountNav,setAccountNav] = useState(false);
    const setSearchState = useSetRecoilState(searchState);

    async function getAllBlogs() {
        try {
            const blogsObj = await axios.get(`${backend_url}/blogs`);
            const getBlogs = blogsObj?.data;
            setBlogs(getBlogs);
            navigate("/");
        } catch(err) {
            console.log(err);
        }
    }
    

    async function myBlogs() {
        try {
            const getBlogsObj = await axios.get(`${backend_url}/blogs/getBlogs/me`,{
                headers: {
                    "Authorization": "Bearer " + getFromLocalStorage() 
                }
            });
            const getBlogs = getBlogsObj.data;
            setBlogs(getBlogs);
            navigate("/");
        } catch(err) {
            console.log(err);
        }
    }
    
    async function searchByCategory(category) {
        try {
            const getBlogsObj = await axios.get(`${backend_url}/blogs/showAll/${category}`);
            const getBlogs = getBlogsObj.data;
            setBlogs(getBlogs);
            navigate("/");
        } catch(err) {
            console.log(err);
        }
    }

    
    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser({});
        setBlogs([]);
        navigate("/login");
    }

    const categoryStyles = {
        "display": categoryNav ? "block": "none",
    }
    
    const accountStyles = {
        "display": accountNav ? "block": "none",
    }

    const mobileCategory = {
        "display": mobileNav.category ? "block": "none",
    }
    
    const mobileAccount = {
        "display": mobileNav.account ? "block": "none",
    }

    

    return (
        <header className="h-[20%] flex flex-col lg:flex-col lg:items-center lg:justify-center p-3 bg-[#fff] lg:bg-[#fff5cf] w-full border-b-4 border-black lg:border-b-0">
            <div className= {`flex justify-between w-full ml-auto mr-auto lg:w-fit lg:justify-center lg:mt-10 ${pathname === "/" ? "lg:translate-x-[80px]":""}`}>
                <img src = {Logo} className= "w-[15vw] max-w-[200px] min-w-[100px]" />
                {pathname === "/" && <div className="flex items-center gap-5">
                   <button className="flex items-center gap-2 ml-20 font-extrabold font-monsterrat">
                        <span className="max-lg:hidden">SEARCH</span>
                        <FaSearch className="text-xl cursor-pointer lg:mb-1" onClick={() => setSearchState(prev => !prev)}/>
                    </button>
                    <FaBars className="text-2xl cursor-pointer lg:hidden" onClick={() =>setShowNav(prevNav => !prevNav)}/>
                </div>}
            </div>
            <img src = {Underline} className="w-[22%] min-w-[130px] block max-lg:hidden max-w-[300px]"/>
            <nav className={`text-xl font-extrabold leading-10 transition duration-500 ease-out transform lg:hidden origin-top ${showNav ? 'scale-y-100' : 'scale-y-0'} ${showNav ? 'h-full' : 'h-0'} ${showNav ? 'mt-10' : 'mt-0'} font-monsterrat`}>
                <div className="cursor-pointer hover:text-[#f16363]" onClick={() => navigate("/")}>Home</div>
                <div className="flex justify-between">
                    <div className="cursor-pointer hover:text-[#f16363]">Categories</div>
                    {!mobileNav.category && <BiSolidRightArrow className="cursor-pointer" onClick={() =>setMobileNav(prev => ({...prev, category: !prev.category}))}/>}
                    {mobileNav.category && <BiSolidDownArrow className="cursor-pointer" onClick={() =>setMobileNav(prev => ({...prev, category: !prev.category}))}/>}
                </div>
                <div style = {mobileCategory}>
                        <div className="hover:text-[#f16363] text-black cursor-pointer" onClick={() => searchByCategory("food")}>Food</div>
                        <div className="hover:text-[#f16363] text-black cursor-pointer" onClick={() => searchByCategory("tech")}>Technology</div>
                        <div className="hover:text-[#f16363] text-black cursor-pointer" onClick={() => searchByCategory("travel")}>Travel</div>
                        <div className="hover:text-[#f16363] text-black cursor-pointer" onClick={() => searchByCategory("business")}>Business</div>
                </div>
                <div className="cursor-pointer hover:text-[#f16363]" onClick={() => navigate("/blogs/addblog")}>Create Blog</div>
                <div className="flex justify-between">
                    <div className="cursor-pointer hover:text-[#f16363]">Account</div>
                    {!mobileNav.account && <BiSolidRightArrow className="cursor-pointer" onClick={() =>setMobileNav(prev => ({...prev, account: !prev.account}))}/>}
                    {mobileNav.account && <BiSolidDownArrow className="cursor-pointer" onClick={() =>setMobileNav(prev => ({...prev, account: !prev.account}))}/>}
                </div>
                <div className="" style={mobileAccount}>
                        {!localStorage.getItem("token") && <div className="hover:text-[#f16363] text-black cursor-pointer" onClick={() => navigate("/register")}>Register</div>}
                        {!localStorage.getItem("token") && <div className="hover:text-[#f16363] text-black cursor-pointer" onClick={() => navigate("/login")}>Sign In</div>}
                        {localStorage.getItem("token") && <div className="hover:text-[#f16363] text-black cursor-pointer" onClick={logout}>Sign Out</div>}
                        {localStorage.getItem("token") && <div className="hover:text-[#f16363] text-black cursor-pointer" onClick={myBlogs}>My Blogs</div>}
                    </div>
            </nav>
            <nav className="flex items-center gap-5 p-4 px-20 mt-10 text-xl font-extrabold leading-10 bg-white rounded-[50px] font-monsterrat max-lg:hidden border-4 border-black border-b-[10px] before:w-10 before:h-2 before:border-2 before:border-black before:translate-x-[-80px] before:bg-black after:w-10 after:h-2 after:border-2 after:border-black after:translate-x-[80px] after:bg-black">
                <div className="cursor-pointer hover:text-[#f16363]" onClick={getAllBlogs}>Home</div>
                <div className="relative flex items-center justify-between gap-2 cursor-pointer hover:text-[#f16363]" onClick={() => {
                    setCategoryNav(prev => !prev)
                    setAccountNav(false)}}>
                    <div>Categories</div>
                    <BiSolidDownArrow className="text-sm cursor-pointer"/>
                    <div className="absolute z-20 px-10 py-4 translate-x-[-20px] bg-white top-16 border-4 border-black rounded-b-xl" style={categoryStyles}>
                        <div className="hover:text-[#f16363] text-black" onClick={() => searchByCategory("food")}>Food</div>
                        <div className="hover:text-[#f16363] text-black" onClick={() => searchByCategory("tech")}>Technology</div>
                        <div className="hover:text-[#f16363] text-black" onClick={() => searchByCategory("travel")}>Travel</div>
                        <div className="hover:text-[#f16363] text-black" onClick={() => searchByCategory("business")}>Business</div>
                    </div>
                </div>
                <div className="cursor-pointer hover:text-[#f16363]" onClick={() => navigate("/blogs/addblog")}>Create Blog</div>
                <div className="flex items-center justify-between gap-2 hover:text-[#f16363] relative" onClick={() => {
                    setAccountNav(prev => !prev)
                    setCategoryNav(false)}}>
                    <div className="cursor-pointer">Account</div>
                    <BiSolidDownArrow className="text-sm cursor-pointer "/>
                    <div className="absolute z-20 px-10 w-48 py-4 translate-x-[-20px] bg-white top-16 border-4 border-black rounded-b-xl" style={accountStyles}>
                        {!localStorage.getItem("token") && <div className="hover:text-[#f16363] text-black cursor-pointer" onClick={() => navigate("/register")}>Register</div>}
                        {!localStorage.getItem("token") && <div className="hover:text-[#f16363] text-black cursor-pointer" onClick={() => navigate("/login")}>Sign In</div>}
                        {localStorage.getItem("token") && <div className="hover:text-[#f16363] text-black cursor-pointer" onClick={logout}>Sign Out</div>}
                        {localStorage.getItem("token") && <div className="hover:text-[#f16363] text-black cursor-pointer" onClick={myBlogs}>My Blogs</div>}
                    </div>
                </div>
            </nav>
        </header>
    )
}
