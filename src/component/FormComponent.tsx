import { useState } from "react";
import NavbarComponent from "./NavbarComponents";
import axios from "axios";
import Swal from 'sweetalert2'

export default function FromComponent() {
    const url: string = "http://localhost:8000/api"
    const [formstate, setformstate] = useState({
        title: "",
        content: "",
        author: ""
    });
    const { title, content, author } = formstate
    const inputValue = (name: string) => (event: any) => {
        setformstate({ ...formstate, [name]: event.target.value })
        console.log(event.target.value, ":", name)
    }
    function submitForm() {
        axios.post(`${url}/blog`, ({ title: title, content: content, author: author })).then(response => {
            Swal.fire(
                'แจ้งเตือน',
                'บันทึกข้อมูลเรียบร้อย',
                'success'
            ) //ให้ alert ข้อมูลว่า "บันทึกข้อมูลเรียบร้อย" ถ้าบันทึกข้อมูลได้สำเร็จ
            console.log(response);
            setformstate({ ...formstate, title: "", content: "", author: "" })
        }).catch(err => {
            console.log(err.response.data.error);
            Swal.fire({
                icon: 'error',
                title: `${err}`,//นำค่าจาก key error ในฝั่ง server ที่กำหนดไว้
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        })
        // axios({method: 'post',url: `${url}/blog`,data: {title: title, content: content, author: author}})
        // .then(response=>{
            
        //     console.log(response.data);
        // }).catch(err=>{
        //     console.log(err.response.data.error);
        // })
    }
    return (
        <div className="container p-5 mb-3">
            <NavbarComponent />
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text" className="form-control" value={title} onChange={inputValue("title")} />
                </div>
                <div className="form-group">
                    <label>รายละเอียดบทความ</label>
                    <textarea cols={30} rows={10} className="form-control" value={content} onChange={inputValue("content")}></textarea>
                </div>
                <div className="form-group">
                    <label>ชื่อผู้เขียน</label>
                    <input type="text" className="form-control" value={author} onChange={inputValue("author")} />
                </div>
                <input type="submit" value={"บันทึก"} className="btn btn-primary" />
            </form>
        </div>

    )
}