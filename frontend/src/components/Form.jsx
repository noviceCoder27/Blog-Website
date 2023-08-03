/* eslint-disable react/prop-types */




export const Form = ({email,setEmail,password,setPassword,signin}) => {

    return (
        <form className="flex flex-col items-center max-lg:justify-center max-lg:min-h-[80vh]">
            <label htmlFor="email" className="mt-5 translate-x-[-12vw] font-monsterrat font-bold">Email :</label>
            <input type = "text" name = "email" value = {email} onChange = {(e) => {setEmail(e.target.value)}} className="text-center min-w-[30vw] bg-[#eeeeee] p-2 py-3 border-black border-4 rounded-[50px] font-monsterrat text-lg font-bold mb-4 lg:flex-1" placeholder="Enter your email"/>
            <label htmlFor="password" className="translate-x-[-11.5vw] font-monsterrat font-bold" >Password: </label>
            <input type = "text" name = "password" value = {password} onChange = {(e) => {setPassword(e.target.value)}} className="text-center min-w-[30vw] bg-[#eeeeee] p-2 py-3 border-black border-4 rounded-[50px] font-monsterrat text-lg font-bold mb-4 lg:flex-1" placeholder="Enter your password"/>
            <button onClick={(e) => signin(e)} className="p-2 py-3 px-10 rounded-[50px] border-4 border-black font-monsterrat font-extrabold text-lg bg-[#ffcc00] hover:bg-gray-300 ">Send</button>
        </form>
    )
}
