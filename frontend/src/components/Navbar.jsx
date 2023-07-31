import { useNavigate } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil";
import {getUserEmail} from '../store/selectors/user'
import { userState } from "../store/atoms/userAtom";
import { blogState } from './../store/atoms/blogAtom';
import Logo from '../public/logo.png'
import Underline from '../public/bg.svg'
import { FaSearch } from "react-icons/fa"
import { FaBars } from "react-icons/fa"


export const Navbar = () => {
    const navigate = useNavigate();
    const userEmail = useRecoilValue(getUserEmail);
    const setUser = useSetRecoilState(userState);
    const setBlogs = useSetRecoilState(blogState);
    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser({});
        setBlogs([]);
        navigate("/login");
    }

    return (
        <header className="h-[20%] flex lg:flex-col items-center lg:justify-center p-3 bg-[#fff] lg:bg-[#fff5cf] w-full border-b-4 border-black lg:border-b-0">
            <div className="flex justify-between w-full lg:justify-center">
                <img src = {Logo} className="w-[15vw] max-w-[200px] min-w-[100px]"/>
                <div className="flex items-center gap-5">
                    <button className="flex items-center gap-2 ml-20 font-extrabold font-monsterrat">
                        <span className="max-lg:hidden">SEARCH</span>
                        <FaSearch className="text-xl cursor-pointer lg:mb-1"/>
                    </button>
                    <FaBars className="text-2xl cursor-pointer"/>
                </div>
                
            </div>
            <img src = {Underline} className="w-[22%] min-w-[130px] block max-lg:hidden"/>
            {/* {!userEmail && <button onClick={() => navigate("/register")}>Sign up</button>}
            {!userEmail && <button onClick={() => navigate("/login")}>Sign in</button>}
            {userEmail && <button onClick={logout}>Sign out</button>} */}
        </header>
    )
}
