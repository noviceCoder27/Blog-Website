import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { blogState } from './../store/atoms/blogAtom';


export const Blog = () => {
    const months = ["Jan", "Feb", "March", "April", "May","Jun", "Jul", "Aug","Sept","Oct","Nov","Dec"];
    const navigate = useNavigate();
    const blogs = useRecoilValue(blogState);
    const createdAt = [];
    for(const blog of blogs) {
        createdAt.push(blog.createdAt);
    }
    if(createdAt.length !== 0) {
        for(let i = 0; i < createdAt.length; i++) {
            const date = new Date(createdAt[i]);
            const day = date.getDay();
            const monthNum = date.getMonth();
            const year = date.getFullYear()
            const month = months[monthNum];
            createdAt[i] = `${month}-${day} ${year}`;
        }
    }


    
    return (
        <>
            {blogs.map((blog,index) => (
                <div key = {blog._id}>
                    <div className="flex gap-5">
                        <p>{createdAt[index]}</p>
                        <p>{blog.category}</p>
                    </div>
                   
                    <p>{blog.title}</p>
                    <button onClick={() => navigate(`/blogs/${blog._id}`)}>
                        Read More
                    </button>
                </div>
            ))}
            
        </>
    )
}
