import {useState } from "react"
import axios from "axios"

export const Register = () => {
    async function register() {
        const user = {email,password};
        try {
            const registered = await axios.post("http://localhost:3000/user/register",user);
            const registeredUser = registered.data;
            localStorage.setItem("token", registeredUser.token);
        } catch(err) {
            console.log(err);
        }
        
    }
   
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    return (
        <>
        Email:
        <input type = "text" value = {email} onChange = {(e) => {setEmail(e.target.value)}}/>
        Password:
        <input type = "text" value = {password} onChange = {(e) => {setPassword(e.target.value)}}/>
        <button onClick={register}>Send</button>
        </>
    )
}
