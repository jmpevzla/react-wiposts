import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomeView from "@/home/view/HomeView";
import LoginView from "@/login/view/LoginView";
import RegisterView from "@/register/view/RegisterView";
import EditView from "@/profile/view/EditView";
import PhotoView from "@/profile/view/PhotoView";
import ShowView from "@/profile/view/ShowView";
import ChangePassword from "@/profile/view/ChangePassword";

export default AppView

function AppView() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomeView />} />
          <Route path="login" element={<LoginView />} />
          <Route path="register" element={<RegisterView />} />
          <Route path="recover-password" element={<div />} />
          <Route path="profile">
            <Route index element={<ShowView />} />
            <Route path="edit" element={<EditView />} />
            <Route path="photo" element={<PhotoView />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="post/:id" element={<div />}>
            <Route index element={<div />} />
            <Route path="edit" element={<div />} />
          </Route>
          <Route path="create/:id">
            <Route index element={<div />} />
            <Route path="description" element={<div />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}