import { useNavigate } from "react-router-dom"

export const Navbar = () => {
    const navigate = useNavigate();
    return (
        <header>
            <h1>BLogPost</h1>
            <button onClick={() => navigate("/register")}>Sign up</button>
            <button onClick={() => navigate("/login")}>Sign in</button>
            <br />
            <br />
        </header>
    )
}
