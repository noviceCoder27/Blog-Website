import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form } from "../components/Form";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/userAtom";
import { setLocalStorageValue } from "../utils/setLocalStorageValue";



export const Register = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const setUser = useSetRecoilState(userState);


    const register = async (e) => {
        e.preventDefault();
        const user = {email,password};
        try {
            const registered = await axios.post("http://localhost:3000/user/register",user);
            const registeredUser = registered.data;
            setLocalStorageValue("token", registeredUser.token);
            setUser(registeredUser.user);
            navigate("/");
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <>
            <Form email = {email} setEmail = {setEmail} password = {password} setPassword = {setPassword} signin = {register}/>
        </>
    )
}