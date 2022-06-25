import { Link } from 'react-router-dom'
import { Icon } from "@mdi/react"
import { mdiLogin } from "@mdi/js"

export default LoginView

function LoginView() {
  return (
    <section>
      <h2>Login!</h2>
      
      <div>
        <form onSubmit={() => { history.pushState('','','/') }}>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="inputEmail" className="label">
              <span className="label-text">Email</span>
            </label>
            <input id="inputEmail" type="email" 
              className="input input-bordered w-full max-w-xs" />
          </div>
          
          <div className="form-control w-full max-w-xs">
            <label htmlFor="inputPassword" className="label">
              <span className="label-text">Password</span>
            </label>
            <input id="inputPassword" type="password" 
              className="input input-bordered w-full max-w-xs" />
          </div>

          <div className="mt-3 ml-28">
            <button className="btn gap-2">
              <Icon path={mdiLogin} size={1} />
              Login
            </button>
          </div>
        </form>
      </div>

      <section className="hidden">
        <h3>Social Login</h3>
        
        <div>
          <button>Login with Twitter</button> 
          <button>Login with Facebook</button> 
          <button>Login with Google</button> 
          <button>Login with Github</button>
        </div>
      </section>

      <footer className="mt-3 border px-2">
        <div>
          <p className="font-bold">Don't you have a account?</p>
          <Link className="link" to="/register">Register</Link>
        </div>

        <div>
          <p className="font-bold">You forgot your password?</p>
          <Link className="link" to="/recover-password">Recover Password</Link>
        </div>
      </footer>
    </section>
  )
}