import { useNavigate } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil";
import {getUserEmail} from '../store/selectors/user'
import { userState } from "../store/atoms/userAtom";
import { blogState } from './../store/atoms/blogAtom';


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
        <header>
            <h1>BLogPost</h1>
            {!userEmail && <button onClick={() => navigate("/register")}>Sign up</button>}
            {!userEmail && <button onClick={() => navigate("/login")}>Sign in</button>}
            {userEmail && <button onClick={logout}>Sign out</button>}
            <br />
            <br />
        </header>
    )
}
