import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@mdi/react'
import { mdiAccountBoxMultiple } from '@mdi/js'
import { ProfileShow } from '../types'
import { getProfileByUsernameApi, uploadPhotoApi } from '../data/profileService'

export default ShowProfileView

function ShowProfileView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState<ProfileShow>({
    username: '',
    name: '',
    numPosts: 0,
    description: '',
    website: '',
    photo: ''
  })

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true)
        const res = await getProfileByUsernameApi('joseperez')
        const data = res.info!
        setProfile(data)

      } catch(err) {
        const error = err as Error
        console.log(error)
        setError(error.message)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    load()
    
  }, [])

  async function handleChangePhoto(ev: React.ChangeEvent<HTMLInputElement>) {
    try {
      setIsLoading(true)
      setError('')
      const files = ev.currentTarget.files
      if (!(files && files.length > 0)) {
        return
      }

      const photoFile = files[0]
      switch(photoFile.type) {
        case 'image/jpeg': 
        case 'image/png':           
        case 'image/gif': 
        case 'image/svg+xml':
          break
        default:
          throw new Error('File Invalid')
      }

      const resp = await uploadPhotoApi(photoFile)
      setProfile({
        ...profile,
        photo: resp.info?.photo || ''
      })

      //navigate('/profile')
    } catch(err) {
      const error = err as Error
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }

  }


  return (
    <section>
      <h2>Show Profile</h2>

      <div>
        <Link data-test="edit-profile" 
          className="link" to="/profile/edit">Edit Profile</Link>
      </div>

      <div className="mt-3">
        <img data-test="photo" 
          className="w-52" src={profile.photo} />
        <div className="flex flex-row gap-x-2 mt-2">
          <Link data-test="link-photo" className="link" to='/profile/photo'>Photo</Link>
          
          <input id="inputPhoto" type="file" 
              className="form-control-file hidden"
              data-test="input-photo" 
              name="photo" onChange={handleChangePhoto} 
              accept=".jpg,.gif,.svg,.png" 
              title="" value="" />
            
          <label htmlFor="inputPhoto"
            data-test="change-photo"
            className="btn gap-2">
            <Icon path={mdiAccountBoxMultiple} size={1} />
            Change Photo
          </label>
        </div>
      </div>

      <div className="mt-3">
        <p data-test="username" className="text-sm">{profile.username}</p>
        <p data-test="num-posts" className="text-sm">{profile.numPosts} posts</p>
        <p data-test="name" className="text-sm">{profile.name}</p>
        <p data-test="description" className="text-sm">{profile.description}</p>
        <a data-test="website" 
          href="" target="_blank" 
          rel="noreferrer noopener">{profile.website}</a>
      </div>

      <div className="mt-3 ml-28">
        {error && (
          <div className="min-h-8"
            data-test="error">  
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