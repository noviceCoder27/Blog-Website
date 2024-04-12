import { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form } from "../components/Form";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/userAtom";
import { setLocalStorageValue } from "../utils/setLocalStorageValue";
const backend_url = import.meta.env.VITE_BACKEND_URL



export const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const setUser = useSetRecoilState(userState);

    const login = useCallback(async (e) => {
        e.preventDefault();
        const user = {email,password};
        try {
            const registered = await axios.post(`${backend_url}/user/login`,user);
            const registeredUser = registered.data;
            setLocalStorageValue("token", registeredUser.token);
            setUser(registeredUser.user);
            navigate("/");
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
