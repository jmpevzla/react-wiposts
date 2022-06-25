import large from '@/imgs/large.jpg'

export default EditProfileView

function EditProfileView() {
  return (
    <section>
      <h2 className="text-red-600">Your Profile</h2>

      <div>
        <div>
          <img className="w-52" src={large} />
          <a href='/profile/photo'>Photo</a>
          <button type="button">Change Photo</button>
        </div>

        <div>
          <form>
            <div>
              <label>Your Username: </label> 
              <input disabled value="demo"></input>
            </div>

            <div>
              <label>Full Name</label>
              <input type="text" />
            </div>

            <div>
              <label>Email</label>
              <input type="email" />
            </div>

            <div>
              <a href="/profile/change-password">Change Password</a>
            </div>

            <div>
              <label>Phone Number</label>
              <input type="tel"></input>
            </div>

            <div>
              <label>Age</label>
              <input type="num" min="15" />
            </div>

            <div>
              <label>Gender</label>
              <select>
                <option>Male</option>
                <option>Female</option>
                <option>Custom</option>
                <option>I prefer not to answer</option>
              </select>
            </div>

            <div>
              <label>Description</label>
              <textarea rows={4}></textarea>
            </div>

            <div>
              <label>Your Website</label>
              <input type="url"></input>
            </div>
          </form>
        </div>
      </div>


    </section>
  )
}