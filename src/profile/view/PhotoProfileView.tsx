import { Link } from 'react-router-dom'
import { Icon } from '@mdi/react'
import { mdiAccountBoxMultiple } from '@mdi/js'
import large from '@/imgs/large.jpg'
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
        <img className="max-w-full" src={photo} />
        <input id="inputPhoto" type="file" 
              className="form-control-file hidden" 
              name="photo" onChange={handleChangePhoto} 
              accept=".jpg,.gif,.svg,.png" 
              title="" value="" />
            
        <label htmlFor="inputPhoto"
          className="btn mt-3 gap-2">
          <Icon path={mdiAccountBoxMultiple} size={1} />
          Change Photo
        </label>
      </div>

      <footer className="mt-3 flex flex-row gap-x-2">
        <Link className="link" to='/'>Home</Link>
        <Link className="link" to='/profile'>Profile</Link>
      </footer>
    </section>
  )
}