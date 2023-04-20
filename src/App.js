import { Routes, Route } from "react-router-dom";
import Admin from "./routes/admin/Admin";
import User from "./routes/user/User";
import Home from "./components/homepage/Home";
import Signup from "./pages/User/signup/SignUp";
import Content from "./components/content/content";
import Login from "./pages/User/login/Login";
import Dashboard from "./pages/User/dashboard/Dashboard";
import Fund from "./pages/User/fundapplication/Fund";
import ProtectRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Profile from "./pages/User/profile/Profile";
import Info from "./pages/User/info/Info";
import AdminDasboard from "./pages/Admin/dashboard/AdminDashboard";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Routes>

      //userroute
        <Route path="/" element={<Home />}></Route>
        <Route path="user" element={<User />}>
          <Route path="/user/" element={<Content />}></Route>
          <Route path="signup" element={<PublicRoute><Signup /></PublicRoute>}></Route>
          <Route path="login" element={<PublicRoute><Login /></PublicRoute>}></Route>
        </Route>
        <Route path="userdashboard" element={<ProtectRoute ><Dashboard /></ProtectRoute>}>
          <Route path="/userdashboard/" element={<Info />}></Route>
          <Route path="request-for-fund" element={<Fund />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>

        //admin
        <Route path="admin" element={<Login />}></Route>
        <Route path="admindashboard" element={<AdminDasboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
