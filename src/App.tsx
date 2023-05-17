import axios from 'axios';
import './App.css';
import NavbarComponent from './component/NavbarComponents';
import {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
function App() {
  const [blogs, setblogs] = useState([{
    title: "",
    content: "",
    author: ""
  }])
  const url: string = "http://localhost:8000/api"
  function fetchData() {
    axios.get(`${url}/allBlog`).then(response => {
      setblogs(response.data)
    }).catch(err => alert(err))
  }
  useEffect(() => {
    fetchData()
  }, [])
  
  function confirmDelete(slug:any) {
    Swal.fire({
      title:'คุณต้องการลบบทความหรือไม่?',
      icon:'warning',
      showCancelButton:true,
      showConfirmButton:true
    }).then((result)=>{
      if (result.isConfirmed === true) {
        Swal.fire("Deleted!","ลบบทความเรียบร้อย","success")
        axios.delete(`${url}/singleBlog/${slug}`).then(response=>{
          Swal.fire("Deleted!",response.data.message,"success")
          fetchData()
        }).catch(err=>{
          console.log(err);
        })
      }
    })
  }

  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>Mern Stack Workshop</h1>
      <a className="btn btn-primary" href="/create">เขียนบทความ</a>
      {blogs.map((elm: any, index: any) => (
        <div className="row" key={index} style={{ borderBottom: '1px solid silver' }}>
          <div className="col pt-3 pb-2">
            <Link to={`/singleBlog/${elm.slug}`}>
              <h2>{elm.title}</h2>
            </Link>
            <p>{elm.content.substring(0, 250)}</p>
            <p className="text-muted">ผู้เขียน:{elm.author} , เผยเเพร่ : {new Date(elm.createdAt).toLocaleString()}</p>
            <button className="btn btn-outline-danger" onClick={()=>{confirmDelete(elm.slug)}}>ลบบทความ</button> &nbsp;
            <button className="btn btn-outline-success" >อัพเดตบทความ</button>
          </div>
        </div>
        
      ))}
    </div>
  )
}

export default App;
