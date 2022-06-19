export default RegisterView

function RegisterView() {
  return (
    <section>
      <h2>Register Now!</h2>
      
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

          <div>
            <label>Confirm Password</label>
            <input type="password" />
          </div>

          (Optional)
          <div>
            <label>Full Name</label>
            <input type="text" />
          </div>      

          <button>Sign Up</button>
        </form>
      </div>

      <section>
        <h3>Social Sign Up!</h3>
        
        <div>
          <button>Sign Up with Twitter</button> 
          <button>Sign Up with Facebook</button> 
          <button>Sign Up with Google</button> 
          <button>Sign Up with Github</button>
        </div>
      </section>

      <footer>
        <p>Do you have a account?</p>
        <a href="/login">Login</a>
      </footer>
    </section>
  )
}