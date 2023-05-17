import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import FromComponent from "./component/FormComponent"
import SingleBlogComponent from "./component/SingleBlogComponent"

export default function Myroute() {
    return (
        <div className="route">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App/>}/>
                    <Route path='/create' element={<FromComponent/>}/>
                    <Route path="/SingleBlog/:slug" element={<SingleBlogComponent/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}