import { Link } from "react-router-dom"
import { Icon } from "@mdi/react"
import { mdiAccountArrowUp } from "@mdi/js"

export default RegisterView

function RegisterView() {
  return (
    <section>
      <h2>Register Now!</h2>
      
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
            <label htmlFor="inputUsername" className="label">
              <span className="label-text">UserName</span>
            </label>
            <input id="inputUsername" type="text" 
              className="input input-bordered w-full max-w-xs" />
          </div>

          <div className="form-control w-full max-w-xs">
            <label htmlFor="inputPassword" className="label">
              <span className="label-text">Password</span>
            </label>
            <input id="inputPassword" type="password" 
              className="input input-bordered w-full max-w-xs" />
          </div>

          <div className="form-control w-full max-w-xs">
            <label htmlFor="inputConfPassword" className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input id="inputConfPassword" type="password" 
              className="input input-bordered w-full max-w-xs" />
          </div>

          <div className="mt-3 ml-28">
            <button className="btn gap-2">
              <Icon path={mdiAccountArrowUp} size={1} />
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <section className="hidden">
        <h3>Social Sign Up!</h3>
        
        <div>
          <button>Sign Up with Twitter</button> 
          <button>Sign Up with Facebook</button> 
          <button>Sign Up with Google</button> 
          <button>Sign Up with Github</button>
        </div>
      </section>

      <footer className="mt-3 border px-2">
        <div>
          <p className="font-bold">Do you have a account?</p>
          <Link className="link" to="/login">Login</Link>
        </div>
      </footer>
    </section>
  )
}