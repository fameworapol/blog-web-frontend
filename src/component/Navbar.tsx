import { Link } from "react-router-dom";
import { getUsername,logout } from '../middleware/authentication'
export default function NavbarComponent(props:any) {
    return (
       <div className="card-navbar">
            <ul className="item">
                <li className="pr-3 pt-3 pb-3"><Link to="/" className="nav-link"  style={{color:"white"}}>Home</Link></li>
                <li className=" pr-3 pt-3 pb-3"><Link to="/create" className="nav-link" style={{color:"white"}}>write articles</Link></li>
                {!getUsername() && (<li className="nav-item pr-3 pt-3 pb-3"><Link to="/login" className="nav-link" style={{color:"white"}}>Login</Link></li>)}
                {getUsername() && (<li className="nav-item pr-3 pt-3 pb-3" onClick={logout} ><button style={{color:"white"}}>ออกจากระบบ</button></li>)}
            </ul>
       </div>
    )
}