import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { deletePostApi, showPostApi } from '../data/postService'
import { PostShow } from '../types'

export default ShowPostView

function ShowPostView() {
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [post, setPost] = useState<PostShow | null>(null)
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
        const postResult = await showPostApi(id)
        const info = postResult.info!
        setPost(info)
      } catch(err: any) {
        console.error(err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const onDeletePost = async () => {
    try {
      setIsLoading(true)
      setError('')

      await deletePostApi(id)
      navigate(`/`)

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
      <h2>Post</h2>

      <div>
        <div>
          <Link to={`/profile/${post?.user.id}`}>
            <img className="w-14" src={post?.user.photo} />
          </Link>
          <p>{post?.user.name} (@{post?.user.username})</p>
        </div>

        <div>
          <Link to={`/post/${id}/photo`}>
            <img className="w-60" src={post?.photo} />
          </Link>
          <p>{post?.description}</p>
          <p>date published ({post?.createdAt})</p>
          <p>date took it ({post?.photoDatetime})</p>
          <p>Hashtags ({post?.hashtags})</p>  
        </div>
      </div>

      <footer>
        <Link className="link" to={`/post/${id}/edit`}>Edit Post</Link> |
        <button className="btn btn-warning" 
          onClick={onDeletePost}>Delete Post</button> |
        <Link className="link" to='/'>Return to Home</Link>
      </footer>
    </section>
  )
}