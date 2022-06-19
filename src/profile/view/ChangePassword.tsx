export default ChangePassword

function ChangePassword() {
  return (
    <section>
      <h2>Change Your Password</h2>
      
      <div>
        <form>
          <div>
            <label>Old Password</label>
            <input type="password" />
          </div>

          <div>
            <label>New Password</label>
            <input type="password" />
          </div>

          <div>
            <label>Confirm New Password</label>
            <input type="password" />
          </div>

          <div>
            <button>Change Now!</button>
          </div>
        </form>
      </div>
    </section>
  )
}