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
import Modal from "./Components/Modal/Modal"
function App() {
  return (
    <>
      <Header />
      <Modal />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard"  element={<Dashboard />}/>
        <Route path="/" element={<About />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/courseStat/:id" element={<CourseStat />} />
        <Route path="/courses" element={<Main />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App


