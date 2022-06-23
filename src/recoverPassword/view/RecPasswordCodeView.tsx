export default RecPasswordView

function RecPasswordView() {

  return (
    <section>
      <h2>Recover Password</h2>

      <div>
        <p>With your code, create a new password</p>
        <form onSubmit={() => history.pushState(null, '', '/') }>
          <div>
            <label>Your Code:</label>
            <input type="text" />
          </div>
          <div>
            <button>Send other code (in 15 secs)</button>
          </div>

          <hr />

          <div>
            <label>New Password:</label>
            <input type="password" />
          </div>

          <div>
            <label>Confirm New Password:</label>
            <input type="password" />
          </div>

          <div>
            <button>Create new password</button>
          </div>
        </form>
      </div>

      <footer>
        <a href="/login">Return to Login</a>
      </footer>
    </section>
  )
}