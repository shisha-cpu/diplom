import Header from "./Components/Header/Header"
import { Route , Routes } from "react-router-dom"
import Login from "./Pages/Auth/Login"
import Register from "./Pages/Auth/Register"
import Dashboard from "./Pages/Dashboard/Dashboard"
import Main from "./Pages/Main/Main"
import CourseDetail from "./Pages/FullCourse/CourseDetail"
import CourseStat from "./Pages/Stat/CourseStat"
import About from "./Pages/About/About"
import Contact from "./Pages/Contact/Contact"
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard"  element={<Dashboard />}/>
        <Route path="/" element={<Main />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/courseStat/:id" element={<CourseStat />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App


