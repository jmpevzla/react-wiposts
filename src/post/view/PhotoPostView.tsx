import { useEffect, useState } from 'react'
import { Link, useNavigate
  , useParams } from 'react-router-dom'
import { photoPostApi } from '../data/postService'

export default PhotoPostView

function PhotoPostView() {
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [photo, setPhoto] = useState('')
  const navigate = useNavigate()
  const params = useParams()
  let id = Number(params.id)
  id = isNaN(id) ? -1 : id

  useEffect(() => {
    async function load() {
      if (id < 0) {
        return navigate('/')
      }

      try {
        setIsLoading(true)
        const postResult = await photoPostApi(id)
        const info = postResult.info!
        setPhoto(info.photo)
      } catch(err: any) {
        console.error(err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div>
      <div>
        <img className="w-64" src={photo} />
      </div>

      <div>
        <Link className="link" to={`/post/${id}`}>Go to Post</Link> | 
        <Link className="link" to="/">Go to Home</Link>
      </div>
    </div>
  )
}