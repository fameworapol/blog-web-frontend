import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './App.css';
import NavbarComponent from './component/Navbar';
import { getUsername,getToken } from './middleware/authentication';

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
      title:'Do you want to delete the article?',
      icon:'warning',
      showCancelButton:true,
      showConfirmButton:true
    }).then((result)=>{
      if (result.isConfirmed === true) {
        Swal.fire("Deleted!","Deleted the article successfully.","success")
        axios.delete(`${url}/singleBlog/${slug}`,{headers:{authorization:`Bearer ${getToken()}`}}).then(response=>{
          Swal.fire("Deleted!",response.data.message,"success")
          fetchData()
        }).catch(err=>{
          console.log(err);
        })
      }
    })
  }

  return (
    <div className="container">
      <NavbarComponent />
      <h1>Blog Web</h1>
      {/* {getUsername() && (<button><a href="/create" style={{textDecoration:"none"}}><span className="button_top">write articles</span></a></button>)} */}
      <button><a href="/create" style={{textDecoration:"none"}}><span className="button_top">write articles</span></a></button>
      <hr />
      {blogs.map((elm: any, index: any) => (
        <div className="row" key={index} style={{ borderBottom: '1px solid silver' }}>
          <div className="col pt-3 pb-2 card">
            <Link to={`/singleBlog/${elm.slug}`} style={{color:"black"}}>
              <h2>{elm.title}</h2>
            </Link>
            <p>{elm.content.substring(0, 250)}</p>
            <p className="text-muted">Author : {elm.author} , Time : {new Date(elm.createdAt).toLocaleString()}</p>
            <div>
              {/* {getUsername() && (<div><button>
                <Link to={`/blog/edit/${elm.slug}`} style={{textDecoration:"none"}}><span className="button_top_update">Update</span></Link>
              </button> &nbsp;
              <button onClick={()=>{confirmDelete(elm.slug)}}>
                <span className="button_top_delete">Delete</span>
              </button></div>)} */}
              <button>
                <Link to={`/blog/edit/${elm.slug}`} style={{textDecoration:"none"}}><span className="button_top_update">Update</span></Link>
              </button> &nbsp;
              <button onClick={()=>{confirmDelete(elm.slug)}}>
                <span className="button_top_delete">Delete</span>
              </button>
            </div>
          </div>
        </div>
        
      ))}
    </div>
  )
}

export default App;
