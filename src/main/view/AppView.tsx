import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomeView from "@/home/view/HomeView";
import LoginView from "@/login/view/LoginView";
import RegisterView from "@/register/view/RegisterView";
import ChangePasswordView from "@/profile/view/ChangePasswordView";
import RecPasswordView from "@/recoverPassword/view/RecPasswordView";
import RecPasswordCodeView from "@/recoverPassword/view/RecPasswordCodeView";
import RecPasswordChangeView from '@/recoverPassword/view/RecPasswordChangeView';
import ShowPostView from "@/post/view/ShowPostView";
import CreatePostView from "@/post/view/CreatePostView";
import CreatePostDescView from "@/post/view/CreatePostDescView";
import PhotoPostView from "@/post/view/PhotoPostView";
import EditPostView from "@/post/view/EditPostView";
import PhotoProfileView from "@/profile/view/PhotoProfileView";
import EditProfileView from "@/profile/view/EditProfileView";
import ShowProfileView from "@/profile/view/ShowProfileView";
import AboutView from "@/about/view/AboutView";
import LoadingView from "@/loading/view/LoadingView";
import NotFoundView from "@/notFound/view/NotFoundView";
import UnauthorizatedView from "@/unauthorized/view/UnauthorizedView";
import AuthLayout from "@/layout/view/AuthLayout";
import MainLayout from "@/layout/view/MainLayout";
import NotificationsView from "@/notifications/view/NotificationsView";
import ChangeEmailView from "@/profile/view/ChangeEmailView";

export default AppView

function AppView() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginView />} />
            <Route path="register" element={<RegisterView />} />
            <Route path="recover-password">
              <Route index element={<RecPasswordView />} />
              <Route path=":tokenId/code" element={<RecPasswordCodeView />} />
              <Route path=":tokenId/code/:code/change" element={<RecPasswordChangeView />} />
            </Route>
          </Route>

          <Route element={<MainLayout />}>
            <Route index element={<HomeView />} />
            <Route path="profile">
              <Route index element={<ShowProfileView />} />
              <Route path="edit" element={<EditProfileView />} />
              <Route path="photo" element={<PhotoProfileView />} />
              <Route path="change-password" element={<ChangePasswordView />} />
              <Route path="change-email" element={<ChangeEmailView />} />
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
            <Route path="notifications" element={<NotificationsView />} />
            <Route path="about" element={<AboutView />} />
            <Route path="loading" element={<LoadingView />} />
            <Route path="not-found" element={<NotFoundView />} />
            <Route path="unauthorizated" element={<UnauthorizatedView />} />
          </Route>
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}