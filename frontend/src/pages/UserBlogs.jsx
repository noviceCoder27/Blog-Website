import axios from "axios";
import { useEffect } from "react"

export const UserBlogs = () => {
  useEffect(() => {
    async function getUserBlogs() {
      try {
        const userBlogs = await axios.get("http://localhost:3000/me");
        console.log(userBlogs);
      } catch(err) {
        console.log(err);
      }  
    }
    getUserBlogs();
  },[]);
  return (
    <div>UserBlogs</div>
  )
}
