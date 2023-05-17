export default function NavbarComponent() {
    return (
       <div className="nav-container">
            <ul className="nav nav-tabs bg-dark">
            <li className="nav-item pr-3 pt-3 pb-3"><a href="/" className="nav-link"  style={{color:"white"}}>หน้าเเรก</a></li>
            <li className="nav-item pr-3 pt-3 pb-3"><a href="/create"  className="nav-link" style={{color:"white"}}>เขียนบทความ</a></li>
            </ul>
       </div>
    )
}