import { Link } from 'react-router-dom'
import { Icon } from '@mdi/react'
import { mdiAccountBoxMultiple } from '@mdi/js'
import large from '@/imgs/large.jpg'

export default PhotoProfileView

function PhotoProfileView() {
  return (
    <section>
      <h2>Your Avatar</h2>

      <div className="mt-3">
        <img className="max-w-full" src={large} />
        <button className="btn mt-3 gap-2">
          <Icon path={mdiAccountBoxMultiple} size={1} />
          Change Photo
        </button>
      </div>

      <footer className="mt-3 flex flex-row gap-x-2">
        <Link className="link" to='/'>Home</Link>
        <Link className="link" to='/profile'>Profile</Link>
      </footer>
    </section>
  )
}