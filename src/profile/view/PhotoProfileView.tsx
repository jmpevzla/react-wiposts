import { Link } from 'react-router-dom'
import { Icon } from '@mdi/react'
import { mdiAccountBoxMultiple } from '@mdi/js'
import { useEffect, useState } from 'react'
import { getProfileApi, uploadPhotoApi } from '../data/profileService'

export default PhotoProfileView

function PhotoProfileView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [photo, setPhoto] = useState('')

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true)
        const res = await getProfileApi(1)
        setPhoto(res.info?.photo!)

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
      setPhoto(resp.info?.photo || '')

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
      <h2>Your Avatar</h2>

      <div className="mt-3">
        <img data-test="photo" 
          className="max-w-full" src={photo} />
        <input id="inputPhoto" type="file" 
              className="form-control-file hidden" 
              data-test="input-photo"
              name="photo" onChange={handleChangePhoto} 
              accept=".jpg,.gif,.svg,.png" 
              title="" value="" />
            
        <label htmlFor="inputPhoto"
          data-test="change-photo"
          className="btn mt-3 gap-2">
          <Icon path={mdiAccountBoxMultiple} size={1} />
          Change Photo
        </label>
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

      <footer className="mt-3 flex flex-row gap-x-2">
        <Link data-test="home" className="link" to='/'>Home</Link>
        <Link data-test="profile" className="link" to='/profile'>Profile</Link>
      </footer>
    </section>
  )
}