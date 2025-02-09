import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home/HomePage";
import ProjectManagementPage from "./Pages/AdminAccess/ProjectManagementPage";
// import UsersPage from "./Pages/Users/UsersPage";
// import HelpPage from "./Pages/Help/HelpPage";
import LogoutPage from "./Pages/Logout/LogoutPage";
import LoginPage from "./Pages/Login/LoginPage";
// import UserPage from "./Pages/Users/UserPage";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard/logout" element={<LogoutPage />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />

          <Route path="/dashboard/project-management" element={<ProjectManagementPage />} />
          {/* <Route path="/dashboard/user-page" element={<UserPage />} />
          <Route path="/dashboard/help" element={<HelpPage />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
