import { useEffect, useState } from "react"
import NavbarComponent from "./Navbar"
import axios from "axios"
import Swal from "sweetalert2"
import { authentication,getUsername } from "../middleware/authentication"


export default function Login(props:any) {
    const [loginState, setloginState] = useState({
        username: "",
        password: ""
    })
    const { username, password } = loginState

    const inputValue=(name:string)=>(event:any)=>{
        setloginState({...loginState,[name]:event.target.value})
    }

    function submitForm() {
        axios.post(`http://localhost:8000/api/login`,{username:username,password:password}).then(response=>{
            authentication(response)
            Swal.fire("เข้าสู่ระบบเรียบร้อยแล้ว","login completed!",'success')
        }).catch(err=>{
            Swal.fire('เเจ้งเตือน',err.response.data.error,'error')
            console.log(err.response.data.error);
        })
        
    }

    useEffect(() => {
        if (getUsername()) {
            return window.location.replace("/");
        }
    }, [])
    

    return (
        <div className="container">
            <NavbarComponent />
            <h1>Login</h1>
            <form onSubmit={submitForm}>
                <div className="input-container">
                    <label>Username</label>
                    <input className="input" name="text" type="text" value={username} onChange={(event) => inputValue("username")(event)} />
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>
                <br />
                <div className="input-container">
                    <label>Password</label>
                    <input className="input" name="text" type="text" value={password} onChange={(event) => inputValue("password")(event)} />
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div><br />
                <button type="submit" value={"save"}>
                    <a href="/create" style={{textDecoration:"none"}}><span className="button_top">Login</span></a>
                </button>
                <br/>
                <p>password for admin : admin13579</p>
            </form>
        </div>
    )
}