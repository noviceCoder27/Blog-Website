/* eslint-disable react/prop-types */




export const Form = ({email,setEmail,password,setPassword,signin}) => {

    return (
        <form>
            <label htmlFor="email">Email :</label>
            <input type = "text" name = "email" value = {email} onChange = {(e) => {setEmail(e.target.value)}}/>
            <label htmlFor="password">Password: </label>
            <input type = "text" name = "password" value = {password} onChange = {(e) => {setPassword(e.target.value)}}/>
            <button onClick={(e) => signin(e)}>Send</button>
        </form>
    )
}
