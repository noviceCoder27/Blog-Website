import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const CreateBlog = () => {
    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [category,setCategory] = useState("");
    const [selectedImage,setSelectedImage] = useState(null);

    async function createBlog(e) {
        e.preventDefault();
        const blog = {title,content,category};
        const formData = new FormData();
        formData.append("blogImage",selectedImage);
        formData.append("blog",JSON.stringify(blog));
        const postBlog = await axios.post("http://localhost:3000/blogs",formData, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(postBlog);
        navigate("/");
    }

    async function getFile(e) {
        e.preventDefault();
        setSelectedImage(e.target.files[0]);
    }

    return (
        <form className="flex flex-col p-20 h-fit">
            <section className="relative flex gap-5 w-[50%] max-sm:flex-col" >
                <div>
                    <label className="text-xl font-bold font-monsterrat">Title: </label>
                    <input type = "text" value = {title} onChange={(e) => setTitle(e.target.value)} className=" mt-4 text-center min-w-[20vw]  p-2 py-3 border-black border-4 rounded-[20px] font-monsterrat text-lg font-bold mb-4 lg:flex-1" placeholder="Enter a title for your blog"/>
                </div>
                <div>
                    <label className="ml-2 text-xl font-bold font-monsterrat">Category: </label>
                    <select name="category" id="category" value = {category} onChange={(e) => setCategory(e.target.value)}  className="mt-4 text-center min-w-[20vw]  p-2 py-3 border-black border-4 rounded-[20px] font-monsterrat text-lg font-bold mb-4 lg:flex-1 cursor-pointer ">
                        <option value = ""></option>
                        <option value="food">Food</option>
                        <option value="tech">Technology</option>
                        <option value="travel">Travel</option>
                        <option value="business">Business</option>
                    </select>
                </div>
            </section>
            <section className="h-[60vh] mb-20 relative" >
                <label className="self-start mt-2 text-xl font-bold font-monsterrat">Content: </label>
                <textarea value = {content} onChange={(e) => setContent(e.target.value)} className="mt-4 min-w-[20vw]  p-2 py-3 border-black border-4 rounded-[20px] font-monsterrat text-lg  mb-4 lg:flex-1 w-full h-full pb-20"></textarea>
                <input type="image" src="https://cdn-icons-png.flaticon.com/512/1375/1375157.png" alt="Gallery icon" className="absolute bottom-0 w-10 p-1 translate-y-4 rounded-md cursor-pointer left-5 opacity-90" onClick={(e) => {e.preventDefault()}}/>
                <input type = "file" className="absolute bottom-0 z-10 p-2 translate-y-5 file:w-10 file:opacity-0 left-5 file:cursor-pointer" onChange={(e) => getFile(e)} />
            </section>
            <button type = "submit" onClick={(e) => createBlog(e)} className="p-2 py-3 px-10 rounded-[50px] border-4 border-black font-monsterrat font-extrabold text-lg bg-[#ffcc00] hover:bg-gray-300 self-center">Create Blog</button>
        </form>
    )
}
