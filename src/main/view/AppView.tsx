import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomeView from "@/home/view/HomeView";
import LoginView from "@/login/view/LoginView";
import RegisterView from "@/register/view/RegisterView";
import ChangePassword from "@/profile/view/ChangePassword";
import RecPasswordView from "@/recoverPassword/view/RecPasswordView";
import RecPasswordCodeView from "@/recoverPassword/view/RecPasswordCodeView";
import ShowPostView from "@/post/view/ShowPostView";
import CreatePostView from "@/post/view/CreatePostView";
import CreatePostDescView from "@/post/view/CreatePostDescView";
import PhotoPostView from "@/post/view/PhotoPostView";
import EditPostView from "@/post/view/EditPostView";
import PhotoProfileView from "@/profile/view/PhotoProfileView";
import EditProfileView from "@/profile/view/EditProfileView";
import ShowProfileView from "@/profile/view/ShowProfileView";

export default AppView

function AppView() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomeView />} />
          <Route path="login" element={<LoginView />} />
          <Route path="register" element={<RegisterView />} />
          <Route path="recover-password">
            <Route index element={<RecPasswordView />} />
            <Route path="code" element={<RecPasswordCodeView />} />
          </Route>
          <Route path="profile">
            <Route index element={<ShowProfileView />} />
            <Route path="edit" element={<EditProfileView />} />
            <Route path="photo" element={<PhotoProfileView />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path=":id" element={<ShowProfileView />} />
          </Route>
          <Route path="post/:id">
            <Route index element={<ShowPostView />} />
            <Route path="create">
              <Route index element={<CreatePostView />} />
              <Route path="description" element={<CreatePostDescView />} />
            </Route>
            <Route path="edit" element={<EditPostView />} />
            <Route path="photo" element={<PhotoPostView />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}