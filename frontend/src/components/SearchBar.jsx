import { ImCross } from "react-icons/im";



export const SearchBar = () => {
  return (
    <div className="absolute bg-[#fff5cf] flex w-full min-h-screen p-10 max-lg:justify-center max-lg:flex-col lg:items-center">
        <ImCross className="absolute text-2xl cursor-pointer right-10 top-10 hover:text-gray-500"/>
        <input type="text" placeholder="Type atlest one character to search" className="text-center bg-[#eeeeee] p-2 py-3 border-black border-4 rounded-[50px]  font-monsterrat text-lg font-bold mb-4 lg:flex-1"/>
        <button className="p-2 py-3 rounded-[50px] border-4 border-black font-monsterrat font-extrabold text-lg bg-[#ffcc00] hover:bg-gray-300 lg:absolute lg:right-0 lg:mr-10 lg:mb-3 lg:px-10">SEARCH</button>
    </div>
  )
}
