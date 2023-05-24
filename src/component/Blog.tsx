import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarComponent from "./Navbar";
interface SingleBlog{
    author: string,
    content:string,
    createdAt:Date,
    slug:string,
    title:string,
    updatedAt:Date,
    __v:number,
    _id:number
}
export default function SingleBlogComponent(props: any) {
    const [blog, setblog] = useState<SingleBlog>();
    const slug = useParams().slug;
    const url = "http://localhost:8000/api"
    useEffect(() => {
        //ส่ง request ไปที่ API เพื่อร้องขอข้อมูลบทความที่เราสนใจ => ส่ง request ไปที่ http://localhost:5000/api/Singleblog/slug
        axios.get(`${url}/singleBlog/${slug}`).then(response => {
            setblog(response.data)
        }).catch(err => alert(err))
    }, [])
    return (
        <div className="container">
            <NavbarComponent />
            {blog &&
                <div>
                    <h1>{blog.title}</h1>
                    <div>{blog.content}</div>
                    <p className="text-muted">ผู้เขียน : {blog.author} , เผยเเพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
                </div>
            }
        </div>
    )
}