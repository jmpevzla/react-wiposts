export default LoginView

function LoginView() {
  return (
    <section>
      <h2>Login!</h2>
      
      <div>
        <form onSubmit={() => { history.pushState('','','/') }}>
          <div>
            <label>Email</label>
            <input type="email" />
          </div>
          
          <div>
            <label>Password</label>
            <input type="password" />
          </div>

          <button>Login</button>
        </form>
      </div>

      <section>
        <h3>Social Login</h3>
        
        <div>
          <button>Login with Twitter</button> 
          <button>Login with Facebook</button> 
          <button>Login with Google</button> 
          <button>Login with Github</button>
        </div>
      </section>

      <footer>
        <p>Don't you have a account?</p>
        <a href="/register">Register</a>

        <p>You forgot your password?</p>
        <a href="/recover-password">Recover Password</a>
      </footer>
    </section>
  )
}