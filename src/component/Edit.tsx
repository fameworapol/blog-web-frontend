import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarComponent from "./Navbar";
import { getToken } from "../middleware/authentication";

export default function EditComponent(props: any) {
    let url = "http://localhost:8000/api"
    const slug = useParams().slug;
    const [formstate, setformstate] = useState({
        title: "",
        content: "",
        author: "",
        slug: ""
    });
    const { title, content, author } = formstate

    //get data
    function getData() {
        axios.get(`${url}/singleBlog/${slug}`).then(response => {
            const { title, content, author, slug } = response.data
            setformstate({ ...formstate, title, content, author, slug })
        }).catch(err => { alert(err) })
    }
    useEffect(() => {
        getData()
    }, [])

    const inputValue = (name: string) => (event: any) => {
        console.log(name, event.target.value);
        setformstate({ ...formstate, [name]: event.target.value })
    }
    const showUpdateForm = () => (
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
                <textarea cols={30} rows={10} className="form-control" style={{display:"flex",width:"100%",borderColor:"black",borderWidth:"4px"}} value={content} onChange={(event)=>inputValue("content")(event)}></textarea>
            </div>
            <br />
            <div className="input-container">
                    <label>Author</label>
                    <input className="input" name="text" type="text" value={author} onChange={(event)=>inputValue("author")(event)}/>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>
            {/* <input type="submit" value={"อัพเดต"} className="btn btn-primary" /> */}
            <br />
            <button type="submit" value={"อัพเดต"}>
                <a href="/create" style={{textDecoration:"none"}}><span className="button_top_update">Update</span></a>
            </button>
        </form>
    )

    function submitForm(e:React.FormEvent) {
        e.preventDefault()
        axios.put(`${url}/singleBlog/${slug}`,{title:title,content:content,author:author},{headers:{authorization:`Bearer ${getToken()}`}}).then(response=>{
            Swal.fire(
                'แจ้งเตือน',
                'อัพเดตข้อมูลเรียบร้อย',
                'success'
            )
            const {title,content,author,slug} = response.data
            setformstate({...formstate,title:title,content:content,author:author,slug:slug})
        }).catch(err=>{
            Swal.fire({
                icon: 'error',
                title: `error`,
                text: `${err}`,
                footer: '<a href="">Why do I have this issue?</a>'
            })
        })
    }

    return (
        <div className="container">
            <NavbarComponent />
            <h1>Edit Article</h1>
            {showUpdateForm()}
        </div>
    )
}