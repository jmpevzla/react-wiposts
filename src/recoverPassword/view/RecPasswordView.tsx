export default RecPasswordView

function RecPasswordView() {

  return (
    <section>
      <h2>Recover Password</h2>

      <div>
        <p>Get a code to your e-mail for create a new password</p>
        <form onSubmit={() => history.pushState(null, '', '/recover-password/code') }>
          <div>
            <label>Your Email:</label>
            <input type="email" />
          </div>

          <div>
            <button>Get Code</button>
          </div>
        </form>
      </div>

      <footer>
        <a href="/login">Return to Login</a>
      </footer>
    </section>
  )
}