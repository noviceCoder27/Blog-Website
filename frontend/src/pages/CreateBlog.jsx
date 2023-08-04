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
        navigate("/");
    }

    return (
        <form className="flex flex-col p-20 h-fit">
            <section className="relative flex gap-5 w-[50%]" >
                <div>
                    <label className="text-xl font-bold font-monsterrat">Title: </label>
                    <input type = "text" value = {title} onChange={(e) => setTitle(e.target.value)} className=" mt-4 text-center min-w-[20vw] bg-[#eeeeee] p-2 py-3 border-black border-4 rounded-[20px] font-monsterrat text-lg font-bold mb-4 lg:flex-1" placeholder="Enter a title for your blog"/>
                </div>
                <div>
                    <label className="ml-2 text-xl font-bold font-monsterrat">Category: </label>
                    <select name="category" id="category" value = {category} onChange={(e) => setCategory(e.target.value)}  className="mt-4 text-center min-w-[20vw] bg-[#eeeeee] p-2 py-3 border-black border-4 rounded-[20px] font-monsterrat text-lg font-bold mb-4 lg:flex-1 cursor-pointer ">
                        <option value = ""></option>
                        <option value="food">Food</option>
                        <option value="tech">Technology</option>
                        <option value="travel">Travel</option>
                        <option value="business">Business</option>
                    </select>
                </div>
            </section>
            <section className="h-[60vh] mb-20">
                <label className="self-start mt-2 text-xl font-bold font-monsterrat">Content: </label>
                <textarea value = {content} onChange={(e) => setContent(e.target.value)} className="mt-4 min-w-[20vw] bg-[#eeeeee] p-2 py-3 border-black border-4 rounded-[20px] font-monsterrat text-lg  mb-4 lg:flex-1 w-full h-full" />
            </section>
            <button type = "submit" onClick={(e) => createBlog(e)} className="p-2 py-3 px-10 rounded-[50px] border-4 border-black font-monsterrat font-extrabold text-lg bg-[#ffcc00] hover:bg-gray-300 self-center">Create Blog</button>
        </form>
    )
}
