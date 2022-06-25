import { Outlet } from 'react-router-dom'

export default AuthLayout

function AuthLayout() {
  return (
    <div className="mx-4 rounded-xl my-4">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}