import axios from "axios";
import { useState } from "react";
import Swal from 'sweetalert2';
import NavbarComponent from "./Navbar";
import { getUsername,getToken } from "../middleware/authentication";

export default function FromComponent() {
    const url: string = "http://localhost:8000/api"
    const [formstate, setformstate] = useState({
        title: "",
        content: "",
        author: getUsername()
    });
    const { title, content, author } = formstate
    const inputValue = (name: string) => (event: any) => {
        setformstate({ ...formstate, [name]: event.target.value })
        console.log(event.target.value, ":", name)
    }
    function submitForm() {
        axios.post(`${url}/blog`, { title: title, content: content, author: author },{headers:{authorization:`Bearer ${getToken()}`}}).then(response => {
            Swal.fire(
                'Notifacation',
                'Article Saved!',
                'success'
            )
            console.log(response);
            setformstate({ ...formstate, title: "", content: "", author: "" })
        }).catch(err => {
            console.log(err.response.data.error);
            Swal.fire({
                icon: 'error',
                title: `${err}`,
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        })
    }
    return (
        <div className="container">
            <NavbarComponent />
            <form onSubmit={submitForm}>
                <div className="input-container">
                    <label>Title</label>
                    <input className="input" name="text" type="text" value={title} onChange={(event) => inputValue("title")(event)}/>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>
                <br />
                <div className="form-group">
                    <label>Content</label>
                    <textarea cols={30} rows={10} style={{display:"flex",width:"100%",borderColor:"black",borderWidth:"4px"}} value={content} onChange={(event)=>inputValue("content")(event)}></textarea>
                </div>
                <br />
                <div className="input-container">
                    <label>Author</label>
                    <input className="input" name="text" type="text" value={author} onChange={(event)=>inputValue("author")(event)}/>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>
                <br/>
                <button type="submit" value={"save"}>
                    <a href="/create" style={{textDecoration:"none"}}><span className="button_top">Save</span></a>
                </button>
            </form>
        </div>
    )
}