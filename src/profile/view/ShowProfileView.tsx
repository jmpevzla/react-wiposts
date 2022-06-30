import { Link } from 'react-router-dom'
import { Icon } from '@mdi/react'
import { mdiAccountBoxMultiple } from '@mdi/js'
import large from '@/imgs/large.jpg'

export default ShowProfileView

function ShowProfileView() {
  return (
    <section>
      <h2>demo@wiposts.io</h2>

      <div>
        <Link className="link" to="/profile/edit">Edit Profile</Link>
      </div>

      <div className="mt-3">
        <img className="w-52" src={large} />
        <div className="flex flex-row gap-x-2 mt-2">
          <Link className="link" to='/profile/photo'>Photo</Link>
          <button type="button"
            className="btn gap-2">
              <Icon path={mdiAccountBoxMultiple} size={1} />
              Change Photo
          </button>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-sm">demo</p>
        <p className="text-sm">10 posts</p>
        <p className="text-sm">Your Name</p>
        <p className="text-sm">Description</p>
        <a href="">www.demo.com</a>
      </div>

      <section className="mt-3">
        <h3>Publicaciones</h3>
        <article></article>
      </section>
    </section>
  )
}