import { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form } from "../components/Form";

export const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const login = useCallback(async (e) => {
        e.preventDefault();
        const user = {email,password};
        try {
            const registered = await axios.post("http://localhost:3000/user/login",user);
            const registeredUser = registered.data;
            localStorage.setItem("token", registeredUser.token);
            navigate("/blogs");
        } catch(err) {
            console.log(err);
        }
    },[email,password]);

    return (
        <>
        <Form email = {email} setEmail = {setEmail} password = {password} setPassword = {setPassword} signin = {login}/>
        </>
    )
}
