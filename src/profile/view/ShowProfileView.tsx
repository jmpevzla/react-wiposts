import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@mdi/react'
import { mdiAccountBoxMultiple } from '@mdi/js'
import large from '@/imgs/large.jpg'
import { ProfileShow } from '../types'
import { getProfileApi } from '../data/profileService'

export default ShowProfileView

function ShowProfileView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState<ProfileShow>({
    username: '',
    name: '',
    posts: 0,
    description: '',
    website: ''
  })

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true)
        const res = await getProfileApi(1)
        const data = res.info!
        data.posts = 10
        setProfile(res.info!)

      } catch(err) {
        const error = err as Error
        setError(error.message)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    load()
    
  }, [])

  return (
    <section>
      <h2>Show Profile</h2>

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
        <p className="text-sm">{profile.username}</p>
        <p className="text-sm">{profile.posts} posts</p>
        <p className="text-sm">{profile.name}</p>
        <p className="text-sm">{profile.description}</p>
        <a href="" target="_blank" rel="noreferrer noopener">{profile.website}</a>
      </div>

      <div className="mt-3 ml-28">
        {error && (
          <div className="min-h-8">  
            <p className="text-error text-left">
              {error}
            </p>  
          </div>
        )}

        {isLoading && <p>Loading...</p>}
      </div>

      <section className="mt-3">
        <h3>Publicaciones</h3>
        <article></article>
      </section>
    </section>
  )
}