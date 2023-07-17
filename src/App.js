import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar"
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import AuthRoute from "./components/core/Auth/AuthRoute"
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error404 from "./pages/Error404"
import Settings from "./components/core/Dashboard/settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import AddCourse from "./components/core/Dashboard/addCourse";
import MyCourses from "./components/core/Dashboard/myCourses";
import Category from "./pages/Category";
import Course from "./pages/Course";
import Cart from "./pages/Cart";
import ViewCourse from "./pages/ViewCourse";
import VideoComponent from "./components/core/viewCourse/VideoComponent";
import InstructorDashboard from "./components/core/Dashboard/instructorDash";

import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from "react";

// import dotenv from "dotenv";
// dotenv.config();



function App() {
  const googleClientId = `${process.env.REACT_APP_GOOGLE_CID}`

  useEffect(()=>{

    console.log("Client id google -> ",googleClientId);
  })

  return (

    <GoogleOAuthProvider clientId={googleClientId}>     

      <div className='bg-richblack-900 w-screen min-h-screen 
      relative mx-auto flex flex-col font-inter  '>

        <Navbar/>
        
        <Routes>

          <Route path="/" element={<Home></Home>}></Route>

          <Route path="/login" element={
            <AuthRoute>
              <Login/>
            </AuthRoute>
          }/>


          <Route path="/signup" element={
            <AuthRoute>
              <Signup/>
            </AuthRoute>
          }/>

          <Route path="/verify-email" element={
            <AuthRoute>
              <VerifyEmail/>
            </AuthRoute>
          }/>

          <Route path="/forgot-password" element={
            <AuthRoute>
              <ForgotPassword/>
            </AuthRoute>
          }/>


          <Route path="/resetPassword/:id" element={
            <AuthRoute>
              <UpdatePassword/>
            </AuthRoute>
          }/>

          <Route path="/about" element={<About/>}/>

          <Route path="/contact" element={<Contact/>}/>




          <Route element= {
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
            
          }> {/* add account type validations */}
            <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
            <Route path="/dashboard/settings" element={<Settings/>}/>
            <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>

            <Route path="/dashboard/add-course" element={<AddCourse/>}/>
            <Route path="/dashboard/instructor" element={<InstructorDashboard/>}/>
            <Route path="/dashboard/my-courses" element={<MyCourses/>}/>

          </Route>

          

          <Route path="/category/:categoryName" element={<Category/>}/>
          <Route path="/course/:courseId" element={<Course/>}/>
          <Route path="/dashboard/cart" element={<Cart/>}/>


          <Route element={
            <PrivateRoute>
              <ViewCourse/>
            </PrivateRoute>
          }>

            <Route path="/view-course/:courseId/section/:sectionId/subSection/:subSectionId" element={<VideoComponent/>}/>

          </Route>



          <Route path="*" element={<Error404/>}/>



        </Routes>

      </div>

    </GoogleOAuthProvider>
  );
}

export default App;
