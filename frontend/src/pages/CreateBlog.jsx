import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const CreateBlog = () => {
    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [category,setCategory] = useState("");

    async function createBlog(e) {
        e.preventDefault();
        const blog = {title,content,category};
        console.log(blog);
        const postBlog = await axios.post("http://localhost:3000/blogs",blog, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        console.log(postBlog);
        navigate("/blogs");
    }

    return (
        <form>
            <label>Title: </label>
            <input type = "text" value = {title} onChange={(e) => setTitle(e.target.value)}/>
            <label>Content: </label>
            <textarea value = {content} onChange={(e) => setContent(e.target.value)}/>
            <label>Category: </label>
            <select name="category" id="category" value = {category} onChange={(e) => setCategory(e.target.value)}>
                <option></option>
                <option value="food">Food</option>
                <option value="tech">Technology</option>
                <option value="travel">Travle</option>
                <option value="business">Business</option>
            </select>
            <button type = "submit" onClick={(e) => createBlog(e)}>Create Blog</button>
        </form>
    )
}
