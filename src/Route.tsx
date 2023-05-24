import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import FromComponent from "./component/Form"
import SingleBlogComponent from "./component/Blog"
import EditComponent from "./component/Edit"
import Login from "./component/Login"

export default function Myroute() {
    return (
        <div className="route">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App/>}/>
                    <Route path='/create' element={<FromComponent/>}/>
                    <Route path="/SingleBlog/:slug" element={<SingleBlogComponent/>}/>
                    <Route path="/blog/edit/:slug" element={<EditComponent/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}