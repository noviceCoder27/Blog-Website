import { useEffect } from "react"
import axios from "axios"


export const Blogs = () => {
    useEffect(() => {
        async function getBlogs() {
            try {
                const blogs = await axios.get("http://localhost:3000/blogs");
                console.log(blogs);
            } catch(err) {
                console.log(err);
            }
        }
        getBlogs();
    },[])
    return (
        <div>

        </div>
    )
}
