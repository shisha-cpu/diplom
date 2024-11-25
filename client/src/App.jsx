import Header from "./Components/Header/Header"
import { Route , Routes } from "react-router-dom"
import Login from "./Pages/Auth/Login"
import Register from "./Pages/Auth/Register"
import Dashboard from "./Pages/Dashboard/Dashboard"
import Main from "./Pages/Main/Main"
import CourseDetail from "./Pages/FullCourse/CourseDetail"
import CourseStat from "./Pages/Stat/CourseStat"
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route  path="login" element={<Login />} />
        <Route  path="register" element={<Register />} />
        <Route path="dashboard"  element={<Dashboard />}/>
        <Route path="/" element={<Main />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/courseStat/:id" element={<CourseStat />} />
      </Routes>
    </>
  )
}

export default App


