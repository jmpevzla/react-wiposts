import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomeView from "../../home/view/HomeView";
import LoginView from "../../login/view/LoginView";
import RegisterView from "../../register/view/RegisterView";

export default AppView

function AppView() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomeView />} />
          <Route path="login" element={<LoginView />} />
          <Route path="register" element={<RegisterView />} />
          <Route path="profile">
            <Route index element={<div />} />
            <Route path="photo" element={<div />} />
          </Route>
          <Route path="recover-password" element={<div />} />
          <Route path="change-password" element={<div />} />
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