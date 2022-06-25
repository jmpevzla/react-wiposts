import { useRef } from 'react'
import { mdiPost } from '@mdi/js'
import { Icon } from '@mdi/react'
import { Link, Outlet } from 'react-router-dom'

export default MainLayout

function MainLayout() {
  const drawerToggle = useRef<HTMLInputElement>(null)
  
  // function clickLink() {
  //   if (drawerToggle.current) {
  //     drawerToggle.current.checked = false
  //   }
  // }

  return (
    <div className={`drawer drawer-end min-h-screen text-txt`}>
      <input id="postex-drawer" ref={drawerToggle} 
        type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col px-3">
        <header>
          <nav className="w-full navbar">
            <div className="flex-1">
              <div className="flex flex-row">
                <Icon path={mdiPost} size={1} />
                <h1 className="
                  font-extrabold
                  text-xl
                  font-sans
                  tracking-wider
                "><Link to={"/"}>Wipost.io</Link></h1>
              </div>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                <li><a href="/">Home</a></li>
              </ul>
            </div>
            
            <div className="flex-none lg:hidden">
              <label htmlFor="postex-drawer" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div>
          </nav>
        </header>

        <main className="px-3">
          <Outlet />
        </main>
      </div>
    
      <div className="drawer-side">
        <label htmlFor="postex-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li><a href="/profile">Profile</a></li>
        </ul>
      </div>
    </div>
  )
}